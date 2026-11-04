/* Hero autoplay mini-chat (index.html): a short scripted loop.
   Ambient only — the real interactive demo lives on demo.html. */
(function () {
  "use strict";
  var feed = document.getElementById("hero-chat-feed");
  if (!feed) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SITE = window.SITE_NAME || "Plumber Service Johor Bahru";

  var script = [
    { k: "out",  h: "Pipe leaking under the kitchen sink 😟" },
    { k: "photo",h: '<span class="photo-thumb"><svg viewBox="0 0 120 90" width="120" height="90" role="img" aria-label="Sample photo"><rect width="120" height="90" fill="#31424e"/><rect x="18" y="30" width="84" height="16" rx="8" fill="#8b9aa8"/><circle cx="60" cy="78" r="4" fill="#53BDEB"/><circle cx="52" cy="82" r="2.5" fill="#53BDEB"/></svg></span>' },
    { k: "in",   h: "Got it — leak repair visit. Which area of JB?" },
    { k: "out",  h: "Kempas Baru" },
    { k: "in",   h: "Estimate <b>RM 80 – RM 180</b>* — final price confirmed on-site.<div class=\"disclaimer\">*Demo figures — not real prices.</div>" },
    { k: "in",   h: "Slot tomorrow 9–11 AM work for you? ✅" }
  ];
  var i = 0, timer = null;

  function now() {
    var d = new Date();
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  }
  function step() {
    if (i >= script.length) {
      timer = setTimeout(function () { feed.innerHTML = ""; i = 0; loop(); }, reduce ? 1000 : 4200);
      return;
    }
    var s = script[i++];
    var div = document.createElement("div");
    div.className = "msg " + (s.k === "photo" ? "out" : s.k);
    div.setAttribute("aria-hidden", "true");
    div.innerHTML = s.h + '<span class="t">' + now() + "</span>";
    feed.appendChild(div);
    timer = setTimeout(step, reduce ? 200 : (s.k === "in" ? 1500 : 1100));
  }
  function loop() { step(); }
  loop();
})();
