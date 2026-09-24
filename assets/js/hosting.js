/* ==========================================================================
   ProductMotive: web hosting landing (web-hosting.html)
   An edge-case quiz → scored shortlist → comparison table + host cards.
   All content comes from PM_DATA.hosting (see assets/js/data.js).
   No dependencies. Loaded with `defer`.
   ========================================================================== */
(function () {
  "use strict";

  var data = window.PM_DATA;
  if (!data || !data.hosting) return;

  var cfg = data.hosting;
  var questions = cfg.questions;
  var hosts = cfg.hosts;

  var STEPS = questions.map(function (q) { return q.id; });
  var RESULTS = "results";
  STEPS.push(RESULTS);
  var QUESTION_COUNT = questions.length;

  var answers = {};
  var current = 0;

  /* DOM ------------------------------------------------------------------- */

  function byId(id) { return document.getElementById(id); }

  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-hz-panel]"));
  var stepBox = byId("hz-steps");
  var countEl = byId("hz-count");
  var btnBack = byId("hz-back");
  var btnNext = byId("hz-next");
  var btnNextText = byId("hz-next-text");
  var btnRestart = byId("hz-restart");
  var reqSummary = byId("hz-req-summary");
  var hzType = byId("hz-type");
  var matchResults = byId("hz-match-results");
  var cmpBody = byId("cmp-body");
  var hostGrid = byId("host-grid");

  if (!panels.length || !stepBox) return;

  function iconEl(name) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#i-" + name);
    svg.appendChild(use);
    return svg;
  }

  /* Step dots ------------------------------------------------------------ */

  for (var di = 0; di < QUESTION_COUNT; di++) {
    var dot = document.createElement("span");
    dot.className = "quiz-step";
    stepBox.appendChild(dot);
  }
  var dots = Array.prototype.slice.call(stepBox.children);

  /* Question rendering ---------------------------------------------------- */

  function optionLabel(qId, optId) {
    var q = questions.filter(function (x) { return x.id === qId; })[0];
    if (!q) return optId;
    var opt = q.options.filter(function (x) { return x.id === optId; })[0];
    return opt ? opt.label : optId;
  }

  function renderQuestion(q) {
    if (!q) return;
    var box = byId("hz-fields-" + q.id);
    if (!box) return;
    box.textContent = "";

    if (q.id === "budget") {
      q.options.forEach(function (opt) {
        var label = document.createElement("label");
        label.className = "budget-chip";
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "hz-" + q.id;
        input.value = opt.id;
        if (answers[q.id] === opt.id) { input.checked = true; label.classList.add("is-selected"); }
        input.addEventListener("change", function () {
          if (!input.checked) return;
          answers[q.id] = opt.id;
          refreshSelected(q.id, box);
        });
        var amt = document.createElement("span");
        amt.className = "bc-amt";
        amt.textContent = opt.label;
        var cap = document.createElement("span");
        cap.className = "bc-cap";
        cap.textContent = opt.copy || "";
        label.appendChild(input);
        label.appendChild(amt);
        label.appendChild(cap);
        box.appendChild(label);
      });
      return;
    }

    q.options.forEach(function (opt) {
      var label = document.createElement("label");
      label.className = "choice";

      var input = document.createElement("input");
      input.type = "radio";
      input.name = "hz-" + q.id;
      input.value = opt.id;
      if (answers[q.id] === opt.id) input.checked = true;

      input.addEventListener("change", function () {
        if (!input.checked) return;
        answers[q.id] = opt.id;
        refreshSelected(q.id, box);
      });

      var body = document.createElement("span");
      var nameEl = document.createElement("span");
      nameEl.className = "choice-name";
      nameEl.textContent = opt.label;
      body.appendChild(nameEl);
      if (opt.copy) {
        var descEl = document.createElement("span");
        descEl.className = "choice-desc";
        descEl.textContent = opt.copy;
        body.appendChild(descEl);
      }

      var check = document.createElement("span");
      check.className = "choice-radio";

      label.appendChild(input);
      label.appendChild(body);
      label.appendChild(check);
      box.appendChild(label);
    });
  }

  function refreshSelected(qId, box) {
    box.querySelectorAll("input").forEach(function (input) {
      if (input.type === "radio") {
        input.closest(".choice,.budget-chip").classList.toggle("is-selected", input.checked);
      }
    });
    btnNext.disabled = !canContinue();
  }

  /* Scoring -------------------------------------------------------------- */

  function matchWhen(when) {
    for (var key in when) {
      if (when.hasOwnProperty(key) && answers[key] !== when[key]) return false;
    }
    return true;
  }

  function scoreHost(host) {
    var score = 0;
    (host.rules || []).forEach(function (r) {
      if (matchWhen(r.when)) score += r.points;
    });
    return score;
  }

  function ranked() {
    return hosts
      .map(function (h, i) { return { host: h, score: scoreHost(h), index: i }; })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return a.index - b.index;
      });
  }

  /* Layer 1: find the right type of hosting (shared / vps / cloud / managed-wp / dedicated) */

  function bestType() {
    var best = null;
    var bestScore = -Infinity;
    var reasons = [];
    (cfg.types || []).forEach(function (t) {
      var score = 0;
      var hits = [];
      (t.rules || []).forEach(function (r) {
        if (matchWhen(r.when)) {
          score += r.points;
          if (r.points > 0 && r.why) hits.push({ why: r.why, points: r.points });
        }
      });
      if (score > bestScore) { bestScore = score; best = t; reasons = hits; }
    });
    reasons.sort(function (a, b) { return b.points - a.points; });
    return {
      type: best,
      score: bestScore,
      reasons: reasons.slice(0, 3).map(function (h) { return h.why; })
    };
  }

  /* Layer 2: best host of that type, then a strong alternative */

  function rankByType() {
    var rankings = ranked();
    var bt = bestType();
    var sameType = rankings.filter(function (r) {
      return (r.host.typeCat || []).indexOf(bt.type.id) !== -1;
    });
    var primary = sameType[0] || rankings[0];
    var alt = sameType[1] || rankings.filter(function (r) { return r.host.slug !== primary.host.slug; })[0];
    return { bt: bt, primary: primary, alt: alt };
  }

  /* Results -------------------------------------------------------------- */

  function reasonItem(cls, icon, text) {
    var li = document.createElement("li");
    li.className = cls ? "is-tradeoff" : "";
    li.appendChild(iconEl(icon));
    var span = document.createElement("span");
    span.textContent = text;
    li.appendChild(span);
    return li;
  }

  /* Plan pick: which plan inside the recommended host fits best ----------- */

  function topPlan(host) {
    var plans = host.plans || [];
    var best = null;
    var bestVal = -1;
    plans.forEach(function (p) {
      var matched = 0;
      var total = 0;
      var when = p.when || {};
      for (var k in when) {
        if (when.hasOwnProperty(k)) {
          total++;
          if (answers[k] === when[k]) matched++;
        }
      }
      var val = matched * 10 + (matched === total && total > 0 ? 1 : 0) + (p.popular ? .01 : 0);
      if (val > bestVal) { bestVal = val; best = p; }
    });
    return best || (plans[0] || null);
  }

  function buildPlanBox(host) {
    var rec = topPlan(host);
    var wrap = document.createElement("div");
    wrap.className = "plan-box";

    var label = document.createElement("p");
    label.className = "plan-label";
    label.textContent = "Which plan fits";
    wrap.appendChild(label);

    var list = document.createElement("ul");
    list.className = "plan-list";
    (host.plans || []).forEach(function (p) {
      var li = document.createElement("li");
      li.className = "plan-row" + (p === rec ? " is-on" : "");

      var check = document.createElement("span");
      check.className = "plan-check";
      if (p === rec) check.appendChild(iconEl("check"));

      var name = document.createElement("strong");
      name.className = "plan-name";
      name.textContent = p.name;

      var tag = document.createElement("span");
      tag.className = "plan-tag";
      tag.textContent = p.tag || "";

      var note = document.createElement("span");
      note.className = "plan-note";
      note.textContent = p.note || "";

      li.appendChild(check);
      li.appendChild(name);
      li.appendChild(tag);
      li.appendChild(note);
      list.appendChild(li);
    });
    wrap.appendChild(list);
    return wrap;
  }

  function ctaLink(host) {
    var a = document.createElement("a");
    a.className = "btn btn--primary match-cta";
    a.href = host.aff || host.url;
    a.target = "_blank";
    a.rel = "sponsored nofollow noopener";
    a.appendChild(document.createTextNode("Get " + host.name + " "));
    var arrow = document.createElement("span");
    arrow.className = "btn-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "\u2192";
    a.appendChild(arrow);
    return a;
  }

  function buildMatch(primary, alt, host, kicker, badgeText) {
    var art = document.createElement("article");
    art.className = "match" + (primary ? " match--primary" : "");

    var top = document.createElement("div");
    top.className = "match-top";
    var k = document.createElement("p");
    k.className = "match-kicker";
    k.textContent = kicker;
    var badge = document.createElement("span");
    badge.className = "badge" + (primary ? " badge--strong" : " badge--neutral");
    badge.appendChild(iconEl("check"));
    badge.appendChild(document.createTextNode(badgeText));
    top.appendChild(k);
    top.appendChild(badge);
    art.appendChild(top);

    var head = document.createElement("div");
    head.className = "match-head";
    head.appendChild(hostBadge(host, primary));
    var names = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.className = "match-name" + (primary ? "" : " match-name--sm");
    h3.textContent = host.name;
    var sub = document.createElement("p");
    sub.className = "match-sub";
    sub.textContent = primary ? host.tagline : host.bestFor;
    names.appendChild(h3);
    names.appendChild(sub);
    head.appendChild(names);
    art.appendChild(head);

    var ul = document.createElement("ul");
    ul.className = "reasons";
    [primary ? "Top overall fit for your answers" : "Strong runner-up for your answers",
     host.reason,
     "Sits comfortably in your " + (optionLabel("budget", answers.budget) || "budget").toLowerCase() + " preference",
     "Suits your experience level: " + (optionLabel("skill", answers.skill) || "all levels").toLowerCase()]
      .filter(function (t) { return t; })
      .forEach(function (t) { ul.appendChild(reasonItem(false, "check", t)); });
    ul.appendChild(reasonItem(true, "minus", host.tradeoff));
    art.appendChild(ul);

    art.appendChild(buildPlanBox(host));

    art.appendChild(ctaLink(host));
    return art;
  }

  function hostBadge(host, big) {
    var span = document.createElement("span");
    span.className = "host-badge" + (big ? "" : " host-badge--sm");
    span.style.backgroundColor = host.accent;
    span.setAttribute("aria-hidden", "true");
    span.textContent = host.mark;
    return span;
  }

  function renderTypeBanner(bt) {
    if (!hzType) return;
    hzType.textContent = "";

    var card = document.createElement("section");
    card.className = "type-card";

    var label = document.createElement("p");
    label.className = "type-label";
    label.textContent = "The type of hosting that fits you";
    card.appendChild(label);

    var name = document.createElement("h2");
    name.className = "type-name";
    name.textContent = bt.type.name;
    card.appendChild(name);

    var tagline = document.createElement("p");
    tagline.className = "type-tagline";
    tagline.textContent = bt.type.tagline;
    card.appendChild(tagline);

    if (bt.reasons.length) {
      var ul = document.createElement("ul");
      ul.className = "type-reasons";
      bt.reasons.forEach(function (r) { ul.appendChild(reasonItem(false, "check", r)); });
      card.appendChild(ul);
    }

    var call = document.createElement("p");
    call.className = "type-call";
    call.textContent = "That is the category to buy in. Here is the strongest host of that type — and a solid alternative:";
    card.appendChild(call);

    hzType.appendChild(card);

    (cfg.checklist || []).slice(0, 2).forEach(function (c) {
      if (!matchWhen(c.when)) return;
      var w = document.createElement("div");
      w.className = "fit-warn";
      var strong = document.createElement("strong");
      strong.textContent = "Worth flagging";
      w.appendChild(strong);
      var text = document.createElement("span");
      text.textContent = " " + c.text;
      w.appendChild(text);
      hzType.appendChild(w);
    });
  }

  function renderResults() {
    var sel = rankByType();
    var u = answerLabel("use");
    var s = answerLabel("skill");
    var t = answerLabel("traffic");

    reqSummary.textContent = "";
    var addTag = function (k, v) {
      var tag = document.createElement("span");
      tag.className = "tag";
      var b = document.createElement("b");
      b.textContent = k + ": ";
      tag.appendChild(b);
      tag.appendChild(document.createTextNode(v));
      reqSummary.appendChild(tag);
    };
    addTag("Site type", u);
    addTag("Experience", s);
    addTag("Traffic", t);
    addTag("Budget", optionLabel("budget", answers.budget));

    matchResults.textContent = "";
    if (!sel.primary) return;

    renderTypeBanner(sel.bt);

    matchResults.appendChild(buildMatch(true, !!sel.alt, sel.primary.host, "Your recommendation", "Top match"));
    if (sel.alt && sel.alt.host.slug !== sel.primary.host.slug) {
      matchResults.appendChild(buildMatch(false, false, sel.alt.host, "Alternative", "Good match"));
    }
  }

  function answerLabel(qId) {
    return optionLabel(qId, answers[qId]);
  }

  /* Comparison table ------------------------------------------------------- */

  function renderCompare() {
    if (!cmpBody) return;
    cmpBody.textContent = "";
    hosts.forEach(function (host) {
      var tr = document.createElement("tr");

      var tdHost = document.createElement("td");
      tdHost.setAttribute("data-label", "Host");
      tdHost.appendChild(hostBadge(host, false));
      var strong = document.createElement("strong");
      strong.textContent = host.name;
      tdHost.appendChild(strong);

      var tdType = document.createElement("td");
      tdType.setAttribute("data-label", "Type");
      tdType.textContent = host.type;

      var tdBest = document.createElement("td");
      tdBest.setAttribute("data-label", "Best for");
      tdBest.textContent = host.bestFor;

      var tdSkill = document.createElement("td");
      tdSkill.setAttribute("data-label", "Skill");
      tdSkill.textContent = host.skill;

      var tdBudget = document.createElement("td");
      tdBudget.setAttribute("data-label", "Budget");
      tdBudget.textContent = host.budgetTag;

      var tdCta = document.createElement("td");
      tdCta.setAttribute("data-label", "Get started");
      var a = document.createElement("a");
      a.className = "btn btn--sm btn--primary";
      a.href = host.aff || host.url;
      a.target = "_blank";
      a.rel = "sponsored nofollow noopener";
      a.textContent = "Get started";
      tdCta.appendChild(a);

      tr.appendChild(tdHost);
      tr.appendChild(tdType);
      tr.appendChild(tdBest);
      tr.appendChild(tdSkill);
      tr.appendChild(tdBudget);
      tr.appendChild(tdCta);
      cmpBody.appendChild(tr);
    });
  }

  /* Host cards ------------------------------------------------------------- */

  function renderHosts() {
    if (!hostGrid) return;
    hostGrid.textContent = "";
    hosts.forEach(function (host) {
      var card = document.createElement("article");
      card.className = "host-card";

      var top = document.createElement("div");
      top.className = "hc-top";
      top.appendChild(hostBadge(host, true));

      var titleWrap = document.createElement("div");
      var h3 = document.createElement("h3");
      h3.className = "hc-name";
      h3.textContent = host.name;
      var pType = document.createElement("p");
      pType.className = "hc-type";
      pType.textContent = host.type + " · " + host.budgetTag;
      titleWrap.appendChild(h3);
      titleWrap.appendChild(pType);
      top.appendChild(titleWrap);

      var tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = host.bestFor;
      top.appendChild(tag);
      card.appendChild(top);

      var body = document.createElement("div");
      body.className = "hc-body";
      var tagline = document.createElement("p");
      tagline.className = "hc-tagline";
      tagline.textContent = host.tagline;
      body.appendChild(tagline);

      var ul = document.createElement("ul");
      ul.className = "reasons";
      host.pros.forEach(function (pro) { ul.appendChild(reasonItem(false, "check", pro)); });
      body.appendChild(ul);

      var ulCons = document.createElement("ul");
      ulCons.className = "reasons tradeoffs";
      host.cons.forEach(function (con) { ulCons.appendChild(reasonItem(true, "minus", con)); });
      body.appendChild(ulCons);
      card.appendChild(body);

      card.appendChild(ctaLink(host));
      hostGrid.appendChild(card);
    });
  }

  /* Step machine ------------------------------------------------------------ */

  function canContinue() {
    var step = STEPS[current];
    if (step === RESULTS) return true;
    return !!answers[step];
  }

  function showStep(i) {
    current = i;
    panels.forEach(function (p) { p.classList.remove("is-active"); });
    panels[i].classList.add("is-active");

    var inResults = STEPS[i] === RESULTS;
    btnBack.disabled = i === 0 || inResults;
    btnBack.hidden = inResults;
    btnNext.hidden = inResults;
    btnRestart.style.display = inResults ? "inline-flex" : "none";

    if (!inResults) {
      btnNextText.textContent = i === STEPS.length - 2 ? "Show my shortlist" : "Continue";
      btnNext.disabled = !canContinue();
      countEl.textContent = "Step " + (i + 1) + " of " + QUESTION_COUNT;
    } else {
      countEl.textContent = "Done — " + QUESTION_COUNT + " questions";
    }

    dots.forEach(function (d, di) {
      d.classList.toggle("is-active", di === i);
      d.classList.toggle("is-done", di < i);
    });

    if (i < QUESTION_COUNT) renderQuestion(questions[i]);
    if (inResults) renderResults();
  }

  btnBack.addEventListener("click", function () {
    if (current > 0) showStep(current - 1);
  });

  btnNext.addEventListener("click", function () {
    if (!canContinue()) return;
    if (current < STEPS.length - 1) showStep(current + 1);
  });

  btnRestart.addEventListener("click", function () {
    answers = {};
    document.querySelectorAll(".quiz-panel input").forEach(function (input) { input.checked = false; });
    document.querySelectorAll(".choice.is-selected, .budget-chip.is-selected").forEach(function (el) {
      el.classList.remove("is-selected");
    });
    showStep(0);
  });

  /* Boot ------------------------------------------------------------------ */

  renderCompare();
  renderHosts();
  showStep(0);
})();