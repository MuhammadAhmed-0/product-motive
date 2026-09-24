/* ==========================================================================
   ProductMotive: match flow (find-your-match.html)
   A small step machine driven by PM_DATA.matchFlow.
   No dependencies. Loaded with `defer`.
   ========================================================================== */
(function () {
  "use strict";

  var data = window.PM_DATA;
  if (!data || !data.matchFlow) return;

  var flow = data.matchFlow;
  var categories = (data.categories || [])
    .filter(function (c) { return !c.href; })                             /* dedicated landing pages (e.g. web-hosting) aren't wizard categories */
    .concat(flow.any ? [flow.any] : []);

  var STEPS = ["category", "budget", "priorities", "use", "results"];
  var QUESTION_STEPS = ["category", "budget", "priorities", "use"];
  var current = 0;

  var state = { category: null, budget: null, priorities: [], useCase: null };

  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-panel]"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".quiz-step"));
  var stepDotsBox = document.getElementById("quiz-steps");
  var countEl = document.getElementById("quiz-count");
  var btnBack = document.getElementById("btn-back");
  var btnNext = document.getElementById("btn-next");
  var btnNextText = document.getElementById("btn-next-text");
  var btnRestart = document.getElementById("btn-restart");
  var categoryGrid = document.getElementById("category-grid");
  var budgetField = document.getElementById("budget-field");
  var priorityField = document.getElementById("priority-field");
  var useField = document.getElementById("use-field");
  var reqSummary = document.getElementById("req-summary");
  var matchResults = document.getElementById("match-results");

  if (!panels.length || !stepDotsBox) return;

  /* Helpers -------------------------------------------------------------- */

  function budgetSet(id) {
    return flow.budgetFor[id] ? flow.budgets[flow.budgetFor[id]] : flow.budgets.goods;
  }

  function useCases(id) {
    return (flow.useCases && flow.useCases[id]) || flow.useCases.default;
  }

  function iconHtml(name) {
    var id = name && document.getElementById("i-" + name) ? name : "grid";
    return '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-' + id + '"></use></svg>';
  }

  function panel(i) { return panels[i]; }

  /* Step dots ------------------------------------------------------------ */

  QUESTION_STEPS.forEach(function () {
    var dot = document.createElement("span");
    dot.className = "quiz-step";
    stepDotsBox.appendChild(dot);
  });
  dots = Array.prototype.slice.call(stepDotsBox.children);

  /* Rendering ------------------------------------------------------------ */

  function renderCategoryStep() {
    if (categoryGrid.dataset.rendered) {
      preselect();
      return;
    }
    categories.forEach(function (cat) {
      var label = document.createElement("label");
      label.className = "choice";

      var input = document.createElement("input");
      input.type = "radio";
      input.name = "category";
      input.value = cat.id;

      input.addEventListener("change", function () {
        if (!input.checked) return;
        selectCategory(cat);
        refreshSelected("category");
      });

      var icon = document.createElement("span");
      icon.className = "cat-icon";
      icon.innerHTML = iconHtml(cat.icon);

      var body = document.createElement("span");
      var nameEl = document.createElement("span");
      nameEl.className = "choice-name";
      nameEl.textContent = cat.name;
      var descEl = document.createElement("span");
      descEl.className = "choice-desc";
      descEl.textContent = cat.description || "";
      body.appendChild(nameEl);
      body.appendChild(descEl);

      var check = document.createElement("span");
      check.className = "choice-radio";

      label.appendChild(input);
      label.appendChild(icon);
      label.appendChild(body);
      label.appendChild(check);
      categoryGrid.appendChild(label);
    });
    categoryGrid.dataset.rendered = "true";
    preselect();
  }

  function preselect() {
    var q = new URLSearchParams(window.location.search).get("category");
    if (!q) return;
    var cat = categories.find(function (c) { return c.id === q; });
    if (!cat) return;
    var input = categoryGrid.querySelector('input[value="' + q + '"]');
    if (!input) return;
    input.checked = true;
    selectCategory(cat);
    refreshSelected("category");
  }

  function clearField(box) { box.textContent = ""; }

  function renderBudgetStep() {
    clearField(budgetField);
    var set = budgetSet(state.category ? state.category.id : "any");
    set.forEach(function (b) {
      var label = document.createElement("label");
      label.className = "budget-chip";
      label.innerHTML = "<input type='radio' name='budget' value='" + b.id + "'><span class='bc-amt'>" +
        b.label + "</span><span class='bc-cap'>" + b.note + "</span>";
      if (state.budget && state.budget.id === b.id) label.classList.add("is-selected");
      var input = label.querySelector("input");
      if (state.budget && state.budget.id === b.id) input.checked = true;
      input.addEventListener("change", function () {
        if (!input.checked) return;
        state.budget = b;
        refreshSelected("budget");
      });
      budgetField.appendChild(label);
    });
  }

  function renderPrioritiesStep() {
    clearField(priorityField);
    flow.priorities.forEach(function (p) {
      var label = document.createElement("label");
      label.className = "chip";
      label.innerHTML = "<input type='checkbox' name='priority' value='" + p.id + "'>" + p.label;
      if (state.priorities.indexOf(p.id) !== -1) label.classList.add("is-on");
      var input = label.querySelector("input");
      if (state.priorities.indexOf(p.id) !== -1) input.checked = true;
      input.addEventListener("change", function () {
        if (input.checked) {
          if (state.priorities.indexOf(p.id) === -1) state.priorities.push(p.id);
          label.classList.add("is-on");
        } else {
          state.priorities = state.priorities.filter(function (id) { return id !== p.id; });
          label.classList.remove("is-on");
        }
        refreshSelected("priorities");
      });
      priorityField.appendChild(label);
    });
  }

  function renderUseStep() {
    clearField(useField);
    var list = useCases(state.category ? state.category.id : "default");
    list.forEach(function (use) {
      var label = document.createElement("label");
      label.className = "chip";
      label.innerHTML = "<input type='radio' name='use' value='" + use + "'>" + use;
      if (state.useCase === use) label.classList.add("is-on");
      var input = label.querySelector("input");
      if (state.useCase === use) input.checked = true;
      input.addEventListener("change", function () {
        if (!input.checked) return;
        state.useCase = use;
        refreshSelected("use");
      });
      useField.appendChild(label);
    });
  }

  function selectCategory(cat) {
    state.category = cat;
    ["budget", "priorities", "use"].forEach(function (name) {
      var box = name === "budget" ? budgetField : name === "priorities" ? priorityField : useField;
      var panelEl = panels[STEPS.indexOf(name)];
      var h2 = panelEl.querySelector(".quiz-step-title");
      var chip = h2.querySelector(".quiz-step-cat");
      if (!chip) {
        chip = document.createElement("span");
        chip.className = "tag tag--on quiz-step-cat";
        chip.style.marginRight = "10px";
        h2.insertBefore(chip, h2.firstChild);
      }
      chip.textContent = cat.name;
    });
  }

  /* Selection visuals ---------------------------------------------------- */

  function refreshSelected(stepName) {
    var i = STEPS.indexOf(stepName);
    var box;
    if (stepName === "category") {
      box = categoryGrid;
    } else if (stepName === "budget") {
      box = budgetField;
    } else if (stepName === "priorities") {
      box = priorityField;
    } else {
      box = useField;
    }
    var inputs = box.querySelectorAll("input");
    var any = false;
    inputs.forEach(function (input) {
      var label = input.parentNode;
      if (stepName === "priorities") {
        if (input.checked) any = true;
      } else if (input.checked) {
        label.classList.add("is-selected");
        any = true;
      } else {
        label.classList.remove("is-selected");
      }
    });
    if (stepName === "priorities") {
      any = state.priorities.length > 0;
    }
    btnNext.disabled = !any;
    panel(i).classList.add("has-values");
  }

  /* Step machine --------------------------------------------------------- */

  function canContinue() {
    var step = STEPS[current];
    if (step === "category") return !!state.category;
    if (step === "budget") return !!state.budget;
    if (step === "priorities") return state.priorities.length > 0;
    if (step === "use") return !!state.useCase;
    return true;
  }

  function showStep(i) {
    current = i;
    panels.forEach(function (p) { p.classList.remove("is-active"); });
    panel(i).classList.add("is-active");

    var inResults = STEPS[i] === "results";
    btnBack.disabled = i === 0 || inResults;
    btnBack.hidden = inResults;
    btnNext.hidden = inResults;
    btnRestart.style.display = inResults ? "inline-flex" : "none";

    if (!inResults) {
      btnNextText.textContent = STEPS[i] === "use" ? "See my matches" : "Continue";
      btnNext.disabled = !canContinue();
      countEl.textContent = "Step " + (i + 1) + " of " + QUESTION_STEPS.length;
    } else {
      countEl.textContent = "Done";
    }

    dots.forEach(function (d, di) {
      d.classList.toggle("is-active", di === i);
      d.classList.toggle("is-done", di < i);
    });

    if (STEPS[i] === "category" || !categoryGrid.childNodes.length) renderCategoryStep();
    if (STEPS[i] === "budget") renderBudgetStep();
    if (STEPS[i] === "priorities") renderPrioritiesStep();
    if (STEPS[i] === "use") renderUseStep();
    if (inResults) renderResults();

    document.querySelector(".quiz-card").focus && document.querySelector(".quiz-card").setAttribute("tabindex", "-1");
  }

  btnBack.addEventListener("click", function () {
    if (current > 0) showStep(current - 1);
  });

  btnNext.addEventListener("click", function () {
    if (!canContinue()) return;
    if (current < STEPS.length - 1) showStep(current + 1);
  });

  btnRestart.addEventListener("click", function () {
    state = { category: null, budget: null, priorities: [], useCase: null };
    var inputs = document.querySelectorAll(".quiz-body input");
    inputs.forEach(function (input) { input.checked = false; });
    document.querySelectorAll(".chip.is-on").forEach(function (c) { c.classList.remove("is-on"); });
    document.querySelectorAll(".choice.is-selected").forEach(function (c) { c.classList.remove("is-selected"); });
    document.querySelectorAll(".budget-chip.is-selected").forEach(function (c) { c.classList.remove("is-selected"); });
    showStep(0);
  });

  /* Results -------------------------------------------------------------- */

  function labelById(id) {
    var p = flow.priorities.find(function (x) { return x.id === id; });
    return p ? p.label : id;
  }

  function reason(text, tradeoff) {
    var li = document.createElement("li");
    if (tradeoff) li.className = "is-tradeoff";
    var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("class", "icon");
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("focusable", "false");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", tradeoff ? "#i-minus" : "#i-check");
    icon.appendChild(use);
    li.appendChild(icon);
    var span = document.createElement("span");
    span.textContent = text;
    li.appendChild(span);
    return li;
  }

  function matchCard(kind, name, sub, reasonsList) {
    var art = document.createElement("article");
    art.className = "match" + (kind === "primary" ? " match--primary" : "");

    var top = document.createElement("div");
    top.className = "match-top";
    var kicker = document.createElement("p");
    kicker.className = "match-kicker";
    kicker.textContent = kind === "primary" ? "Your ProductMotive Match" : kind === "alt" ? "Alternative" : "Budget Option";
    var badge = document.createElement("span");
    badge.className = "badge" + (kind === "primary" ? " badge--strong" : kind === "budget" ? " badge--neutral" : "");
    var bi = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    bi.setAttribute("class", "icon");
    bi.setAttribute("aria-hidden", "true");
    var bu = document.createElementNS("http://www.w3.org/2000/svg", "use");
    bu.setAttribute("href", "#i-check");
    bi.appendChild(bu);
    badge.appendChild(bi);
    badge.appendChild(document.createTextNode(kind === "primary" ? "Strong Match" : kind === "alt" ? "Good match" : "Lower cost"));
    top.appendChild(kicker);
    top.appendChild(badge);
    art.appendChild(top);

    var body = document.createElement("div");
    var h = document.createElement("h3");
    h.className = "match-name" + (kind === "primary" ? "" : " match-name--sm");
    h.textContent = name;
    var subEl = document.createElement("p");
    subEl.className = "match-sub";
    subEl.textContent = sub;
    body.appendChild(h);
    body.appendChild(subEl);
    var ul = document.createElement("ul");
    ul.className = "reasons";
    reasonsList.forEach(function (r) { ul.appendChild(reason(r.text, r.tradeoff)); });
    body.appendChild(ul);
    art.appendChild(body);

    return art;
  }

  function renderResults() {
    var cat = state.category;
    var budget = state.budget;
    var use = state.useCase;
    var prios = state.priorities.map(labelById);

    var top = prios.slice(0, 1)[0] || "your priorities";

    reqSummary.textContent = "";
    var mk = function (k, v) {
      var tag = document.createElement("span");
      tag.className = "tag";
      var b = document.createElement("b");
      b.textContent = k + ": ";
      tag.appendChild(b);
      tag.appendChild(document.createTextNode(v));
      reqSummary.appendChild(tag);
    };
    mk("Category", cat ? cat.name : "Any");
    mk("Budget", budget ? budget.label : "Any");
    mk("Priorities", prios.length ? prios.join(", ") : "Open");
    mk("Mainly for", use || "In general");

    matchResults.textContent = "";

    matchResults.appendChild(matchCard("primary", "Web hosting, scored end to end", "Web hosting is the one category with complete product data — your answers there become a real, costed shortlist, not a preview.", [
      { text: "Fits your budget (" + (budget ? budget.label : "any") + ")" },
      { text: "Built around your top priority: " + top },
      { text: "For " + (use || "general use") },
      { text: "Every category routes here until its own match data ships", tradeoff: true }
    ]));

    var foot = document.createElement("div");
    foot.className = "match-foot";
    var a = document.createElement("a");
    a.className = "btn btn--primary";
    a.href = "best-web-hosting.html";
    a.textContent = "Run the full web hosting match";
    var arrow = document.createElement("span");
    arrow.className = "btn-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "\u2192";
    a.appendChild(document.createTextNode(" "));
    a.appendChild(arrow);
    foot.appendChild(a);
    var note = document.createElement("p");
    note.className = "match-footnote";
    note.textContent = "Answer six questions about your site, traffic and skills and the web hosting engine scores every provider (free static included) against your exact answers.";
    foot.appendChild(note);
    matchResults.appendChild(foot);
  }

  /* Boot ----------------------------------------------------------------- */

  renderCategoryStep();
  showStep(0);
})();