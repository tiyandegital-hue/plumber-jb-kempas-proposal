/* Interactive WhatsApp quote-bot demo (demo.html).
   Fully scripted, client-side, no data leaves the browser.
   Every price is labeled a DEMO figure — never a real quote. */
(function () {
  "use strict";
  var SITE = window.SITE_NAME || "Plumber Service Johor Bahru";
  var feed = document.getElementById("chat-feed");
  var controls = document.getElementById("chat-controls");
  if (!feed || !controls) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var state = { problem: null, problemLabel: "", area: "", slot: "", step: "start" };

  var PROBLEMS = {
    leak:  { label: "Leaking pipe / tap", job: "a leak repair visit", range: "RM 80 – RM 180" },
    clog:  { label: "Clogged drain",      job: "a drain-clearing visit", range: "RM 60 – RM 120" },
    heater:{ label: "No hot water",       job: "a water-heater check", range: "RM 150 – RM 300" }
  };
  var AREAS = ["Kempas Baru", "Skudai", "Tebrau", "Taman Sentosa", "Elsewhere in JB"];
  var SLOTS = ["Today 3–5 PM", "Tomorrow 9–11 AM", "Tomorrow 2–4 PM"];

  /* Sample "photos" — simple inline SVGs, clearly labeled DEMO SAMPLE. */
  var PHOTOS = {
    leak: { title: "Sample: burst pipe", svg:
      '<svg viewBox="0 0 120 90" width="120" height="90" role="img" aria-label="Sample photo: leaking pipe under a sink"><rect width="120" height="90" fill="#31424e"/><rect x="18" y="30" width="84" height="16" rx="8" fill="#8b9aa8"/><rect x="52" y="30" width="16" height="40" fill="#6e7f8e"/><circle cx="60" cy="78" r="4" fill="#53BDEB"/><circle cx="52" cy="82" r="2.5" fill="#53BDEB"/><rect x="8" y="8" width="104" height="20" rx="4" fill="#22303c"/></svg>' },
    clog: { title: "Sample: clogged sink", svg:
      '<svg viewBox="0 0 120 90" width="120" height="90" role="img" aria-label="Sample photo: clogged sink"><rect width="120" height="90" fill="#31424e"/><ellipse cx="60" cy="48" rx="38" ry="22" fill="#22303c"/><ellipse cx="60" cy="46" rx="28" ry="15" fill="#1a242e"/><circle cx="60" cy="46" r="7" fill="#0d141b"/><rect x="56" y="8" width="8" height="26" fill="#8b9aa8"/></svg>' },
    heater: { title: "Sample: water heater", svg:
      '<svg viewBox="0 0 120 90" width="120" height="90" role="img" aria-label="Sample photo: water heater unit"><rect width="120" height="90" fill="#31424e"/><rect x="38" y="14" width="44" height="62" rx="10" fill="#8b9aa8"/><rect x="46" y="60" width="28" height="8" rx="3" fill="#22303c"/><circle cx="60" cy="32" r="5" fill="#22303c"/><rect x="52" y="76" width="4" height="10" fill="#6e7f8e"/><rect x="64" y="76" width="4" height="10" fill="#6e7f8e"/></svg>' }
  };

  function now() {
    var d = new Date();
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  }
  function scrollDown() { feed.scrollTop = feed.scrollHeight; }

  function addMsg(html, kind) {
    var div = document.createElement("div");
    div.className = "msg " + (kind || "in");
    div.setAttribute("role", "listitem");
    div.innerHTML = html + '<span class="t">' + now() +
      (kind === "out" ? ' <span class="ticks" aria-hidden="true">&#10003;&#10003;</span>' : "") + "</span>";
    feed.appendChild(div);
    scrollDown();
    return div;
  }
  function typing(cb) {
    var t = document.createElement("div");
    t.className = "typing";
    t.setAttribute("aria-hidden", "true");
    t.innerHTML = "<i></i><i></i><i></i>";
    feed.appendChild(t); scrollDown();
    setTimeout(function () { t.remove(); cb(); }, reduce ? 60 : 950);
  }
  function clearControls() { controls.innerHTML = ""; }

  function chipRow(options, handler) {
    clearControls();
    var wrap = document.createElement("div");
    wrap.className = "chips";
    wrap.setAttribute("role", "group");
    options.forEach(function (opt) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = opt.label;
      b.addEventListener("click", function () {
        wrap.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
        addMsg(escapeHtml(opt.label), "out");
        handler(opt);
      });
      wrap.appendChild(b);
    });
    controls.appendChild(wrap);
    var first = wrap.querySelector("button");
    if (first) first.focus({ preventScroll: true });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function photoStep() {
    typing(function () {
      addMsg("In real life I'd ask for a quick photo of the problem. Tap one of the <b>demo sample photos</b> below to continue.", "in");
      clearControls();
      var wrap = document.createElement("div");
      wrap.className = "photo-pick";
      Object.keys(PHOTOS).forEach(function (key) {
        var p = PHOTOS[key];
        var fig = document.createElement("figure");
        var b = document.createElement("button");
        b.type = "button";
        b.innerHTML = p.svg;
        b.setAttribute("aria-label", p.title + " (demo sample)");
        b.addEventListener("click", function () {
          wrap.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
          state.step = "photo-sent";
          addMsg('<span class="photo-thumb">' + p.svg + "</span><br><span class=\"small\">" + escapeHtml(p.title) + " — DEMO SAMPLE</span>", "out");
          analyseStep();
        });
        var cap = document.createElement("figcaption");
        cap.textContent = p.title;
        fig.appendChild(b); fig.appendChild(cap);
        wrap.appendChild(fig);
      });
      controls.appendChild(wrap);
    });
  }

  function analyseStep() {
    typing(function () {
      addMsg("Photo received. Looks like " + escapeHtml(state.problemLabel.toLowerCase()) +
        " — typically " + escapeHtml(PROBLEMS[state.problem].job) + ".", "in");
      typing(function () {
        addMsg("Which area of Johor Bahru are you in?", "in");
        chipRow(AREAS.map(function (a) { return { label: a, value: a }; }), function (opt) {
          state.area = opt.value;
          quoteStep();
        });
      });
    });
  }

  function quoteStep() {
    var p = PROBLEMS[state.problem];
    typing(function () {
      addMsg("For <b>" + escapeHtml(state.problemLabel.toLowerCase()) + "</b> in <b>" +
        escapeHtml(state.area) + "</b>: estimated <b>" + escapeHtml(p.range) + "</b>* — final price confirmed on-site after inspection." +
        '<div class="disclaimer">*DEMO figures — not real prices. The business sets its own ranges.</div>', "in");
      typing(function () {
        addMsg("Want me to lock in a visit slot?", "in");
        chipRow([{ label: "Yes, book me in" }, { label: "Not now" }], function (opt) {
          if (opt.label.indexOf("Yes") === 0) slotStep(); else declineStep();
        });
      });
    });
  }

  function slotStep() {
    addMsg("Pick a slot — in the live version this syncs with your real calendar:", "in");
    chipRow(SLOTS.map(function (s) { return { label: s }; }), function (opt) {
      state.slot = opt.label;
      detailsStep();
    });
  }

  function detailsStep() {
    typing(function () {
      addMsg("Last step — what's your <b>name and street</b>? (Type anything — nothing here is real or stored.)", "in");
      clearControls();
      var wrap = document.createElement("form");
      wrap.className = "free-text";
      wrap.innerHTML = '<input type="text" id="demo-name" name="demo-name" placeholder="e.g. Amir, Jalan Permatang" aria-label="Your name and street (demo only — not stored)" autocomplete="off" maxlength="80">' +
        '<button type="submit" aria-label="Send"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#052015" stroke-width="2.4"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button>';
      wrap.addEventListener("submit", function (e) {
        e.preventDefault();
        var v = wrap.querySelector("input").value.trim() || "Demo Customer";
        wrap.querySelectorAll("input,button").forEach(function (x) { x.disabled = true; });
        addMsg(escapeHtml(v), "out");
        confirmStep(v);
      });
      controls.appendChild(wrap);
      wrap.querySelector("input").focus({ preventScroll: true });
    });
  }

  function confirmStep(name) {
    var p = PROBLEMS[state.problem];
    typing(function () {
      addMsg('<div class="card-title">SAMPLE BOOKING</div>' +
        "<b>" + escapeHtml(p.label) + "</b><br>" +
        escapeHtml(state.area) + " · " + escapeHtml(state.slot) + "<br>" +
        escapeHtml(name) +
        '<div class="disclaimer">SAMPLE — no real booking was made.</div>', "in bot-card");
      typing(function () {
        addMsg("That whole conversation took about <b>60 seconds</b> — at 2 AM, with nobody awake on your side. " +
          "On your real WhatsApp number, this runs <b>24/7</b>: quoting, booking, and reminding customers automatically, in your prices and your words.", "in");
        typing(function () {
          addMsg('This page is a <b>proposal demo</b> built by Tiyan Digital — not ' + escapeHtml(SITE) + "'s live system. " +
            'Want the full picture? <a href="how-it-works.html" style="color:var(--green)">See how it works →</a> · <a href="pricing.html" style="color:var(--green)">Pricing →</a>', "in");
          clearControls();
          var wrap = document.createElement("div");
          wrap.className = "chips";
          var b = document.createElement("button");
          b.type = "button"; b.className = "chip"; b.textContent = "↻ Restart demo";
          b.addEventListener("click", function () { feed.innerHTML = ""; start(); });
          wrap.appendChild(b);
          controls.appendChild(wrap);
        });
      });
    });
  }

  function declineStep() {
    typing(function () {
      addMsg("No problem — your quote is saved here in the demo. When you're ready, it's one tap.", "in");
      typing(function () {
        addMsg('Curious what the full system looks like behind this chat? <a href="how-it-works.html" style="color:var(--green)">How it works →</a> · <a href="pricing.html" style="color:var(--green)">Pricing →</a>', "in");
        clearControls();
      });
    });
  }

  function start() {
    state = { problem: null, problemLabel: "", area: "", slot: "", step: "start" };
    typing(function () {
      addMsg("Hi 👋 I'm the quote assistant for <b>" + escapeHtml(SITE) + "</b>.<br><b>This is a DEMO</b> — try it like a real customer would.", "in");
      typing(function () {
        addMsg("What's the plumbing problem?", "in");
        chipRow(Object.keys(PROBLEMS).map(function (k) {
          return { label: PROBLEMS[k].label, value: k };
        }), function (opt) {
          state.problem = opt.value;
          state.problemLabel = PROBLEMS[opt.value].label;
          photoStep();
        });
      });
    });
  }

  var restart = document.getElementById("chat-restart");
  if (restart) restart.addEventListener("click", function () { feed.innerHTML = ""; start(); });

  start();
})();
