(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!nav) {
    return;
  }

  var planDropdowns = [];

  function closePlanDropdowns() {
    planDropdowns.forEach(function (item) {
      item.classList.remove("is-open");
      var btn = item.querySelector(".nav-dropdown-toggle");
      if (btn) {
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setOpen(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
    }
    if (!open) {
      closePlanDropdowns();
    }
  }

  function enhancePlansMenu() {
    var plansLink = null;
    nav.querySelectorAll("a").forEach(function (link) {
      if (link.textContent.trim() === "แบบประกัน") {
        plansLink = link;
      }
    });
    if (!plansLink) {
      return;
    }

    var plansHref = plansLink.getAttribute("href") || "plans/plans.html";
    var plansBase = plansHref.endsWith("plans.html")
      ? plansHref.slice(0, -"plans.html".length)
      : plansHref;
    var categories = [
      { label: "ดูทั้งหมด", href: plansHref, kicker: "All Plans" },
      {
        label: "ประกันชีวิต",
        href: plansBase + "life/plans-life.html",
        kicker: "Life",
      },
      {
        label: "ประกันออมทรัพย์",
        href: plansBase + "savings/plans-savings.html",
        kicker: "Savings",
      },
      {
        label: "ประกันสุขภาพ",
        href: plansBase + "health/plans-health.html",
        kicker: "Health",
      },
      {
        label: "ประกันโรคร้ายแรง",
        href: plansBase + "critical-illness/plans-critical-illness.html",
        kicker: "Critical Illness",
      },
      {
        label: "ประกันบำนาญ",
        href: plansBase + "retirement/plans-retirement.html",
        kicker: "Retirement",
      },
      {
        label: "แบบประกันอื่นๆ",
        href: plansBase + "other/plans-other.html",
        kicker: "More",
      },
    ];

    var item = document.createElement("div");
    item.className = "nav-item nav-item--dropdown";

    var head = document.createElement("div");
    head.className = "nav-dropdown-head";

    var mainLink = document.createElement("a");
    mainLink.className = "nav-dropdown-link";
    mainLink.href = plansHref;
    mainLink.textContent = "แบบประกัน";

    var dropdownToggle = document.createElement("button");
    dropdownToggle.type = "button";
    dropdownToggle.className = "nav-dropdown-toggle";
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownToggle.setAttribute("aria-label", "เปิดเมนูย่อยแบบประกัน");
    dropdownToggle.innerHTML =
      '<span class="nav-dropdown-caret" aria-hidden="true"></span>';

    var menuId = "plans-submenu";
    dropdownToggle.setAttribute("aria-controls", menuId);

    var menu = document.createElement("div");
    menu.className = "nav-dropdown";
    menu.id = menuId;
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", "หมวดแบบประกัน");

    categories.forEach(function (cat) {
      var link = document.createElement("a");
      link.href = cat.href;
      link.setAttribute("role", "menuitem");
      link.innerHTML =
        '<span class="nav-dropdown-kicker">' +
        cat.kicker +
        '</span><span class="nav-dropdown-label">' +
        cat.label +
        "</span>";
      menu.appendChild(link);
    });

    head.appendChild(mainLink);
    head.appendChild(dropdownToggle);
    item.appendChild(head);
    item.appendChild(menu);
    plansLink.replaceWith(item);
    planDropdowns.push(item);

    dropdownToggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var open = !item.classList.contains("is-open");
      closePlanDropdowns();
      if (open) {
        item.classList.add("is-open");
        dropdownToggle.setAttribute("aria-expanded", "true");
      }
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closePlanDropdowns();
        setOpen(false);
      });
    });

    mainLink.addEventListener("click", function () {
      setOpen(false);
    });
  }

  enhancePlansMenu();

  if (toggle) {
    toggle.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("nav-open"));
    });
  }

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setOpen(false);
      closePlanDropdowns();
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".nav-item--dropdown") &&
      window.innerWidth > 920
    ) {
      closePlanDropdowns();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 920) {
      setOpen(false);
      closePlanDropdowns();
    }
  });
})();
