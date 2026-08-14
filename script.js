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
      shared_banner: "Viewing a shared pulse",
      about_title: "About Algeria Pulse",
      about_lead: "Algeria Pulse is a lightweight, serverless way to turn a local idea, event, or breaking story into a link you can send anywhere — no account, no backend, no data storage.",
      about_step1_title: "1. Pick a wilaya",
      about_step1_body: "Choose your province from the dropdown or tap it directly on the interactive map.",
      about_step2_title: "2. Write your pulse",
      about_step2_body: "Type your idea, event, or news update in the text field, in Arabic or English.",
      about_step3_title: "3. Get your link",
      about_step3_body: "A unique link is generated instantly, encoding the timestamp, wilaya, and your message.",
      about_step4_title: "4. Share it anywhere",
      about_step4_body: "Copy or share the link through any app — Algeria Pulse never stores your content.",
      feature_privacy: "100% client-side, zero server storage",
      feature_bilingual: "Full Arabic / English support",
      feature_theme: "Light & dark Green Forest theme",
      feature_map: "Interactive 58-wilaya map",
      ticker_loading: "Loading news…",
      about_nav_aria: "About Algeria Pulse",
      verse_title: "A reminder",
      metric_user_label: "User",
      metric_time_label: "Participated",
      metric_no_user: "—",
      modal_title: "What should we call you?",
      modal_sub: "Your name is included in the link you generate.",
      modal_placeholder: "Enter a username…",
      modal_submit: "Continue",
      modal_error: "Please enter at least 2 characters."
    },
    ar: {
      app_title: "نبض الجزائر",
      app_subtitle: "شارك ما يحدث في كل ولاية.",
      select_province: "اختر ولايتك",
      select_placeholder: "اختر ولاية…",
      notice_title: "قبل أن تنشر",
      notice_body: "يرجى العلم أن القانون رقم 09-04 المؤرخ في 5 أوت 2009 ساري المفعول في الجزائر. ينص هذا القانون على عقوبات صارمة ضد كل نشر إلكتروني من شأنه الإخلال بالنظام العام أو مخالفة الأنظمة المعمول بها. تجنبًا لأي تبعات قانونية، يرجى الالتزام بهذا التشريع والامتناع عن مشاركة محتوى ضار أو غير قانوني أو محرّض على العنف.",
      write_label: "فكرتك أو الحدث أو الخبر",
      write_placeholder: "ما الذي يحدث في ولايتك؟",
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
      shared_banner: "أنت تشاهد نبضة مشتركة",
      about_title: "حول نبض الجزائر",
      about_lead: "نبض الجزائر أداة خفيفة لا تعتمد على أي خادم، تُحوّل فكرة أو حدثًا أو خبرًا محليًا إلى رابط يمكنك إرساله إلى أي مكان — بدون حساب، بدون خادم خلفي، وبدون تخزين بيانات.",
      about_step1_title: "١. اختر ولاية",
      about_step1_body: "اختر ولايتك من القائمة المنسدلة أو اضغط عليها مباشرة على الخريطة التفاعلية.",
      about_step2_title: "٢. اكتب نبضتك",
      about_step2_body: "اكتب فكرتك أو الحدث أو الخبر في حقل النص، بالعربية أو الإنجليزية.",
      about_step3_title: "٣. احصل على رابطك",
      about_step3_body: "يتم إنشاء رابط فريد فورًا، يتضمن الوقت والولاية ورسالتك.",
      about_step4_title: "٤. شاركه أينما شئت",
      about_step4_body: "انسخ الرابط أو شاركه عبر أي تطبيق — نبض الجزائر لا يخزّن محتواك أبدًا.",
      feature_privacy: "١٠٠٪ من جهة العميل، بدون تخزين على أي خادم",
      feature_bilingual: "دعم كامل للغتين العربية والإنجليزية",
      feature_theme: "وضع فاتح وداكن بطابع الغابة الخضراء",
      feature_map: "خريطة تفاعلية لـ ٥٨ ولاية",
      ticker_loading: "جارٍ تحميل الأخبار…",
      about_nav_aria: "حول نبض الجزائر",
      verse_title: "تذكير",
      metric_user_label: "المستخدم",
      metric_time_label: "وقت المشاركة",
      metric_no_user: "—",
      modal_title: "بماذا نناديك؟",
      modal_sub: "يُدرج اسمك ضمن الرابط الذي تنشئه.",
      modal_placeholder: "أدخل اسم المستخدم…",
      modal_submit: "متابعة",
      modal_error: "الرجاء إدخال حرفين على الأقل."
    }
  };

  let currentLang = "en";
  let provinces = [];
  let provinceById = new Map();
  let currentProvinceId = null;
  let newsItems = [];
  let username = null;
  let participationTimestamp = null;
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
    applyContentProtections();
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

    try {
      await loadNews();
    } catch (e) {
      console.error("Failed to load news.json", e);
    }

    applyLanguage(currentLang);
    hydrateFromURL();
    resolveIdentity();
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
    els.verseToggle = $("#verseToggle");
    els.verseBody = $("#verseBody");
    els.pulseText = $("#pulseText");
    els.metricUsername = $("#metricUsername");
    els.metricTimestamp = $("#metricTimestamp");
    els.mapContainer = $("#mapContainer");
    els.mapReset = $("#mapReset");
    els.detailId = $("#detailId");
    els.detailEn = $("#detailEn");
    els.detailAr = $("#detailAr");
    els.outputLink = $("#outputLink");
    els.copyBtn = $("#copyBtn");
    els.shareBtn = $("#shareBtn");
    els.copyHint = $("#copyHint");
    els.copyHintText = $("#copyHintText");
    els.aboutNavBtn = $("#aboutNavBtn");
    els.aboutSection = $("#about");
    els.tickerTrack = $("#tickerTrack");
    els.scrollTopBtn = $("#scrollTopBtn");
    els.scrollBottomBtn = $("#scrollBottomBtn");
    els.usernameModal = $("#usernameModal");
    els.usernameForm = $("#usernameForm");
    els.usernameInput = $("#usernameInput");
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

    els.verseToggle.addEventListener("click", () => {
      const expanded = els.verseToggle.getAttribute("aria-expanded") === "true";
      els.verseToggle.setAttribute("aria-expanded", String(!expanded));
      els.verseBody.classList.toggle("collapsed", expanded);
    });

    els.usernameForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dict = I18N[currentLang];
      const val = els.usernameInput.value.trim();
      if (val.length < 2) {
        els.usernameInput.setCustomValidity(dict.modal_error);
        els.usernameInput.reportValidity();
        return;
      }
      els.usernameInput.setCustomValidity("");
      username = val;
      if (!participationTimestamp) participationTimestamp = Date.now();
      hideUsernameModal();
      finalizeIdentity();
    });

    els.provinceSelect.addEventListener("change", (e) => {
      if (e.target.value) selectProvince(e.target.value, { fromMap: false });
    });

    els.pulseText.addEventListener("input", () => {
      generateLink();
    });

    els.mapReset.addEventListener("click", resetMapView);

    els.copyBtn.addEventListener("click", copyLink);
    els.shareBtn.addEventListener("click", shareLink);

    els.aboutNavBtn.addEventListener("click", () => {
      els.aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    els.scrollBottomBtn.addEventListener("click", scrollStepDown);
    els.scrollTopBtn.addEventListener("click", scrollStepUp);
  }

  /* ---------- Stepped multi-section scroll (floating icons) ---------- */
  // Order the "down" sequence visits: dropdown -> text input -> map -> output -> about.
  function getStepSections() {
    return [
      $("#provinceSection"),
      $("#textSection"),
      $("#mapSection"),
      $("#outputSection"),
      $("#about")
    ].filter(Boolean);
  }

  let scrollDownIndex = 0;
  let scrollUpIndex = 0;

  function scrollStepDown() {
    const sections = getStepSections();
    if (!sections.length) return;
    sections[scrollDownIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    scrollDownIndex = Math.min(scrollDownIndex + 1, sections.length - 1);
    scrollUpIndex = sections.length - 1 - scrollDownIndex;
  }

  function scrollStepUp() {
    const sections = getStepSections();
    if (!sections.length) return;
    const reversed = sections.slice().reverse();
    reversed[scrollUpIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    scrollUpIndex = Math.min(scrollUpIndex + 1, reversed.length - 1);
    scrollDownIndex = reversed.length - 1 - scrollUpIndex;
  }

  /* ---------- Content protection (soft client-side deterrents) ----------
     These only discourage casual copying/inspection — they cannot truly
     block a determined user or the browser's built-in dev tools. Form
     fields (input/textarea) stay selectable so the app remains usable. */
  function applyContentProtections() {
    const isFormField = (el) => {
      const tag = (el && el.tagName || "").toLowerCase();
      return tag === "input" || tag === "textarea";
    };

    document.addEventListener("contextmenu", (e) => e.preventDefault());

    document.addEventListener("selectstart", (e) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    });

    document.addEventListener("copy", (e) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    });

    document.addEventListener("cut", (e) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    });

    document.addEventListener("dragstart", (e) => e.preventDefault());

    document.addEventListener("keydown", (e) => {
      const key = e.key;
      const isDevToolsCombo =
        key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I", "J", "C", "i", "j", "c"].includes(key)) ||
        ((e.ctrlKey || e.metaKey) && ["U", "u", "S", "s"].includes(key));
      if (isDevToolsCombo) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
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
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const key = node.getAttribute("data-i18n-aria");
      if (dict[key]) node.setAttribute("aria-label", dict[key]);
    });

    populateSelect();
    updateProvinceDetails();
    updateClock();
    updateIdentityDisplay();
    renderTicker();
  }

  /* ---------- Username identity (prompt modal + shared-link hydration) ---------- */
  function resolveIdentity() {
    const params = new URLSearchParams(window.location.search);
    const uParam = params.get("u");
    const tParam = params.get("t");

    // A visited shareable link carries its own participation timestamp —
    // extract and keep it rather than generating a new one.
    if (tParam) participationTimestamp = Number(tParam);

    // The modal always appears on load (per spec); if the link already
    // carries a username, prefill it as a courtesy so returning users can
    // simply confirm instead of retyping.
    if (uParam && els.usernameInput) {
      els.usernameInput.value = decodeURIComponent(uParam);
    }
    showUsernameModal();
  }

  function finalizeIdentity() {
    updateIdentityDisplay();
    generateLink();
  }

  function showUsernameModal() {
    els.usernameModal.hidden = false;
    window.setTimeout(() => els.usernameInput.focus(), 60);
  }

  function hideUsernameModal() {
    els.usernameModal.hidden = true;
  }

  function updateIdentityDisplay() {
    const dict = I18N[currentLang];
    if (els.metricUsername) {
      els.metricUsername.textContent = username || dict.metric_no_user;
    }
    if (els.metricTimestamp) {
      if (participationTimestamp) {
        const locale = currentLang === "ar" ? "ar-DZ" : "en-GB";
        els.metricTimestamp.textContent = new Intl.DateTimeFormat(locale, {
          year: "numeric", month: "short", day: "numeric",
          hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
        }).format(new Date(participationTimestamp));
      } else {
        els.metricTimestamp.textContent = dict.metric_no_user;
      }
    }
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

  /* ---------- News ticker ---------- */
  async function loadNews() {
    const res = await fetch("news.json");
    const json = await res.json();
    newsItems = Array.isArray(json.news) ? json.news : [];
    renderTicker();
    window.setInterval(renderTicker, 25000); // cycle to a new random order periodically
  }

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function renderTicker() {
    if (!els.tickerTrack) return;
    if (!newsItems.length) {
      els.tickerTrack.innerHTML = `<span class="ticker__item">${I18N[currentLang].ticker_loading}</span>`;
      return;
    }
    const order = shuffle(newsItems);
    const key = currentLang === "ar" ? "ar" : "en";
    const html = order
      .map((item) => `<span class="ticker__item">${escapeHtml(item[key] || item.en || "")}</span>`)
      .join("");
    // duplicate the sequence so the CSS marquee loop is seamless
    els.tickerTrack.innerHTML = html + html;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
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
      if (path) {
        playMapBeep();
        selectProvince(path.id, { fromMap: true });
      }
    });
  }

  /* ---------- Map click audio feedback (Web Audio API) ---------- */
  let audioCtx = null;
  function playMapBeep() {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === "suspended") audioCtx.resume();

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.07);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {
      /* audio not available — fail silently */
    }
  }

  /* ---------- Province selection & map zoom ---------- */
  function selectProvince(id, opts = {}) {
    const province = provinceById.get(id);
    if (!province) return;

    highlightPath(id);
    focusMapOn(id, currentProvinceId && currentProvinceId !== id);
    addSensorRings(id);
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

  function addSensorRings(id) {
    if (!svgRoot || !mapGroup) return;
    const path = svgRoot.querySelector(`#${CSS.escape(id)}`);
    if (!path) return;

    const old = mapGroup.querySelector("#sensorPulse");
    if (old) old.remove();

    const bbox = path.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    const baseR = Math.max(bbox.width, bbox.height) / 2 || 10;

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
    if (!currentProvinceId || !text || !username) {
      els.outputLink.value = "";
      return;
    }
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("u", username);
    url.searchParams.set("t", (participationTimestamp || Date.now()).toString());
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
    els.copyHintText.textContent = msg;
    els.copyHint.classList.add("is-visible");
    window.clearTimeout(showHint._t);
    showHint._t = window.setTimeout(() => {
      els.copyHint.classList.remove("is-visible");
    }, 2500);
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
