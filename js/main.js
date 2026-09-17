/* ============================================================
   Bangladesh Technology Hub — Main Script
   Handles rendering, navigation, forms, and scroll animations.
   ============================================================ */
(function () {
  "use strict";

  var D = window.SITE_DATA || {};

  /* ---------- Utility ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k.indexOf("data-") === 0 || k === "role" || k === "aria-*") {
          node.setAttribute(k, attrs[k]);
        } else if (k === "href") node.setAttribute("href", attrs[k]);
        else if (k === "type") node.setAttribute("type", attrs[k]);
        else if (k === "id") node.setAttribute("id", attrs[k]);
        else if (k === "placeholder") node.setAttribute("placeholder", attrs[k]);
        else if (k === "rows") node.setAttribute("rows", attrs[k]);
        else if (k === "value") node.value = attrs[k];
        else if (k === "selected") node.setAttribute("selected", "selected");
        else if (k === "required") node.setAttribute("required", "required");
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function byId(id) { return document.getElementById(id); }

  /* ---------- Year ---------- */
  var yearEl = byId("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close on link click (mobile)
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Render: hero stats ---------- */
  function renderHeroStats() {
    var wrap = byId("heroStats");
    if (!wrap || !D.heroStats) return;
    D.heroStats.forEach(function (s) {
      wrap.appendChild(
        el("div", { class: "stat-tile" }, [
          el("div", { class: "stat-icon" }, [s.icon]),
          el("div", {}, [
            el("div", { class: "stat-num" }, [s.num]),
            el("div", { class: "stat-label" }, [s.label]),
          ]),
        ])
      );
    });
  }

  /* ---------- Render: glance stats ---------- */
  function renderGlance() {
    var wrap = byId("glanceGrid");
    if (!wrap || !D.glanceStats) return;
    D.glanceStats.forEach(function (s) {
      wrap.appendChild(
        el("div", { class: "mini-stat reveal" }, [
          el("div", { class: "num" }, [s.num]),
          el("div", { class: "cap" }, [s.cap]),
          el("div", { class: "sub" }, [s.sub]),
        ])
      );
    });
  }

  /* ---------- Render: sectors ---------- */
  function sectorCard(s) {
    return el("article", { class: "card reveal" }, [
      el("div", { class: "card-icon" }, [s.icon]),
      el("h3", {}, [s.title]),
      el("p", {}, [s.desc]),
      el("div", { class: "tag-row" }, s.tags.map(function (t) {
        return el("span", { class: "tag" }, [t]);
      })),
      el("div", { class: "card-meta" }, s.meta.map(function (m) {
        return el("span", {}, [el("b", {}, [m.k + ": "]), m.v]);
      })),
    ]);
  }

  function renderSectors() {
    var wrap = byId("sectorGrid");
    if (!wrap || !D.sectors) return;
    wrap.innerHTML = "";
    D.sectors.forEach(function (s) { wrap.appendChild(sectorCard(s)); });
    initReveal();
  }

  /* ---------- Render: sector flow ---------- */
  function renderFlow() {
    var wrap = byId("sectorFlow");
    if (!wrap || !D.sectorFlow) return;
    wrap.innerHTML = "";
    D.sectorFlow.forEach(function (f) {
      wrap.appendChild(
        el("div", { class: "flow-step reveal" }, [
          el("div", { class: "f-num" }, [String(f.n)]),
          el("h4", {}, [f.title]),
          el("p", {}, [f.desc]),
        ])
      );
    });
  }

  /* ---------- Render: trends ---------- */
  function renderTrends() {
    function build(list, cls) {
      var wrap = byId(list === D.currentTrends ? "currentTrends" : "upcomingTrends");
      if (!wrap) return;
      wrap.innerHTML = "";
      list.forEach(function (t) {
        wrap.appendChild(
          el("li", {}, [
            el("span", { class: "dot " + cls }),
            el("span", {}, [
              el("span", { class: "tl-title" }, [t.title]),
              el("span", { class: "tl-desc" }, [t.desc]),
            ]),
          ])
        );
      });
    }
    if (D.currentTrends) build(D.currentTrends, "cur");
    if (D.upcomingTrends) build(D.upcomingTrends, "up");
  }

  /* ---------- Render: deep dives ---------- */
  function renderDeep() {
    var wrap = byId("deepGrid");
    if (!wrap || !D.deepDives) return;
    wrap.innerHTML = "";
    D.deepDives.forEach(function (d) {
      wrap.appendChild(
        el("article", { class: "deep-card reveal" }, [
          el("div", { class: "deep-head" }, [
            el("div", { class: "d-icon" }, [d.icon]),
            el("h3", {}, [d.title]),
          ]),
          el("div", { class: "deep-body" }, [
            el("p", {}, [d.body]),
            el("a", { class: "read-more", href: "trends.html" }, ["Learn more →"]),
          ]),
        ])
      );
    });
  }

  /* ---------- Render: why now ---------- */
  function renderWhy() {
    var wrap = byId("whyGrid");
    if (!wrap || !D.whyNow) return;
    wrap.innerHTML = "";
    D.whyNow.forEach(function (w) {
      wrap.appendChild(
        el("div", { class: "why-card reveal" }, [
          el("div", { class: "w-num" }, [w.n]),
          el("h3", {}, [w.title]),
          el("p", {}, [w.desc]),
        ])
      );
    });
  }

  /* ---------- Render: startups ---------- */
  function startupCard(s) {
    return el("article", { class: "startup-card reveal" }, [
      el("div", { class: "s-logo", style: "background:" + (s.color || "#0b6e4f") }, [s.logo]),
      el("div", { class: "s-cat" }, [s.cat]),
      el("h3", {}, [s.name]),
      el("p", {}, [s.desc]),
      el("div", { class: "s-meta" }, [
        el("span", {}, ["Stage: "]),
        el("b", {}, [s.meta.stage]),
        el("span", {}, ["Est. " + s.meta.founded]),
      ]),
    ]);
  }

  function renderStartups() {
    var wrap = byId("startupGrid");
    if (!wrap || !D.startups) return;
    wrap.innerHTML = "";
    D.startups.forEach(function (s) { wrap.appendChild(startupCard(s)); });
  }

  function renderSupport() {
    var wrap = byId("supportGrid");
    if (!wrap || !D.support) return;
    wrap.innerHTML = "";
    D.support.forEach(function (s) { wrap.appendChild(startupCard(s)); });
  }

  function renderInvolve() {
    var wrap = byId("involveGrid");
    if (!wrap || !D.involve) return;
    wrap.innerHTML = "";
    D.involve.forEach(function (w) {
      wrap.appendChild(
        el("div", { class: "why-card reveal" }, [
          el("div", { class: "w-num" }, [w.n]),
          el("h3", {}, [w.title]),
          el("p", {}, [w.desc]),
        ])
      );
    });
  }

  /* ---------- Forms ---------- */
  function handleForm(formId, noteId, successMsg) {
    var form = byId(formId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = byId(noteId);
      if (note) {
        note.textContent = successMsg;
        note.style.color = "var(--green)";
      }
      form.reset();
      setTimeout(function () { if (note) note.textContent = ""; }, 5000);
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Init ---------- */
  function init() {
    renderHeroStats();
    renderGlance();
    renderSectors();
    renderFlow();
    renderTrends();
    renderDeep();
    renderWhy();
    renderStartups();
    renderSupport();
    renderInvolve();

    handleForm("ctaForm", "ctaNote", "Thanks for subscribing! (This is a demo form.)");
    handleForm("contactForm", "contactNote", "Message sent — we'll get back to you soon! (Demo form.)");

    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
