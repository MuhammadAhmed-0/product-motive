/* ==========================================================================
   ProductMotive: data-driven components
   Renders category + guide grids from PM_DATA (data.js) into <template>
   based markup. Header/menu behaviour lives in assets/js/core.js.
   Only loaded on pages with `[data-component]` grids.
   No dependencies. Loaded with `defer`.
   ========================================================================== */
(function () {
  "use strict";

  var data = window.PM_DATA;
  if (!data) return;

  var CTA = data.ctaHref || "find-your-match.html";

  /** Clone a <template> and return its first element. */
  function fromTemplate(id) {
    var tpl = document.getElementById(id);
    return tpl ? tpl.content.firstElementChild.cloneNode(true) : null;
  }

  /** Find a slot inside a cloned component. */
  function slot(root, name) {
    return root.querySelector('[data-slot="' + name + '"]');
  }

  /** Point an icon <use> at a sprite symbol, falling back to `fallback`. */
  function setIcon(root, icon, fallback) {
    var use = slot(root, "icon");
    if (!use) return;
    var id = icon && document.getElementById("i-" + icon) ? "i-" + icon : "i-" + fallback;
    use.setAttribute("href", "#" + id);
  }

  /** Render `items` into `container` with a component factory. */
  function render(container, items, factory) {
    if (!container || !Array.isArray(items) || !items.length) return;
    var frag = document.createDocumentFragment();
    items.forEach(function (item, index) {
      var node = factory(item, index);
      if (node) {
        node.setAttribute("data-rendered", "");
        frag.appendChild(node);
      }
    });
    container.replaceChildren(frag);
  }

  /** <CategoryCard> */
  function CategoryCard(cat) {
    var el = fromTemplate("tpl-category");
    if (!el) return null;

    var link = slot(el, "link");
    link.textContent = cat.name;
    link.href = cat.href || (CTA + "?category=" + encodeURIComponent(cat.id));

    slot(el, "description").textContent = cat.description || "";

    var examples = slot(el, "examples");
    if (cat.examples && cat.examples.length) {
      examples.textContent = cat.examples.join(", ");
    } else {
      examples.remove();
    }

    setIcon(el, cat.icon, "grid");
    return el;
  }

  /** <GuideCard> */
  function GuideCard(guide) {
    var el = fromTemplate("tpl-guide");
    if (!el) return null;

    var link = slot(el, "link");
    link.textContent = guide.title;
    link.href = guide.href;

    slot(el, "tag").textContent = guide.tag || "Guide";
    slot(el, "excerpt").textContent = guide.excerpt || "";
    slot(el, "cover").classList.add("guide-cover--" + (guide.pattern || "grid"));

    setIcon(el, guide.icon, "grid");
    return el;
  }

  render(document.querySelector('[data-component="categories"]'), data.categories, CategoryCard);
  render(document.querySelector('[data-component="guides"]'), data.guides, GuideCard);
})();