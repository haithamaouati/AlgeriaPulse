/* =========================================================
   Algeria Pulse — Application Logic
   ========================================================= */
(() => {
  "use strict";

  /* ---------- i18n dictionary ---------- */
  const I18N = {
    en: {
      app_title: "Algeria Pulse",
      app_subtitle: "Share what's happening, wilaya by wilaya.",
      select_province: "Select your wilaya",
      select_placeholder: "Choose a wilaya…",
      notice_title: "Before you post",
      notice_body: "Please note that Law No. 09-04 of August 5, 2009, is in force in Algeria. This law stipulates strict sanctions against any online publication that may disturb public order or violate applicable regulations. To avoid any legal consequences, please comply with this legislation and refrain from sharing harmful, illegal, or violence-inciting content.",
      write_label: "Your idea, event, or news",
      write_placeholder: "What's happening in your wilaya?",
      metric_chars: "chars",
      metric_words: "words",
      metric_lines: "lines",
      map_label: "Tap a wilaya on the map",
      detail_id: "ID",
      detail_en: "Name (EN)",
      detail_ar: "Name (AR)",
      output_label: "Shareable link",
      output_placeholder: "Your link will appear here…",
      footer_developed: "Developed with",
      footer_by: "by",
      copied: "Link copied to clipboard!",
      copy_failed: "Couldn't copy — select and copy manually.",
      need_input: "Pick a wilaya and write something first.",
      shared_banner: "Viewing a shared pulse"
    },
    ar: {
      app_title: "نبض الجزائر",
      app_subtitle: "شارك ما يحدث في كل ولاية.",
      select_province: "اختر ولايتك",
      select_placeholder: "اختر ولاية…",
      notice_title: "قبل أن تنشر",
      notice_body: "​يرجى العلم بأن القانون رقم 09-04 الصادر في 5 أغسطس 2009 ساري المفعول في الجزائر. وينص على عقوبات صارمة ضد أي محتوى منشور عبر الإنترنت قد يخلّ بالنظام العام أو ينتهك اللوائح المعمول بها. لتفادي أي تبعات قانونية، يُرجى الالتزام بأحكامه والامتناع عن نشر أي محتوى ضار، غير قانوني، أو محرض على العنف.",
      write_label: "فكرتك أو الحدث أو الخبر",
      write_placeholder: "ما الذي يحدث في ولايتك؟",
      metric_chars: "حرف",
      metric_words: "كلمة",
      metric_lines: "سطر",
      map_label: "اضغط على ولاية في الخريطة",
      detail_id: "الرمز",
      detail_en: "الاسم (EN)",
      detail_ar: "الاسم (AR)",
      output_label: "الرابط القابل للمشاركة",
      output_placeholder: "سيظهر رابطك هنا…",
      footer_developed: "طُوّر بـ",
      footer_by: "بواسطة",
      copied: "تم نسخ الرابط!",
      copy_failed: "تعذر النسخ — انسخ يدويًا.",
      need_input: "اختر ولاية واكتب شيئًا أولاً.",
      shared_banner: "أنت تشاهد نبضة مشتركة"
    }
  };

  let currentLang = "en";
  let provinces = [];
  let provinceById = new Map();
  let currentProvinceId = null;
  let svgRoot = null;
  let mapGroup = null;
  let viewBoxCenter = { x: 0, y: 0 };
  let viewBoxSize = { w: 0, h: 0 };

  const $ = (sel) => document.querySelector(sel);
  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    cacheElements();
    bindStaticEvents();
    startClock();
    initParticles();

    try {
      await loadProvinces();
      populateSelect();
    } catch (e) {
      console.error("Failed to load data.json", e);
    }

    try {
      await loadMap();
    } catch (e) {
      console.error("Failed to load algeria.svg", e);
    }

    applyLanguage(currentLang);
    hydrateFromURL();
  }

  function cacheElements() {
    els.langToggle = $("#langToggle");
    els.langToggleLabel = $("#langToggleLabel");
    els.themeToggle = $("#themeToggle");
    els.themeIcon = $("#themeIcon");
    els.liveClock = $("#liveClock");
    els.provinceSelect = $("#provinceSelect");
    els.noticeToggle = $("#noticeToggle");
    els.noticeBody = $("#noticeBody");
    els.pulseText = $("#pulseText");
    els.charCount = $("#charCount");
    els.wordCount = $("#wordCount");
    els.lineCount = $("#lineCount");
    els.mapContainer = $("#mapContainer");
    els.mapReset = $("#mapReset");
    els.detailId = $("#detailId");
    els.detailEn = $("#detailEn");
    els.detailAr = $("#detailAr");
    els.outputLink = $("#outputLink");
    els.copyBtn = $("#copyBtn");
    els.shareBtn = $("#shareBtn");
    els.copyHint = $("#copyHint");
  }

  /* ---------- Static event bindings ---------- */
  function bindStaticEvents() {
    els.langToggle.addEventListener("click", () => {
      applyLanguage(currentLang === "en" ? "ar" : "en");
    });

    els.themeToggle.addEventListener("click", toggleTheme);

    els.noticeToggle.addEventListener("click", () => {
      const expanded = els.noticeToggle.getAttribute("aria-expanded") === "true";
      els.noticeToggle.setAttribute("aria-expanded", String(!expanded));
      els.noticeBody.classList.toggle("collapsed", expanded);
    });

    els.provinceSelect.addEventListener("change", (e) => {
      if (e.target.value) selectProvince(e.target.value, { fromMap: false });
    });

    els.pulseText.addEventListener("input", () => {
      updateMetrics();
      generateLink();
    });

    els.mapReset.addEventListener("click", resetMapView);

    els.copyBtn.addEventListener("click", copyLink);
    els.shareBtn.addEventListener("click", shareLink);
  }

  /* ---------- Theme ---------- */
  function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
    els.themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  /* ---------- Language ---------- */
  function applyLanguage(lang) {
    currentLang = lang;
    const dict = I18N[lang];
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    els.langToggleLabel.textContent = lang === "en" ? "AR" : "EN";

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (dict[key]) node.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.getAttribute("data-i18n-placeholder");
      if (dict[key]) node.setAttribute("placeholder", dict[key]);
    });

    populateSelect();
    updateProvinceDetails();
    updateClock();
  }

  /* ---------- Live clock ---------- */
  function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
  }
  function updateClock() {
    const now = new Date();
    const locale = currentLang === "ar" ? "ar-DZ" : "en-GB";
    const formatted = new Intl.DateTimeFormat(locale, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
    }).format(now);
    els.liveClock.textContent = formatted;
  }

  /* ---------- Data loading ---------- */
  async function loadProvinces() {
    const res = await fetch("data.json");
    const json = await res.json();
    provinces = json.provinces;
    provinceById = new Map(provinces.map((p) => [p.id, p]));
  }

  function populateSelect() {
    if (!provinces.length) return;
    const dict = I18N[currentLang];
    const prevValue = els.provinceSelect.value;
    els.provinceSelect.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = !currentProvinceId;
    placeholder.textContent = dict.select_placeholder;
    els.provinceSelect.appendChild(placeholder);

    provinces.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      const num = String(p.number).padStart(2, "0");
      opt.textContent = currentLang === "ar"
        ? `${num} — ${p.name_ar} (${p.name_en})`
        : `${num} — ${p.name_en} (${p.name_ar})`;
      els.provinceSelect.appendChild(opt);
    });

    if (currentProvinceId) els.provinceSelect.value = currentProvinceId;
    else if (prevValue) els.provinceSelect.value = prevValue;
  }

  /* ---------- Map loading ---------- */
  async function loadMap() {
    const res = await fetch("algeria.svg");
    const svgText = await res.text();
    els.mapContainer.innerHTML = svgText;
    svgRoot = els.mapContainer.querySelector("svg");
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

    svgRoot.addEventListener("click", (e) => {
      const path = e.target.closest("path[id]");
      if (path) selectProvince(path.id, { fromMap: true });
    });
  }

  /* ---------- Province selection & map zoom ---------- */
  function selectProvince(id, opts = {}) {
    const province = provinceById.get(id);
    if (!province) return;

    highlightPath(id);
    focusMapOn(id, currentProvinceId && currentProvinceId !== id);
    currentProvinceId = id;

    if (!opts.fromMap) {
      els.provinceSelect.value = id;
    } else {
      els.provinceSelect.value = id;
    }

    updateProvinceDetails();
    generateLink();
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
    let s = Math.min(scaleX, scaleY);
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
      mapGroup.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    };

    if (animateOutFirst) {
      mapGroup.style.transform = "translate(0px, 0px) scale(1)";
      window.setTimeout(doZoomIn, 700);
    } else {
      doZoomIn();
    }
  }

  function resetMapView() {
    if (!mapGroup) return;
    mapGroup.style.transform = "translate(0px, 0px) scale(1)";
  }

  function updateProvinceDetails() {
    const dict = I18N[currentLang];
    const p = currentProvinceId ? provinceById.get(currentProvinceId) : null;
    els.detailId.textContent = p ? p.id : "—";
    els.detailEn.textContent = p ? p.name_en : "—";
    els.detailAr.textContent = p ? p.name_ar : "—";
    void dict;
  }

  /* ---------- Text metrics ---------- */
  function updateMetrics() {
    const val = els.pulseText.value;
    els.charCount.textContent = val.length;
    const words = val.trim().length ? val.trim().split(/\s+/).length : 0;
    els.wordCount.textContent = words;
    const lines = val.length ? val.split(/\n/).length : 0;
    els.lineCount.textContent = lines;
  }

  /* ---------- Link generation ---------- */
  function b64EncodeUnicode(str) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  }
  function b64DecodeUnicode(str) {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  }

  function generateLink() {
    const text = els.pulseText.value.trim();
    if (!currentProvinceId || !text) {
      els.outputLink.value = "";
      return;
    }
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("t", Date.now().toString());
    url.searchParams.set("p", currentProvinceId);
    url.searchParams.set("d", b64EncodeUnicode(text));
    els.outputLink.value = url.toString();
  }

  function hydrateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p");
    const d = params.get("d");
    if (p && provinceById.has(p)) {
      selectProvince(p, { fromMap: false });
    }
    if (d) {
      try {
        els.pulseText.value = b64DecodeUnicode(d);
        updateMetrics();
        generateLink();
      } catch (e) {
        console.warn("Could not decode shared text", e);
      }
    }
  }

  /* ---------- Copy / Share ---------- */
  async function copyLink() {
    const dict = I18N[currentLang];
    if (!els.outputLink.value) {
      showHint(dict.need_input);
      return;
    }
    try {
      await navigator.clipboard.writeText(els.outputLink.value);
      showHint(dict.copied);
    } catch (e) {
      els.outputLink.select();
      try {
        document.execCommand("copy");
        showHint(dict.copied);
      } catch (err) {
        showHint(dict.copy_failed);
      }
    }
  }

  async function shareLink() {
    const dict = I18N[currentLang];
    if (!els.outputLink.value) {
      showHint(dict.need_input);
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({ title: I18N[currentLang].app_title, url: els.outputLink.value });
      } catch (e) {
        /* user cancelled — no-op */
      }
    } else {
      copyLink();
    }
  }

  function showHint(msg) {
    els.copyHint.textContent = msg;
    window.clearTimeout(showHint._t);
    showHint._t = window.setTimeout(() => (els.copyHint.textContent = ""), 2500);
  }

  /* ---------- Ambient particle background ---------- */
  function initParticles() {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles = [];
    let w, h, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(70, Math.floor((w * h) / 22000)));
      particles = Array.from({ length: count }, () => makeParticle());
    }

    function makeParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: 0.25 + Math.random() * 0.4
      };
    }

    function getColor() {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue("--particle-color").trim() || "76,149,108";
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const color = getColor();
      const linkDist = 140;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x, dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.strokeStyle = `rgba(${color}, ${0.12 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.a})`;
        ctx.fill();

        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
      });

      if (!reduceMotion) requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
  }
})();