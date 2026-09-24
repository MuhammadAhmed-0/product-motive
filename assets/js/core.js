/* ==========================================================================
   ProductMotive: shared chrome behaviour — used on every page.
   1. Nav dropdown  (Categories → their pages, data-driven)
   2. Header        (scroll state, mobile menu)
   3. Misc          (footer year)
   No dependencies. Loaded with `defer`. ~3KB — the only script on static pages.
   ========================================================================== */
(function () {
  "use strict";

  var data = window.PM_DATA;
  var CTA = (data && data.ctaHref) || "best-web-hosting.html";

  /* 1. Nav dropdown -------------------------------------------------------- */

  /* Categories shown under "Categories" in the header.
     Prefer PM_DATA.categories (single source of truth when data.js is loaded,
     e.g. index, categories, guides, the match and the landing page).
     Otherwise fall back to this small list so static pages don't need data.js.
     >>> Keep this list in sync with the categories in assets/js/data.js.
     >>> Once a category gets its own landing page, give it `href` in data.js
         and add the page link here too. */
  var FALLBACK_CATEGORIES = [
    { name: "Web Hosting", href: "best-web-hosting.html" },
    { name: "Technology", href: "best-web-hosting.html" },
    { name: "Home & Office", href: "best-web-hosting.html" },
    { name: "Software", href: "best-web-hosting.html" },
    { name: "Business", href: "best-web-hosting.html" },
    { name: "Travel", href: "best-web-hosting.html" },
    { name: "Lifestyle", href: "best-web-hosting.html" }
  ];

  function navCategories(prefix) {
    if (data && Array.isArray(data.categories) && data.categories.length) {
      return data.categories.map(function (c) {
        return {
          name: c.name,
          href: prefix + (c.href || (CTA + "?category=" + encodeURIComponent(c.id)))
        };
      });
    }
    return FALLBACK_CATEGORIES.map(function (c) {
      return { name: c.name, href: prefix + c.href };
    });
  }

  function renderDropItems(drop, menu) {
    /* Pages in subfolders pass the relative prefix via data attributes
       (e.g. guides pages use data-nav-prefix="../"). */
    var prefix = drop.getAttribute("data-nav-prefix") || "";
    var allHref = drop.getAttribute("data-nav-all") || "categories.html";

    var list = document.createDocumentFragment();
    navCategories(prefix).forEach(function (c) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = c.href;
      a.textContent = c.name;
      li.appendChild(a);
      list.appendChild(li);
    });
    var all = document.createElement("li");
    var aAll = document.createElement("a");
    aAll.className = "nav-drop-all";
    aAll.href = allHref;
    aAll.textContent = "All categories";
    all.appendChild(aAll);
    list.appendChild(all);
    menu.replaceChildren(list);
  }

  function initDrop(drop) {
    var toggle = drop.querySelector("[data-nav-drop-toggle]");
    var menu = drop.querySelector("[data-nav-drop-menu]");
    if (!toggle || !menu) return;

    renderDropItems(drop, menu);

    var setOpen = function (open) {
      drop.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a destination (mobile mostly; desktop navigates).
    menu.addEventListener("click", function () { setOpen(false); });

    // Close on outside click and with Escape, returning focus to the toggle.
    document.addEventListener("click", function (e) {
      if (drop.classList.contains("is-open") && !drop.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-nav-drop]").forEach(initDrop);

  /* 2. Header -------------------------------------------------------------- */

  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.setAttribute("data-scrolled", window.scrollY > 4 ? "true" : "false");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var nav = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");
  if (nav && toggle) {
    var desktop = window.matchMedia("(min-width: 860px)");

    var setNavOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", function () {
      setNavOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link (the dropdown toggle calls preventDefault,
    // so it never reaches here and the submenu stays open)
    nav.addEventListener("click", function (e) {
      if (e.defaultPrevented) return;
      if (e.target.closest("a")) setNavOpen(false);
    });

    // Reset when resizing up to desktop
    var onBreakpoint = function (e) { if (e.matches) setNavOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);
  }

  /* 3. Misc ---------------------------------------------------------------- */

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();