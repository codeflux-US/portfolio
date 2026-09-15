(function () {
  "use strict";

  var RESUME_PATH = "Resume.pdf";
  var RESUME_FILENAME = "Resume.pdf";

  var EMAILJS_PUBLIC_KEY = "Hn4EKn8s-DfzTy_8G";
  var EMAILJS_SERVICE_ID = "service_jp16spf";
  var EMAILJS_TEMPLATE_ID = "template_akwy12j";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function initEmailJS() {
    if (window.emailjs && EMAILJS_PUBLIC_KEY !== "Hn4EKn8s-DfzTy_8G") {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }

  function initTheme() {
    var root = document.documentElement;
    var toggle = $("#themeToggle");
    var stored = null;

    try { stored = window.localStorage.getItem("portfolio-theme"); } catch (e) { /* storage blocked */ }

    if (!stored && window.matchMedia("(prefers-color-scheme: light)").matches) {
      stored = "light";
    }
    if (stored) { root.setAttribute("data-theme", stored); }

    function sync() {
      var isLight = root.getAttribute("data-theme") === "light";
      toggle.setAttribute("aria-pressed", String(isLight));
      toggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }
    sync();

    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { window.localStorage.setItem("portfolio-theme", next); } catch (e) { /* ignore */ }
      sync();
    });
  }

  function initNav() {
    var toggle = $("#navToggle");
    var list = $("#navList");

    function close() {
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }

    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    $$(".nav__link", list).forEach(function (link) {
      link.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 780) { close(); }
    });
  }

  function initScrollSpy() {
    var header = $("#siteHeader");
    var links = $$(".nav__link");
    var sections = links
      .map(function (link) { return document.querySelector(link.getAttribute("href")); })
      .filter(Boolean);

    function onScroll() {
      header.classList.toggle("is-stuck", window.scrollY > 8);

      var offset = window.scrollY + (window.innerHeight * 0.3);
      var currentId = sections.length ? sections[0].id : "";

      sections.forEach(function (section) {
        if (section.offsetTop <= offset) { currentId = section.id; }
      });

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        currentId = sections[sections.length - 1].id;
      }

      links.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + currentId);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    var items = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  function initFilters() {
    var buttons = $$(".filter");
    var projects = $$(".project");
    var empty = $("#projectsEmpty");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.dataset.filter;
        var shown = 0;

        buttons.forEach(function (b) {
          var active = b === button;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });

        projects.forEach(function (project) {
          var match = filter === "all" || project.dataset.category === filter;
          project.classList.toggle("is-hidden", !match);
          if (match) { shown++; }
        });

        empty.hidden = shown > 0;
      });
    });
  }

  function initResume() {
    $("#viewResume").addEventListener("click", function () {
      window.open(RESUME_PATH, "_blank", "noopener");
    });

    $("#downloadResume").addEventListener("click", function () {
      var link = document.createElement("a");
      link.href = RESUME_PATH;
      link.download = RESUME_FILENAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  function initForm() {
    var form = $("#contactForm");
    var status = $("#formStatus");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var rules = [
      { id: "name", message: "Enter your name." },
      { id: "email", message: "Enter a valid email address.", test: function (v) { return emailPattern.test(v); } },
      { id: "subject", message: "Add a subject so I know what this is about." },
      { id: "message", message: "Write a message of at least 10 characters.", test: function (v) { return v.length >= 10; } }
    ];

    function validateField(rule) {
      var input = document.getElementById(rule.id);
      var error = document.getElementById(rule.id + "Error");
      var value = input.value.trim();
      var valid = value !== "" && (rule.test ? rule.test(value) : true);

      error.textContent = valid ? "" : rule.message;
      input.classList.toggle("is-invalid", !valid);
      input.setAttribute("aria-invalid", String(!valid));
      return valid;
    }

    rules.forEach(function (rule) {
      var input = document.getElementById(rule.id);
      input.addEventListener("blur", function () { validateField(rule); });
      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) { validateField(rule); }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      status.classList.remove("form__status--error");

      var firstInvalid = null;
      rules.forEach(function (rule) {
        if (!validateField(rule) && !firstInvalid) {
          firstInvalid = document.getElementById(rule.id);
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      if (!window.emailjs || EMAILJS_PUBLIC_KEY === "Hn4EKn8s-DfzTy_8G") {
        status.textContent = "Email isn't configured yet — add your EmailJS keys in script.js (see README).";
        status.classList.add("form__status--error");
        return;
      }

      var submitBtn = form.querySelector("button[type=submit]");
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim()
      }).then(function () {
        status.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
        form.reset();
      }).catch(function (err) {
        status.textContent = "Something went wrong sending that. Please try again or email me directly.";
        status.classList.add("form__status--error");
        console.error("EmailJS error:", err);
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
    });
  }

  function initToTop() {
    var button = $("#toTop");

    window.addEventListener("scroll", function () {
      button.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });

    button.addEventListener("click", function () {
      var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  function initYear() {
    $("#year").textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initEmailJS();
    initTheme();
    initNav();
    initScrollSpy();
    initReveal();
    initFilters();
    initResume();
    initForm();
    initToTop();
    initYear();
  });
})();
