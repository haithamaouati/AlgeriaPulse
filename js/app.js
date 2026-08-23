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
      about_step2_body: "Type your idea, event, or news update in the text field, in Arabic or English — tap the expand icon for a bigger writing space with live counts.",
      about_step3_title: "3. Tag it",
      about_step3_body: "Every pulse carries the #Pulse tag by default — add a preset like Urgent or Traffic, or type your own.",
      about_step4_title: "4. Get your link",
      about_step4_body: "Once a wilaya, a message, and a tag are all in place, a unique link is generated instantly.",
      about_step5_title: "5. Share it anywhere",
      about_step5_body: "Copy the link, copy a ready-made snippet, or share it directly — Algeria Pulse never stores your content.",
      feature_privacy: "100% client-side, zero server storage",
      feature_bilingual: "Full Arabic / English support",
      feature_theme: "Light & dark Green Forest theme",
      feature_map: "Interactive 58-wilaya map",
      feature_identity: "Tap your name or avatar to edit it",
      feature_tags: "Preset & custom hashtags",
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
      new_idea_fab_label: "New idea",
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
      relative_just_now: "just now",
      metric_chars: "chars",
      metric_words: "words",
      metric_lines: "lines",
      expand_editor_aria: "Expand editor",
      expand_editor_title: "Write comfortably",
      tags_label: "Tags",
      custom_tag_placeholder: "Add your own tag…",
      add_tag_aria: "Add tag",
      ticker_empty: "Your local feed will appear here as you create or open pulses."
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
      about_step2_body: "اكتب فكرتك أو الحدث أو الخبر في حقل النص، بالعربية أو الإنجليزية — اضغط أيقونة التوسيع لمساحة كتابة أكبر مع عدادات مباشرة.",
      about_step3_title: "٣. أضف وسمًا",
      about_step3_body: "تحمل كل نبضة وسم #Pulse تلقائيًا — أضف وسمًا جاهزًا مثل عاجل أو مرور، أو اكتب وسمك الخاص.",
      about_step4_title: "٤. احصل على رابطك",
      about_step4_body: "بمجرد اختيار الولاية وكتابة الرسالة وإضافة وسم، يتم إنشاء رابط فريد فورًا.",
      about_step5_title: "٥. شاركه أينما شئت",
      about_step5_body: "انسخ الرابط، انسخ مقتطفًا جاهزًا، أو شاركه مباشرة — نبض الجزائر لا يخزّن محتواك أبدًا.",
      feature_privacy: "١٠٠٪ من جهة العميل، بدون تخزين على أي خادم",
      feature_bilingual: "دعم كامل للغتين العربية والإنجليزية",
      feature_theme: "وضع فاتح وداكن بطابع الغابة الخضراء",
      feature_map: "خريطة تفاعلية لـ ٥٨ ولاية",
      feature_identity: "اضغط على اسمك أو صورتك لتعديله",
      feature_tags: "وسوم جاهزة وأخرى مخصصة",
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
      new_idea_fab_label: "فكرة جديدة",
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
      relative_just_now: "الآن",
      metric_chars: "حرف",
      metric_words: "كلمة",
      metric_lines: "سطر",
      expand_editor_aria: "توسيع المحرر",
      expand_editor_title: "اكتب بارتياح",
      tags_label: "الوسوم",
      custom_tag_placeholder: "أضف وسمك الخاص…",
      add_tag_aria: "إضافة وسم",
      ticker_empty: "سيظهر سجلّك المحلي هنا عند إنشاء أو فتح نبضات."
    }
  };

  // Cycle order for the language toggle button.
  const LANGUAGES = ["en", "ar"];

  // Smart hashtags/tags catalog. Users can also add their own free-form
  // tags via the custom tag input (see addCustomTag()).
  const TAGS = [
    { id: "urgent", en: "Urgent", ar: "عاجل" },
    { id: "alert", en: "Alert", ar: "تنبيه" },
    { id: "services", en: "Services", ar: "خدمات" },
    { id: "traffic", en: "Traffic", ar: "مرور" }
  ];

  // Every pulse automatically carries this branded tag — it's pinned
  // (always active, not user-removable) and alone satisfies the "at least
  // one tag" requirement in generateLink()'s validation gate.
  const DEFAULT_TAG = "pulse";
  const DEFAULT_TAG_LABEL = "Pulse";

  let currentLang = "en";
  let provinces = [];
  let provinceById = new Map();
  let currentProvinceId = null;
  let username = null;
  let isAnonymous = false;
  let participationTimestamp = null;
  let sharedView = false;
  let sharedAuthorLabel = null;
  let sharedAuthorTimestamp = null;
  let selectedTags = [DEFAULT_TAG];
  let sharedTags = [];
  let feedFilter = "all";
  let feedSearchTerm = "";
  let feedClearArmed = false;

  // Resolves a value for the active language, falling back to whichever
  // of the two is available.
  function pickLang(en, ar) {
    if (currentLang === "ar") return ar || en || "";
    return en || ar || "";
  }

  function localizedProvinceName(p) {
    if (!p) return "";
    return pickLang(p.name_en, p.name_ar);
  }

  // Tag chips always use a stable id (e.g. "urgent") as their canonical
  // value in URLs/local storage, so filtering and matching stay consistent
  // no matter which UI language a post was created or is being viewed in.
  // Only the *displayed* hashtag text is localized.
  function tagLabel(id) {
    if (id === DEFAULT_TAG) return DEFAULT_TAG_LABEL;
    const def = TAGS.find((t) => t.id === id);
    if (!def) return id;
    return currentLang === "en" ? def.en : def.ar;
  }

  function renderTagChips() {
    if (!els.tagsRow) return;
    els.tagsRow.innerHTML = "";

    if (els.tagsInputRow) els.tagsInputRow.hidden = sharedView;

    if (sharedView) {
      sharedTags.forEach((id) => {
        const chip = document.createElement("span");
        chip.className = "tag-chip active";
        chip.textContent = `#${tagLabel(id)}`;
        els.tagsRow.appendChild(chip);
      });
      return;
    }

    // The pinned, always-on #Pulse chip — shown first, never removable.
    const pinned = document.createElement("span");
    pinned.className = "tag-chip tag-chip--pinned";
    const pinnedIcon = document.createElement("i");
    pinnedIcon.className = "fa-solid fa-thumbtack";
    pinnedIcon.setAttribute("aria-hidden", "true");
    pinned.appendChild(pinnedIcon);
    pinned.appendChild(document.createTextNode(`#${DEFAULT_TAG_LABEL}`));
    els.tagsRow.appendChild(pinned);

    TAGS.forEach((tagDef) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "tag-chip" + (selectedTags.includes(tagDef.id) ? " active" : "");
      chip.dataset.tag = tagDef.id;
      chip.textContent = `#${tagLabel(tagDef.id)}`;
      els.tagsRow.appendChild(chip);
    });

    // Any selected tag that isn't in the preset catalog (and isn't the
    // pinned default) was typed in by the user via the custom tag input —
    // render it as its own chip with a dedicated remove control.
    const catalogIds = TAGS.map((t) => t.id);
    selectedTags
      .filter((id) => id !== DEFAULT_TAG && !catalogIds.includes(id))
      .forEach((id) => {
        const chip = document.createElement("span");
        chip.className = "tag-chip tag-chip--custom";

        const label = document.createElement("span");
        label.textContent = `#${id}`;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "tag-chip__remove";
        removeBtn.setAttribute("aria-label", "Remove tag");
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-xmark";
        icon.setAttribute("aria-hidden", "true");
        removeBtn.appendChild(icon);
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          selectedTags = selectedTags.filter((t) => t !== id);
          renderTagChips();
          generateLink();
        });

        chip.appendChild(label);
        chip.appendChild(removeBtn);
        els.tagsRow.appendChild(chip);
      });
  }

  // Sanitizes free-form input into a compact, URL-safe tag id (letters,
  // numbers, dashes/underscores only) and adds it to the selection.
  function addCustomTag() {
    if (!els.customTagInput) return;
    const raw = els.customTagInput.value.trim();
    if (!raw) return;

    const id = raw
      .toLowerCase()
      .replace(/[^\p{L}\p{N}_-]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 20);

    els.customTagInput.value = "";
    if (!id) return;

    if (!selectedTags.includes(id)) {
      selectedTags.push(id);
      renderTagChips();
      generateLink();
    }
    els.customTagInput.focus();
  }
  let svgRoot = null;
  let mapGroup = null;
  let mapGroupSel = null;
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

    applyLanguage(currentLang);
    hydrateFromURL();
    updateLockState();
    resolveIdentity();
    loadTicker();

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
    els.textareaHome = $("#textareaHome");
    els.metricUsername = $("#metricUsername");
    els.metricTimestamp = $("#metricTimestamp");
    els.userAvatar = $("#userAvatar");
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
    els.usernameAnonymousBtn = $("#usernameAnonymousBtn");
    els.newIdeaFab = $("#newIdeaFab");
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
    els.tagsRow = $("#tagsRow");
    els.tagsInputRow = $("#tagsInputRow");
    els.customTagInput = $("#customTagInput");
    els.addTagBtn = $("#addTagBtn");
    els.expandTextBtn = $("#expandTextBtn");
    els.expandModal = $("#expandModal");
    els.expandModalTitle = $("#expandModalTitle");
    els.expandCloseBtn = $("#expandCloseBtn");
    els.expandTextareaSlot = $("#expandTextareaSlot");
    els.expandMetrics = $("#expandMetrics");
    els.expandCharCount = $("#expandCharCount");
    els.expandWordCount = $("#expandWordCount");
    els.expandLineCount = $("#expandLineCount");
  }

  /* ---------- Static event bindings ---------- */
  function bindStaticEvents() {
    els.langToggle.addEventListener("click", () => {
      const nextIndex = (LANGUAGES.indexOf(currentLang) + 1) % LANGUAGES.length;
      applyLanguage(LANGUAGES[nextIndex]);
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

    // Clicking the avatar or the username text itself opens the edit
    // flow — no separate pencil icon. Both are inert while reading a
    // shared pulse (there's no "your" identity to edit yet).
    const openUsernameEdit = () => {
      if (sharedView) return;
      showUsernameModal({ editing: true });
    };
    els.userAvatar.addEventListener("click", openUsernameEdit);
    els.metricUsername.addEventListener("click", openUsernameEdit);

    els.newIdeaFab.addEventListener("click", () => {
      startNewIdea();
      if (els.textareaHome) els.textareaHome.scrollIntoView({ behavior: "smooth", block: "center" });
    });

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
      updateExpandMetrics();
    });

    els.tagsRow.addEventListener("click", (e) => {
      const chip = e.target.closest(".tag-chip");
      if (!chip || chip.disabled) return;
      const tag = chip.dataset.tag;
      if (!tag) return;
      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter((t) => t !== tag);
      } else {
        selectedTags.push(tag);
      }
      chip.classList.toggle("active", selectedTags.includes(tag));
      generateLink();
    });

    els.addTagBtn.addEventListener("click", addCustomTag);
    els.customTagInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addCustomTag();
      }
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

    els.expandTextBtn.addEventListener("click", openExpandModal);
    els.expandCloseBtn.addEventListener("click", closeExpandModal);
    els.expandModal.addEventListener("click", (e) => {
      if (e.target === els.expandModal) closeExpandModal();
    });
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
    renderTagChips();
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
    if (els.expandModal && !els.expandModal.hidden) closeExpandModal();

    sharedView = false;
    sharedAuthorLabel = null;
    sharedAuthorTimestamp = null;
    sharedTags = [];
    selectedTags = [DEFAULT_TAG];

    els.pulseText.readOnly = false;
    els.pulseText.value = "";

    username = null;
    isAnonymous = false;
    participationTimestamp = null;

    updateLockState();
    updateIdentityDisplay();
    renderTagChips();
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
    let displayName = "";
    if (els.metricUsername) {
      if (sharedView) {
        isDisplayingAnonymous = !sharedAuthorLabel;
        displayName = sharedAuthorLabel || "";
        els.metricUsername.textContent = sharedAuthorLabel || dict.anonymous_label;
      } else if (isAnonymous) {
        isDisplayingAnonymous = true;
        els.metricUsername.textContent = dict.anonymous_label;
      } else {
        isDisplayingAnonymous = false;
        displayName = username || "";
        els.metricUsername.textContent = username || dict.metric_no_user;
      }
    }

    updateAvatar(displayName, isDisplayingAnonymous);

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

    if (els.userAvatar) els.userAvatar.classList.toggle("user-avatar--locked", sharedView);
    if (els.metricUsername) els.metricUsername.classList.toggle("username-edit--locked", sharedView);
    if (els.sharedBadge) els.sharedBadge.hidden = !sharedView;
  }

  // Renders the circular avatar in the identity bar: the first letter of
  // the display name (uppercased) for a named user/author, or the
  // user-secret icon when anonymous / no name is available. Built with
  // DOM methods rather than innerHTML so arbitrary usernames are always
  // treated as plain text, never markup.
  function updateAvatar(displayName, anonymous) {
    if (!els.userAvatar) return;
    els.userAvatar.innerHTML = "";
    els.userAvatar.classList.toggle("user-avatar--anon", !!anonymous || !displayName);

    if (anonymous || !displayName) {
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-user-secret";
      icon.setAttribute("aria-hidden", "true");
      els.userAvatar.appendChild(icon);
    } else {
      const initial = document.createElement("span");
      initial.textContent = displayName.trim().charAt(0).toUpperCase();
      els.userAvatar.appendChild(initial);
    }
  }

  /* ---------- Expandable writing workspace ----------
     The #pulseText textarea is the same live DOM node throughout — opening
     the expanded workspace physically relocates it into the modal (so
     value, cursor position, readOnly state, and every existing listener
     keep working untouched), and closing moves it straight back into its
     home slot in the text-input card. */
  function openExpandModal() {
    if (!els.pulseText || !els.expandTextareaSlot || !els.expandModal) return;
    els.expandTextareaSlot.appendChild(els.pulseText);
    els.expandModal.hidden = false;
    updateExpandMetrics();
    window.setTimeout(() => els.pulseText.focus(), 60);
  }

  function closeExpandModal() {
    if (!els.pulseText || !els.textareaHome || !els.expandModal) return;
    els.textareaHome.appendChild(els.pulseText);
    els.expandModal.hidden = true;
  }

  function updateExpandMetrics() {
    if (!els.pulseText) return;
    const val = els.pulseText.value;
    if (els.expandCharCount) els.expandCharCount.textContent = val.length;
    const words = val.trim().length ? val.trim().split(/\s+/).length : 0;
    if (els.expandWordCount) els.expandWordCount.textContent = words;
    const lines = val.length ? val.split(/\n/).length : 0;
    if (els.expandLineCount) els.expandLineCount.textContent = lines;
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

  /* ---------- News ticker (powered by the local feed) ----------
     Rather than an external/hardcoded news source, the ticker surfaces
     the user's own local activity — pulses they've created or opened,
     read straight from localStorage. */
  const TICKER_MAX_ITEMS = 20;

  function loadTicker() {
    renderTicker();
    window.setInterval(renderTicker, 25000); // periodically reshuffle
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
    const dict = I18N[currentLang];
    const feed = loadFeed().slice(0, TICKER_MAX_ITEMS);

    if (!feed.length) {
      els.tickerTrack.innerHTML = `<span class="ticker__item">${escapeHtml(dict.ticker_empty)}</span>`;
      return;
    }

    const order = shuffle(feed);
    const html = order
      .map((entry) => {
        const wilayaName = currentLang === "ar" ? entry.provinceName_ar : entry.provinceName_en;
        const who = entry.isAnonymous || !entry.username ? dict.anonymous_label : entry.username;
        const snippet = (entry.text || "").slice(0, 80);
        return `<span class="ticker__item">[${escapeHtml(wilayaName || "—")}] ${escapeHtml(snippet)} — ${escapeHtml(who)}</span>`;
      })
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
      const primary = localizedProvinceName(p);
      const secondary = currentLang === "ar" ? p.name_en : p.name_ar;
      opt.textContent = `${num} — ${primary} (${secondary})`;
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

    // D3 owns the group's transform going forward (smooth zoom/pan
    // transitions live in focusMapOn/resetMapView below). Fall back to a
    // plain DOM click listener if the D3 CDN failed to load.
    if (typeof d3 !== "undefined") {
      mapGroupSel = d3.select(mapGroup);
      d3.select(svgRoot).on("click", (event) => {
        const path = event.target.closest("path[id]");
        if (!path) return;
        if (sharedView) {
          playLockedBeep();
          return;
        }
        playMapBeep();
        selectProvince(path.id, { fromMap: true });
      });
    } else {
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

  /* ---------- Audio engine (Howler.js) ----------
     Howler.js only *plays* audio — it doesn't synthesize tones — so each
     cue is generated once as a short PCM waveform, packaged into a WAV
     data URI, and handed to a Howl instance. Howler then owns playback:
     it decodes once, handles the mobile "unlock on first gesture" dance,
     and replays instantly on every subsequent call (the point of using it
     here over raw oscillators is exactly that low-latency, reliable
     replay). If the Howler CDN fails to load, every play*Beep() call below
     is a silent no-op — the app keeps working without sound. */
  let soundsReady = false;
  let mapBeepSound = null;
  let lockedBeepSound = null;
  let copyBeepSound = null;
  let saveBeepSound = null;

  // Renders a set of tone segments into 16-bit PCM samples and returns a
  // `data:audio/wav;base64,...` URI. Each segment: { freq, freqEnd?, start,
  // duration, type: 'sine'|'square'|'triangle', peak }.
  function synthWavDataURI(segments, sampleRate = 44100) {
    const totalDuration = Math.max(...segments.map((s) => s.start + s.duration));
    const totalSamples = Math.ceil(totalDuration * sampleRate) + 1;
    const data = new Float32Array(totalSamples);

    segments.forEach((seg) => {
      const { freq, freqEnd, start, duration, type = "sine", peak = 0.5 } = seg;
      const startSample = Math.floor(start * sampleRate);
      const segSamples = Math.floor(duration * sampleRate);
      for (let i = 0; i < segSamples; i++) {
        const t = i / sampleRate;
        const progress = duration > 0 ? t / duration : 0;
        const f = freqEnd ? freq + (freqEnd - freq) * progress : freq;
        const phase = 2 * Math.PI * f * t;

        let sample;
        if (type === "square") sample = Math.sign(Math.sin(phase)) || 0;
        else if (type === "triangle") sample = (2 / Math.PI) * Math.asin(Math.sin(phase));
        else sample = Math.sin(phase);

        // Fast attack, gentle release envelope so tones click on cleanly
        // and fade out without popping.
        const attack = Math.min(1, t / 0.008);
        const release = Math.min(1, (duration - t) / 0.05);
        const envelope = Math.max(0, Math.min(attack, release));

        const idx = startSample + i;
        if (idx < data.length) data[idx] += sample * peak * envelope;
      }
    });

    let peakAmp = 0;
    for (let i = 0; i < data.length; i++) peakAmp = Math.max(peakAmp, Math.abs(data[i]));
    const norm = peakAmp > 1 ? 1 / peakAmp : 1;

    const pcm = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
      pcm[i] = Math.max(-1, Math.min(1, data[i] * norm)) * 32767;
    }

    return pcmToWavDataURI(pcm, sampleRate);
  }

  function pcmToWavDataURI(pcm, sampleRate) {
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const dataSize = pcm.length * 2;

    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    const writeStr = (offset, str) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };

    writeStr(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeStr(36, "data");
    view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let i = 0; i < pcm.length; i++) {
      view.setInt16(offset, pcm[i], true);
      offset += 2;
    }

    let binary = "";
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return "data:audio/wav;base64," + btoa(binary);
  }

  function initSounds() {
    if (soundsReady || typeof Howl === "undefined") return;
    try {
      // Ascending "radar" chirp — map click or dropdown selection.
      mapBeepSound = new Howl({
        src: [synthWavDataURI([{ freq: 880, freqEnd: 1320, start: 0, duration: 0.16, type: "sine", peak: 0.5 }])],
        format: ["wav"],
        volume: 0.5
      });

      // Low, descending double-blip — locked/denied interaction attempt.
      lockedBeepSound = new Howl({
        src: [
          synthWavDataURI([
            { freq: 240, freqEnd: 160, start: 0, duration: 0.1, type: "square", peak: 0.32 },
            { freq: 240, freqEnd: 160, start: 0.11, duration: 0.1, type: "square", peak: 0.32 }
          ])
        ],
        format: ["wav"],
        volume: 0.5
      });

      // Two-note success chime — copy link / copy snippet / share.
      copyBeepSound = new Howl({
        src: [
          synthWavDataURI([
            { freq: 659.25, start: 0, duration: 0.13, type: "sine", peak: 0.42 },
            { freq: 987.77, start: 0.09, duration: 0.13, type: "sine", peak: 0.42 }
          ])
        ],
        format: ["wav"],
        volume: 0.55
      });

      // Single soft, higher blip — new local-feed entry saved.
      saveBeepSound = new Howl({
        src: [synthWavDataURI([{ freq: 1108.73, start: 0, duration: 0.11, type: "triangle", peak: 0.32 }])],
        format: ["wav"],
        volume: 0.5
      });

      soundsReady = true;
    } catch (e) {
      soundsReady = false;
    }
  }

  function playMapBeep() {
    initSounds();
    if (mapBeepSound) mapBeepSound.play();
  }

  // A distinct, lower "denied" double-blip — played when the user tries to
  // interact with the map or dropdown while viewing a locked shared pulse.
  function playLockedBeep() {
    initSounds();
    if (lockedBeepSound) lockedBeepSound.play();
  }

  // A short, pleasant two-note "success" chime — played after a successful
  // copy (link or snippet) or share.
  function playCopyBeep() {
    initSounds();
    if (copyBeepSound) copyBeepSound.play();
  }

  // A single soft, higher blip — played when a new entry is first written
  // to the local feed (not on every subsequent draft update).
  function playSaveBeep() {
    initSounds();
    if (saveBeepSound) saveBeepSound.play();
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

  function resetMapView() {
    if (!mapGroup) return;
    applyMapTransform("translate(0,0) scale(1)", { duration: 600 });
  }

  function updateProvinceDetails() {
    const p = currentProvinceId ? provinceById.get(currentProvinceId) : null;
    if (els.detailId) els.detailId.textContent = p ? p.id : "—";
    if (els.detailName) {
      els.detailName.textContent = p ? localizedProvinceName(p) : "—";
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
    const hasTag = selectedTags.length > 0;
    if (sharedView || !currentProvinceId || !text || !hasIdentity || !hasTag) {
      els.outputLink.value = "";
      return;
    }
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    if (!isAnonymous) url.searchParams.set("u", username);
    url.searchParams.set("t", (participationTimestamp || Date.now()).toString());
    url.searchParams.set("p", currentProvinceId);
    if (selectedTags.length) url.searchParams.set("tags", selectedTags.join(","));
    url.searchParams.set("d", b64EncodeUnicode(text));
    els.outputLink.value = url.toString();

    const ts = participationTimestamp || Date.now();
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
      tags: selectedTags.slice(),
      timestamp: ts
    });
  }

  function hydrateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p");
    const u = params.get("u");
    const t = params.get("t");
    const d = params.get("d");
    const tagsParam = params.get("tags");

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
        sharedTags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];
        renderTagChips();

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
          tags: sharedTags.slice(),
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
      renderTicker();
    }
  }

  function deleteFeedEntry(id) {
    const feed = loadFeed().filter((e) => e.id !== id);
    if (persistFeed(feed)) {
      showToast(I18N[currentLang].feed_deleted_toast, { icon: "fa-trash", variant: "warn" });
      renderFeedList();
      renderTicker();
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
    renderTicker();
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

  function feedEntryWilayaName(entry) {
    return pickLang(entry.provinceName_en, entry.provinceName_ar);
  }

  function renderFeedList() {
    if (!els.feedList) return;
    const dict = I18N[currentLang];
    const feed = loadFeed();

    const filtered = feed.filter((entry) => {
      if (feedFilter === "mine" && entry.type !== "created") return false;
      if (feedFilter === "viewed" && entry.type !== "viewed") return false;
      if (feedSearchTerm) {
        const wilayaName = feedEntryWilayaName(entry);
        const tagText = (entry.tags || []).map((id) => tagLabel(id)).join(" ");
        const haystack = `${entry.text || ""} ${wilayaName || ""} ${entry.username || ""} ${tagText}`.toLowerCase();
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
    wilaya.textContent = feedEntryWilayaName(entry) || "—";

    top.appendChild(badge);
    top.appendChild(wilaya);

    const text = document.createElement("p");
    text.className = "feed-item__text";
    text.textContent = entry.text || "";

    body.appendChild(top);
    body.appendChild(text);

    if (entry.tags && entry.tags.length) {
      const tagsRow = document.createElement("div");
      tagsRow.className = "feed-item__tags";
      entry.tags.forEach((id) => {
        const tagChip = document.createElement("span");
        tagChip.className = "feed-item__tag";
        tagChip.textContent = `#${tagLabel(id)}`;
        tagsRow.appendChild(tagChip);
      });
      body.appendChild(tagsRow);
    }

    const meta = document.createElement("div");
    meta.className = "feed-item__meta";
    const who = entry.isAnonymous || !entry.username ? dict.anonymous_label : entry.username;
    const metaIcon = entry.isAnonymous || !entry.username ? "fa-user-secret" : "fa-user";
    meta.innerHTML = `<i class="fa-solid ${metaIcon}" aria-hidden="true"></i>`;
    meta.appendChild(document.createTextNode(` ${who} · `));
    const timeSpan = document.createElement("span");
    timeSpan.textContent = relativeTimeString(entry.timestamp) || "";
    meta.appendChild(timeSpan);

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
    const wilayaName = p ? localizedProvinceName(p) : "";
    const text = els.pulseText.value.trim();
    const who = isAnonymous ? dict.anonymous_label : (username || "");
    const tagsText = selectedTags.length ? ` ${selectedTags.map((id) => `#${tagLabel(id)}`).join(" ")}` : "";
    return `[${dict.app_title} - ${wilayaName}] ${dict.write_label}: ${text}${tagsText} | ${dict.metric_user_label}: ${who} | ${dict.output_label}: ${els.outputLink.value}`;
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
        const wilayaName = p ? localizedProvinceName(p) : "";
        const text = els.pulseText.value.trim();
        const tagsText = selectedTags.length ? ` ${selectedTags.map((id) => `#${tagLabel(id)}`).join(" ")}` : "";
        const shareText = `[${dict.app_title} - ${wilayaName}] ${text}${tagsText}`;
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
