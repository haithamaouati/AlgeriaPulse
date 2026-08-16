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
      metric_user_label: "User",
      metric_time_label: "Participated",
      metric_no_user: "—",
      modal_title: "What should we call you?",
      modal_sub: "Your name is included in the link you generate.",
      modal_placeholder: "Enter a username…",
      modal_submit: "Continue",
      modal_error: "Please enter at least 2 characters.",
      modal_title_edit: "Update your username",
      modal_sub_edit: "This changes the name used in links you generate from now on.",
      edit_username_aria: "Edit username",
      modal_anonymous: "Continue as Anonymous",
      anonymous_label: "Anonymous",
      new_idea_aria: "Start a new idea",
      feed_nav_aria: "Your local feed",
      feed_close_aria: "Close",
      feed_title: "Your local feed",
      feed_sub: "Pulses you've created or viewed, saved only on this device.",
      feed_search_placeholder: "Search your feed…",
      feed_filter_all: "All",
      feed_filter_mine: "Mine",
      feed_filter_viewed: "Viewed",
      feed_empty: "Nothing saved yet — pulses you create or open will show up here.",
      feed_empty_filtered: "Nothing matches that search or filter.",
      feed_clear: "Clear local feed",
      feed_clear_confirm: "Tap again to confirm",
      feed_badge_created: "Yours",
      feed_badge_viewed: "Viewed",
      feed_saved_toast: "Saved to your local feed",
      feed_cleared_toast: "Local feed cleared",
      feed_deleted_toast: "Removed from your local feed",
      copy_snippet_aria: "Copy formatted snippet",
      snippet_copied: "Snippet copied to clipboard!",
      relative_just_now: "just now"
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
      metric_user_label: "المستخدم",
      metric_time_label: "وقت المشاركة",
      metric_no_user: "—",
      modal_title: "بماذا نناديك؟",
      modal_sub: "يُدرج اسمك ضمن الرابط الذي تنشئه.",
      modal_placeholder: "أدخل اسم المستخدم…",
      modal_submit: "متابعة",
      modal_error: "الرجاء إدخال حرفين على الأقل.",
      modal_title_edit: "تحديث اسم المستخدم",
      modal_sub_edit: "سيُستخدم هذا الاسم في الروابط التي تنشئها من الآن فصاعدًا.",
      edit_username_aria: "تعديل اسم المستخدم",
      modal_anonymous: "المتابعة كمجهول",
      anonymous_label: "مجهول",
      new_idea_aria: "بدء فكرة جديدة",
      feed_nav_aria: "سجلّك المحلي",
      feed_close_aria: "إغلاق",
      feed_title: "سجلّك المحلي",
      feed_sub: "النبضات التي أنشأتها أو شاهدتها، محفوظة على جهازك فقط.",
      feed_search_placeholder: "ابحث في سجلّك…",
      feed_filter_all: "الكل",
      feed_filter_mine: "لي",
      feed_filter_viewed: "مُشاهَدة",
      feed_empty: "لا يوجد شيء محفوظ بعد — ستظهر هنا النبضات التي تنشئها أو تفتحها.",
      feed_empty_filtered: "لا توجد نتائج مطابقة لهذا البحث أو التصفية.",
      feed_clear: "مسح السجلّ المحلي",
      feed_clear_confirm: "اضغط مرة أخرى للتأكيد",
      feed_badge_created: "لك",
      feed_badge_viewed: "مُشاهَدة",
      feed_saved_toast: "تم الحفظ في سجلّك المحلي",
      feed_cleared_toast: "تم مسح السجلّ المحلي",
      feed_deleted_toast: "تم الحذف من سجلّك المحلي",
      copy_snippet_aria: "نسخ المقتطف المنسّق",
      snippet_copied: "تم نسخ المقتطف!",
      relative_just_now: "الآن"
    }
  };

  let currentLang = "en";
  let provinces = [];
  let provinceById = new Map();
  let currentProvinceId = null;
  let newsItems = [];
  let username = null;
  let isAnonymous = false;
  let participationTimestamp = null;
  let sharedView = false;
  let sharedAuthorLabel = null;
  let sharedAuthorTimestamp = null;
  let feedFilter = "all";
  let feedSearchTerm = "";
  let feedClearArmed = false;
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
    updateLockState();
    resolveIdentity();

    // Keep the relative "X minutes ago" timestamp in the identity bar live.
    window.setInterval(updateIdentityDisplay, 30000);
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
    els.metricUsername = $("#metricUsername");
    els.metricTimestamp = $("#metricTimestamp");
    els.identityUserIcon = $("#identityUserIcon");
    els.mapContainer = $("#mapContainer");
    els.mapReset = $("#mapReset");
    els.detailId = $("#detailId");
    els.detailName = $("#detailName");
    els.provinceSelectWrap = $("#provinceSelectWrap");
    els.mapWrap = $("#mapWrap");
    els.outputLink = $("#outputLink");
    els.copyBtn = $("#copyBtn");
    els.copySnippetBtn = $("#copySnippetBtn");
    els.shareBtn = $("#shareBtn");
    els.aboutNavBtn = $("#aboutNavBtn");
    els.aboutSection = $("#about");
    els.tickerTrack = $("#tickerTrack");
    els.scrollTopBtn = $("#scrollTopBtn");
    els.scrollBottomBtn = $("#scrollBottomBtn");
    els.usernameModal = $("#usernameModal");
    els.usernameForm = $("#usernameForm");
    els.usernameInput = $("#usernameInput");
    els.usernameModalTitle = $("#usernameModalTitle");
    els.usernameModalSub = $("#usernameModalSub");
    els.editUsernameBtn = $("#editUsernameBtn");
    els.usernameAnonymousBtn = $("#usernameAnonymousBtn");
    els.newIdeaBtn = $("#newIdeaBtn");
    els.sharedBadge = $("#sharedBadge");
    els.feedNavBtn = $("#feedNavBtn");
    els.feedModal = $("#feedModal");
    els.feedCloseBtn = $("#feedCloseBtn");
    els.feedSearch = $("#feedSearch");
    els.feedFilterTabs = document.querySelectorAll(".feed-filter-tab");
    els.feedList = $("#feedList");
    els.feedEmpty = $("#feedEmpty");
    els.feedClearBtn = $("#feedClearBtn");
    els.toastContainer = $("#toastContainer");
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
      isAnonymous = false;
      if (!participationTimestamp) participationTimestamp = Date.now();
      hideUsernameModal();
      finalizeIdentity();
    });

    els.usernameAnonymousBtn.addEventListener("click", () => {
      els.usernameInput.setCustomValidity("");
      username = null;
      isAnonymous = true;
      if (!participationTimestamp) participationTimestamp = Date.now();
      hideUsernameModal();
      finalizeIdentity();
    });

    els.editUsernameBtn.addEventListener("click", () => {
      showUsernameModal({ editing: true });
    });

    els.newIdeaBtn.addEventListener("click", startNewIdea);

    els.provinceSelectWrap.addEventListener("click", () => {
      if (sharedView) playLockedBeep();
    });

    els.provinceSelect.addEventListener("change", (e) => {
      if (sharedView) {
        e.target.value = currentProvinceId || "";
        playLockedBeep();
        return;
      }
      if (e.target.value) {
        playMapBeep();
        selectProvince(e.target.value, { fromMap: false });
      }
    });

    els.pulseText.addEventListener("input", () => {
      generateLink();
    });

    els.mapReset.addEventListener("click", resetMapView);

    els.copyBtn.addEventListener("click", copyLink);
    els.copySnippetBtn.addEventListener("click", copySnippet);
    els.shareBtn.addEventListener("click", shareLink);

    els.aboutNavBtn.addEventListener("click", () => {
      els.aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    els.scrollBottomBtn.addEventListener("click", scrollStepDown);
    els.scrollTopBtn.addEventListener("click", scrollStepUp);

    els.feedNavBtn.addEventListener("click", openFeedModal);
    els.feedCloseBtn.addEventListener("click", closeFeedModal);
    els.feedModal.addEventListener("click", (e) => {
      if (e.target === els.feedModal) closeFeedModal();
    });
    els.feedSearch.addEventListener("input", (e) => {
      feedSearchTerm = e.target.value.trim().toLowerCase();
      renderFeedList();
    });
    els.feedFilterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        feedFilter = tab.dataset.filter;
        els.feedFilterTabs.forEach((t) => t.classList.toggle("active", t === tab));
        renderFeedList();
      });
    });
    els.feedClearBtn.addEventListener("click", handleFeedClearClick);
  }

  /* ---------- Stepped multi-section scroll (floating icons) ---------- */
  // Down sequence (6 stops): dropdown -> map -> text input -> output -> about -> footer.
  function getDownSteps() {
    return [
      $("#provinceSection"),
      $("#mapSection"),
      $("#textSection"),
      $("#outputSection"),
      $("#about"),
      $("#footerSection")
    ].filter(Boolean);
  }

  // Up sequence (5 sections, then a 6th step that goes to the very top of the page).
  function getUpSteps() {
    return [
      $("#footerSection"),
      $("#about"),
      $("#outputSection"),
      $("#textSection"),
      $("#mapSection")
    ].filter(Boolean);
  }

  let scrollDownIndex = 0;
  let scrollUpIndex = 0;

  function scrollStepDown() {
    const steps = getDownSteps();
    if (!steps.length) return;
    steps[scrollDownIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    scrollDownIndex = Math.min(scrollDownIndex + 1, steps.length - 1);
  }

  function scrollStepUp() {
    const steps = getUpSteps();
    if (scrollUpIndex < steps.length) {
      steps[scrollUpIndex].scrollIntoView({ behavior: "smooth", block: "start" });
      scrollUpIndex = Math.min(scrollUpIndex + 1, steps.length);
    } else {
      // Final (6th) stop: the very top of the page (main header title).
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
      if (node === els.feedClearBtn && feedClearArmed) return;
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
    refreshUsernameModalCopy();
    if (els.feedModal && !els.feedModal.hidden) renderFeedList();
  }

  function refreshUsernameModalCopy() {
    if (!els.usernameModal || els.usernameModal.hidden) return;
    const dict = I18N[currentLang];
    const editing = els.usernameModal.dataset.mode === "edit";
    if (els.usernameModalTitle) els.usernameModalTitle.textContent = editing ? dict.modal_title_edit : dict.modal_title;
    if (els.usernameModalSub) els.usernameModalSub.textContent = editing ? dict.modal_sub_edit : dict.modal_sub;
  }

  /* ---------- Username identity (prompt modal + shared-link hydration) ---------- */
  function resolveIdentity() {
    // Reading someone else's shared pulse: never prompt on load. The modal
    // only appears once the visitor chooses to start their own new idea.
    if (sharedView) {
      updateIdentityDisplay();
      return;
    }
    showUsernameModal();
  }

  function startNewIdea() {
    sharedView = false;
    sharedAuthorLabel = null;
    sharedAuthorTimestamp = null;

    els.pulseText.readOnly = false;
    els.pulseText.value = "";

    username = null;
    isAnonymous = false;
    participationTimestamp = null;

    updateLockState();
    updateIdentityDisplay();
    generateLink();
    showUsernameModal();
  }

  // Reflects `sharedView` onto the map and dropdown: locked while reading
  // someone else's shared pulse, unlocked once a new idea is started.
  function updateLockState() {
    const locked = sharedView;
    if (els.provinceSelectWrap) els.provinceSelectWrap.classList.toggle("locked", locked);
    if (els.provinceSelect) els.provinceSelect.tabIndex = locked ? -1 : 0;
    if (els.mapWrap) els.mapWrap.classList.toggle("locked", locked);
  }

  function finalizeIdentity() {
    updateIdentityDisplay();
    generateLink();
  }

  function showUsernameModal(opts = {}) {
    const dict = I18N[currentLang];
    const editing = !!opts.editing;

    els.usernameModal.hidden = false;
    els.usernameModal.dataset.mode = editing ? "edit" : "create";

    if (editing) {
      els.usernameInput.value = username || "";
      if (els.usernameModalTitle) els.usernameModalTitle.textContent = dict.modal_title_edit;
      if (els.usernameModalSub) els.usernameModalSub.textContent = dict.modal_sub_edit;
    } else {
      els.usernameInput.value = "";
      if (els.usernameModalTitle) els.usernameModalTitle.textContent = dict.modal_title;
      if (els.usernameModalSub) els.usernameModalSub.textContent = dict.modal_sub;
    }

    window.setTimeout(() => {
      els.usernameInput.focus();
      els.usernameInput.select();
    }, 60);
  }

  function hideUsernameModal() {
    els.usernameModal.hidden = true;
  }

  function updateIdentityDisplay() {
    const dict = I18N[currentLang];
    const locale = currentLang === "ar" ? "ar-DZ" : "en-GB";
    const formatTimestamp = (ts) =>
      new Intl.DateTimeFormat(locale, {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
      }).format(new Date(ts));

    let isDisplayingAnonymous;
    if (els.metricUsername) {
      if (sharedView) {
        isDisplayingAnonymous = !sharedAuthorLabel;
        els.metricUsername.textContent = sharedAuthorLabel || dict.anonymous_label;
      } else if (isAnonymous) {
        isDisplayingAnonymous = true;
        els.metricUsername.textContent = dict.anonymous_label;
      } else {
        isDisplayingAnonymous = false;
        els.metricUsername.textContent = username || dict.metric_no_user;
      }
    }

    if (els.identityUserIcon) {
      els.identityUserIcon.className = isDisplayingAnonymous
        ? "fa-solid fa-user-secret"
        : "fa-solid fa-user";
    }

    if (els.metricTimestamp) {
      const ts = sharedView ? sharedAuthorTimestamp : participationTimestamp;
      if (ts) {
        els.metricTimestamp.textContent = relativeTimeString(ts) || formatTimestamp(ts);
        els.metricTimestamp.title = formatTimestamp(ts);
      } else {
        els.metricTimestamp.textContent = dict.metric_no_user;
        els.metricTimestamp.removeAttribute("title");
      }
    }

    if (els.editUsernameBtn) els.editUsernameBtn.hidden = sharedView;
    if (els.sharedBadge) els.sharedBadge.hidden = !sharedView;
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
      if (!path) return;
      if (sharedView) {
        playLockedBeep();
        return;
      }
      playMapBeep();
      selectProvince(path.id, { fromMap: true });
    });
  }

  /* ---------- Map click audio feedback (Web Audio API) ---------- */
  let audioCtx = null;
  function getAudioContext() {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === "suspended") audioCtx.resume();
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  function playMapBeep() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.07);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {
      /* audio not available — fail silently */
    }
  }

  // A distinct, lower "denied" double-blip — played when the user tries to
  // interact with the map or dropdown while viewing a locked shared pulse.
  function playLockedBeep() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [0, 0.11].forEach((offset) => {
        const t = now + offset;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(240, t);
        osc.frequency.exponentialRampToValueAtTime(160, t + 0.08);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.12, t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.1);
      });
    } catch (e) {
      /* audio not available — fail silently */
    }
  }

  // A short, pleasant two-note "success" chime — played after a successful
  // copy (link or snippet) or share.
  function playCopyBeep() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [
        { freq: 659.25, t: 0 },
        { freq: 987.77, t: 0.09 }
      ].forEach(({ freq, t: offset }) => {
        const t = now + offset;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.16, t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.13);
      });
    } catch (e) {
      /* audio not available — fail silently */
    }
  }

  // A single soft, higher blip — played when a new entry is first written
  // to the local feed (not on every subsequent draft update).
  function playSaveBeep() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1108.73, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.1, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.11);
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
    const p = currentProvinceId ? provinceById.get(currentProvinceId) : null;
    if (els.detailId) els.detailId.textContent = p ? p.id : "—";
    if (els.detailName) {
      els.detailName.textContent = p ? (currentLang === "ar" ? p.name_ar : p.name_en) : "—";
      els.detailName.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
    }
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
    const hasIdentity = isAnonymous || !!username;
    if (sharedView || !currentProvinceId || !text || !hasIdentity) {
      els.outputLink.value = "";
      return;
    }
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    if (!isAnonymous) url.searchParams.set("u", username);
    url.searchParams.set("t", (participationTimestamp || Date.now()).toString());
    url.searchParams.set("p", currentProvinceId);
    url.searchParams.set("d", b64EncodeUnicode(text));
    els.outputLink.value = url.toString();

    const p = provinceById.get(currentProvinceId);
    saveFeedEntry({
      id: `created:${currentProvinceId}:${participationTimestamp}`,
      type: "created",
      url: els.outputLink.value,
      provinceId: currentProvinceId,
      provinceName_en: p ? p.name_en : "",
      provinceName_ar: p ? p.name_ar : "",
      text,
      username: isAnonymous ? null : username,
      isAnonymous,
      timestamp: participationTimestamp || Date.now()
    });
  }

  function hydrateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p");
    const u = params.get("u");
    const t = params.get("t");
    const d = params.get("d");

    if (p && provinceById.has(p)) {
      selectProvince(p, { fromMap: false });
    }

    if (d) {
      try {
        els.pulseText.value = b64DecodeUnicode(d);
        els.pulseText.readOnly = true;
        sharedView = true;
        sharedAuthorLabel = u ? decodeURIComponent(u) : null;
        sharedAuthorTimestamp = t ? Number(t) : null;

        const province = p ? provinceById.get(p) : null;
        saveFeedEntry({
          id: `viewed:${p || "unknown"}:${sharedAuthorTimestamp || "0"}`,
          type: "viewed",
          url: window.location.href,
          provinceId: p || null,
          provinceName_en: province ? province.name_en : "",
          provinceName_ar: province ? province.name_ar : "",
          text: els.pulseText.value,
          username: sharedAuthorLabel,
          isAnonymous: !sharedAuthorLabel,
          timestamp: sharedAuthorTimestamp || Date.now()
        });
      } catch (e) {
        console.warn("Could not decode shared text", e);
      }
    }
  }

  /* ---------- Local feed / archive (localStorage) ----------
     Best-effort persistence: every read/write is wrapped in try/catch so
     the app keeps working even where storage is unavailable or blocked
     (private browsing, restricted iframes, etc.) — the feed feature just
     quietly does nothing in that case. */
  const FEED_STORAGE_KEY = "algeriaPulse:feed";
  const FEED_MAX_ENTRIES = 100;

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadFeed() {
    const raw = safeStorageGet(FEED_STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function persistFeed(list) {
    return safeStorageSet(FEED_STORAGE_KEY, JSON.stringify(list.slice(0, FEED_MAX_ENTRIES)));
  }

  // Upserts by stable id: repeated calls while drafting (every keystroke)
  // update the same entry in place rather than spamming new rows. A toast
  // and save-beep only fire the first time a given id is written.
  function saveFeedEntry(entry) {
    const feed = loadFeed();
    const existingIndex = feed.findIndex((e) => e.id === entry.id);
    const isNew = existingIndex === -1;
    const savedAt = isNew ? Date.now() : feed[existingIndex].savedAt;
    const record = { ...entry, savedAt };

    if (isNew) {
      feed.unshift(record);
    } else {
      feed[existingIndex] = record;
    }

    const ok = persistFeed(feed);
    if (ok && isNew) {
      playSaveBeep();
      showToast(I18N[currentLang].feed_saved_toast, { icon: "fa-bookmark", variant: "save" });
      if (els.feedModal && !els.feedModal.hidden) renderFeedList();
    }
  }

  function deleteFeedEntry(id) {
    const feed = loadFeed().filter((e) => e.id !== id);
    if (persistFeed(feed)) {
      showToast(I18N[currentLang].feed_deleted_toast, { icon: "fa-trash", variant: "warn" });
      renderFeedList();
    }
  }

  function clearFeedStorage() {
    try {
      window.localStorage.removeItem(FEED_STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
    showToast(I18N[currentLang].feed_cleared_toast, { icon: "fa-trash" });
    renderFeedList();
  }

  function handleFeedClearClick() {
    const dict = I18N[currentLang];
    if (!feedClearArmed) {
      feedClearArmed = true;
      els.feedClearBtn.classList.add("confirming");
      els.feedClearBtn.textContent = dict.feed_clear_confirm;
      window.setTimeout(() => {
        feedClearArmed = false;
        els.feedClearBtn.classList.remove("confirming");
        els.feedClearBtn.textContent = dict.feed_clear;
      }, 3000);
      return;
    }
    feedClearArmed = false;
    els.feedClearBtn.classList.remove("confirming");
    els.feedClearBtn.textContent = dict.feed_clear;
    clearFeedStorage();
  }

  function openFeedModal() {
    els.feedModal.hidden = false;
    renderFeedList();
  }
  function closeFeedModal() {
    els.feedModal.hidden = true;
  }

  function renderFeedList() {
    if (!els.feedList) return;
    const dict = I18N[currentLang];
    const feed = loadFeed();

    const filtered = feed.filter((entry) => {
      if (feedFilter === "mine" && entry.type !== "created") return false;
      if (feedFilter === "viewed" && entry.type !== "viewed") return false;
      if (feedSearchTerm) {
        const wilayaName = currentLang === "ar" ? entry.provinceName_ar : entry.provinceName_en;
        const haystack = `${entry.text || ""} ${wilayaName || ""} ${entry.username || ""}`.toLowerCase();
        if (!haystack.includes(feedSearchTerm)) return false;
      }
      return true;
    });

    els.feedList.innerHTML = "";

    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "feed-empty";
      empty.textContent = feed.length ? dict.feed_empty_filtered : dict.feed_empty;
      els.feedList.appendChild(empty);
      return;
    }

    filtered.forEach((entry) => els.feedList.appendChild(buildFeedItemElement(entry)));
  }

  function buildFeedItemElement(entry) {
    const dict = I18N[currentLang];
    const item = document.createElement("div");
    item.className = "feed-item";
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");

    const body = document.createElement("div");
    body.className = "feed-item__body";

    const top = document.createElement("div");
    top.className = "feed-item__top";

    const badge = document.createElement("span");
    badge.className = "feed-item__badge" + (entry.type === "viewed" ? " feed-item__badge--viewed" : "");
    badge.textContent = entry.type === "viewed" ? dict.feed_badge_viewed : dict.feed_badge_created;

    const wilaya = document.createElement("span");
    wilaya.className = "feed-item__wilaya";
    const wilayaName = currentLang === "ar" ? entry.provinceName_ar : entry.provinceName_en;
    wilaya.textContent = wilayaName || "—";

    top.appendChild(badge);
    top.appendChild(wilaya);

    const text = document.createElement("p");
    text.className = "feed-item__text";
    text.textContent = entry.text || "";

    const meta = document.createElement("div");
    meta.className = "feed-item__meta";
    const who = entry.isAnonymous || !entry.username ? dict.anonymous_label : entry.username;
    const metaIcon = entry.isAnonymous || !entry.username ? "fa-user-secret" : "fa-user";
    meta.innerHTML = `<i class="fa-solid ${metaIcon}" aria-hidden="true"></i>`;
    meta.appendChild(document.createTextNode(` ${who} · `));
    const timeSpan = document.createElement("span");
    timeSpan.textContent = relativeTimeString(entry.timestamp) || "";
    meta.appendChild(timeSpan);

    body.appendChild(top);
    body.appendChild(text);
    body.appendChild(meta);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "feed-item__delete";
    deleteBtn.setAttribute("aria-label", dict.feed_deleted_toast);
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash" aria-hidden="true"></i>`;
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteFeedEntry(entry.id);
    });

    const navigate = () => {
      window.location.href = entry.url;
    };
    item.addEventListener("click", navigate);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navigate();
      }
    });

    item.appendChild(body);
    item.appendChild(deleteBtn);
    return item;
  }

  /* ---------- Relative time (timeago) ----------
     Uses Intl.RelativeTimeFormat, which natively localizes to Arabic or
     English (e.g. "5 minutes ago" / "قبل 5 دقائق") without any manual
     string tables. */
  function relativeTimeString(ts) {
    if (!ts) return null;
    const divisions = [
      { amount: 60, unit: "second" },
      { amount: 60, unit: "minute" },
      { amount: 24, unit: "hour" },
      { amount: 7, unit: "day" },
      { amount: 4.34524, unit: "week" },
      { amount: 12, unit: "month" },
      { amount: Number.POSITIVE_INFINITY, unit: "year" }
    ];
    let duration = (ts - Date.now()) / 1000;
    const rtf = new Intl.RelativeTimeFormat(currentLang === "ar" ? "ar" : "en", { numeric: "auto" });
    for (const division of divisions) {
      if (Math.abs(duration) < division.amount) {
        return rtf.format(Math.round(duration), division.unit);
      }
      duration /= division.amount;
    }
    return null;
  }

  /* ---------- Copy / Share ---------- */
  async function copyLink() {
    const dict = I18N[currentLang];
    if (!els.outputLink.value) {
      showToast(dict.need_input, { variant: "warn", icon: "fa-triangle-exclamation" });
      return;
    }
    try {
      await navigator.clipboard.writeText(els.outputLink.value);
      playCopyBeep();
      showToast(dict.copied, { icon: "fa-circle-check" });
    } catch (e) {
      els.outputLink.select();
      try {
        document.execCommand("copy");
        playCopyBeep();
        showToast(dict.copied, { icon: "fa-circle-check" });
      } catch (err) {
        showToast(dict.copy_failed, { variant: "warn", icon: "fa-triangle-exclamation" });
      }
    }
  }

  // "[Algeria Pulse - Wilaya Name] Idea/News: ... | By: Username | Link: ..."
  function buildSnippet() {
    if (!els.outputLink.value) return null;
    const dict = I18N[currentLang];
    const p = currentProvinceId ? provinceById.get(currentProvinceId) : null;
    const wilayaName = p ? (currentLang === "ar" ? p.name_ar : p.name_en) : "";
    const text = els.pulseText.value.trim();
    const who = isAnonymous ? dict.anonymous_label : (username || "");
    return `[${dict.app_title} - ${wilayaName}] ${dict.write_label}: ${text} | ${dict.metric_user_label}: ${who} | ${dict.output_label}: ${els.outputLink.value}`;
  }

  async function copySnippet() {
    const dict = I18N[currentLang];
    const snippet = buildSnippet();
    if (!snippet) {
      showToast(dict.need_input, { variant: "warn", icon: "fa-triangle-exclamation" });
      return;
    }
    try {
      await navigator.clipboard.writeText(snippet);
      playCopyBeep();
      showToast(dict.snippet_copied, { icon: "fa-hashtag" });
    } catch (e) {
      try {
        const temp = document.createElement("textarea");
        temp.value = snippet;
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();
        playCopyBeep();
        showToast(dict.snippet_copied, { icon: "fa-hashtag" });
      } catch (err) {
        showToast(dict.copy_failed, { variant: "warn", icon: "fa-triangle-exclamation" });
      }
    }
  }

  async function shareLink() {
    const dict = I18N[currentLang];
    if (!els.outputLink.value) {
      showToast(dict.need_input, { variant: "warn", icon: "fa-triangle-exclamation" });
      return;
    }
    if (navigator.share) {
      try {
        const p = currentProvinceId ? provinceById.get(currentProvinceId) : null;
        const wilayaName = p ? (currentLang === "ar" ? p.name_ar : p.name_en) : "";
        const text = els.pulseText.value.trim();
        const shareText = `[${dict.app_title} - ${wilayaName}] ${text}`;
        await navigator.share({ title: dict.app_title, text: shareText, url: els.outputLink.value });
        playCopyBeep();
      } catch (e) {
        /* user cancelled — no-op */
      }
    } else {
      copyLink();
    }
  }

  /* ---------- Toast notifications ---------- */
  function showToast(message, opts = {}) {
    if (!els.toastContainer || !message) return;
    const toast = document.createElement("div");
    toast.className = "toast" + (opts.variant ? ` toast--${opts.variant}` : "");

    const icon = document.createElement("i");
    icon.className = `fa-solid ${opts.icon || "fa-circle-check"}`;
    icon.setAttribute("aria-hidden", "true");

    const text = document.createElement("span");
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    els.toastContainer.appendChild(toast);

    // Force a reflow so the enter transition actually plays.
    void toast.offsetWidth;
    toast.classList.add("is-visible");

    window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => toast.remove(), 350);
    }, opts.duration || 2600);
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
