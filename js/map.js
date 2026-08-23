/* =========================================================
   Algeria Pulse — Interactive Map (D3.js)
   Owns the SVG map's own implementation details (the D3 selections,
   viewBox math, and zoom/pan transform state) so the rest of the app
   never has to know how the map is drawn — it just calls focusProvince()
   or resetMapView() and reacts to selections via the onSelect callback
   passed into initMap().
   ========================================================= */

import { playMapBeep, playLockedBeep } from "./audio.js";

let svgRoot = null;
let mapGroup = null;
let mapGroupSel = null;
let viewBoxCenter = { x: 0, y: 0 };
let viewBoxSize = { w: 0, h: 0 };

// Tracks which wilaya is currently focused purely so focusProvince() can
// decide whether to animate a "zoom out, then in" transition (switching
// provinces) or zoom straight in (first-ever selection).
let currentFocusedId = null;

/**
 * Fetches and mounts the wilaya SVG into `containerEl`, wires up D3
 * selections for zoom/pan, and binds click handling.
 *
 * @param {Object} config
 * @param {HTMLElement} config.containerEl - element to receive the SVG.
 * @param {() => boolean} config.isLocked - called on each click; when it
 *   returns true, the click plays the "locked" tone instead of selecting.
 * @param {(id: string) => void} config.onSelect - called with a wilaya's
 *   id once a (non-locked) click is confirmed as a valid selection.
 */
export async function initMap({ containerEl, isLocked, onSelect }) {
  const res = await fetch("algeria.svg");
  const svgText = await res.text();
  containerEl.innerHTML = svgText;
  svgRoot = containerEl.querySelector("svg");
  if (!svgRoot) return;

  const vb = (svgRoot.getAttribute("viewBox") || "0 0 963 964").split(/\s+/).map(Number);
  viewBoxSize = { w: vb[2], h: vb[3] };
  viewBoxCenter = { x: vb[0] + vb[2] / 2, y: vb[1] + vb[3] / 2 };

  // Wrap all paths in a group we can transform for zoom/pan.
  mapGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  mapGroup.setAttribute("id", "mapGroup");
  const paths = Array.from(svgRoot.querySelectorAll("path"));
  paths.forEach((p) => mapGroup.appendChild(p));
  svgRoot.appendChild(mapGroup);

  const handleClick = (targetEl) => {
    const path = targetEl.closest("path[id]");
    if (!path) return;
    if (isLocked && isLocked()) {
      playLockedBeep();
      return;
    }
    playMapBeep();
    if (onSelect) onSelect(path.id);
  };

  // D3 owns the group's transform going forward (smooth zoom/pan
  // transitions live in focusProvince/resetMapView below). Fall back to a
  // plain DOM click listener if the D3 CDN failed to load.
  if (typeof d3 !== "undefined") {
    mapGroupSel = d3.select(mapGroup);
    d3.select(svgRoot).on("click", (event) => handleClick(event.target));
  } else {
    svgRoot.addEventListener("click", (e) => handleClick(e.target));
  }
}

// Applies (optionally animated) an SVG transform to #mapGroup. Uses a D3
// transition when D3 is available for smooth interpolation; otherwise
// falls back to an instant attribute set so the map still works.
function applyMapTransform(transformStr, { animate = true, duration = 850, onEnd } = {}) {
  if (!mapGroup) return;
  if (mapGroupSel && animate) {
    mapGroupSel
      .transition()
      .duration(duration)
      .ease(d3.easeCubicInOut)
      .attr("transform", transformStr)
      .on("end", () => {
        if (onEnd) onEnd();
      });
  } else {
    mapGroup.setAttribute("transform", transformStr);
    if (onEnd) onEnd();
  }
}

function highlightPath(id) {
  if (!svgRoot) return;
  svgRoot.querySelectorAll("path.selected").forEach((p) => p.classList.remove("selected"));
  const target = svgRoot.querySelector(`#${CSS.escape(id)}`);
  if (target) target.classList.add("selected");
}

function computeScaleForBBox(bbox) {
  const margin = 2.6; // how much padding around the province, larger = more zoomed out
  const scaleX = viewBoxSize.w / (bbox.width * margin);
  const scaleY = viewBoxSize.h / (bbox.height * margin);
  const s = Math.min(scaleX, scaleY);
  return Math.max(1.6, Math.min(s, 7));
}

function focusMapOn(id, animateOutFirst) {
  if (!mapGroup) return;
  const path = svgRoot.querySelector(`#${CSS.escape(id)}`);
  if (!path) return;

  const doZoomIn = () => {
    const bbox = path.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    const s = computeScaleForBBox(bbox);
    const tx = viewBoxCenter.x - cx * s;
    const ty = viewBoxCenter.y - cy * s;
    applyMapTransform(`translate(${tx},${ty}) scale(${s})`, { duration: 850 });
  };

  if (animateOutFirst) {
    // D3's transition `.on("end", ...)` sequences the zoom-out ->
    // zoom-in pair precisely, rather than guessing a setTimeout delay.
    applyMapTransform("translate(0,0) scale(1)", { duration: 700, onEnd: doZoomIn });
  } else {
    doZoomIn();
  }
}

// The animated "Sensor Lines" radar effect: three staggered rings pulsing
// outward from the selected wilaya's centroid.
function addSensorRings(id) {
  if (!svgRoot || !mapGroup) return;
  const path = svgRoot.querySelector(`#${CSS.escape(id)}`);
  if (!path) return;

  const bbox = path.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  const baseR = Math.max(bbox.width, bbox.height) / 2 || 10;

  if (mapGroupSel) {
    // D3 data-join: creates/updates the ring group and its three circles
    // declaratively. The infinite pulse loop itself stays in CSS
    // (@keyframes sensorPulse) — far cheaper than re-triggering JS
    // transitions every frame — D3's job here is the DOM/data binding
    // and precise centroid placement.
    mapGroupSel.select("#sensorPulse").remove();
    const group = mapGroupSel.append("g").attr("id", "sensorPulse");
    group
      .selectAll("circle")
      .data([1, 2, 3])
      .join("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", baseR)
      .attr("class", (n) => `sensor-ring sensor-ring--${n}`);
    return;
  }

  // Fallback path if D3 failed to load.
  const old = mapGroup.querySelector("#sensorPulse");
  if (old) old.remove();
  const svgNS = "http://www.w3.org/2000/svg";
  const group = document.createElementNS(svgNS, "g");
  group.setAttribute("id", "sensorPulse");
  [1, 2, 3].forEach((n) => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", baseR);
    circle.setAttribute("class", `sensor-ring sensor-ring--${n}`);
    group.appendChild(circle);
  });
  mapGroup.appendChild(group);
}

/**
 * Highlights, zooms/pans to, and emits sensor-pulse rings from the given
 * wilaya. Safe to call for both map-click and dropdown-driven selections.
 */
export function focusProvince(id) {
  highlightPath(id);
  const animateOutFirst = !!(currentFocusedId && currentFocusedId !== id);
  focusMapOn(id, animateOutFirst);
  addSensorRings(id);
  currentFocusedId = id;
}

export function resetMapView() {
  if (!mapGroup) return;
  applyMapTransform("translate(0,0) scale(1)", { duration: 600 });
}
