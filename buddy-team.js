(function () {
  var form = document.getElementById("pbt-recruit-form");
  if (!form) return;

  var lineBtn = form.querySelector("[data-pbt-line-submit]");

  function buildMessage(data) {
    var lines = [
      "สวัสดีค่ะ สนใจคุยเรื่องอาชีพ Pragun Buddy Team",
      "ชื่อ: " + data.name,
      "เบอร์โทร: " + data.phone,
      "LINE ID: " + data.line,
      "จังหวัด: " + data.province,
      "งานปัจจุบัน: " + data.job,
      "สนใจเริ่ม: " + data.mode,
      "เหตุผลที่สนใจ: " + data.reason,
    ];
    if (data.concern && data.concern !== "—") {
      lines.push("ข้อกังวลหลัก: " + data.concern);
    }
    lines.push("ขอรายละเอียดเส้นทางอาชีพและความเหมาะสมเพิ่มเติมค่ะ");
    return lines.join("\n");
  }

  function getFormData() {
    return {
      name: form.querySelector('[name="name"]').value.trim() || "—",
      phone: form.querySelector('[name="phone"]').value.trim() || "—",
      line: form.querySelector('[name="line"]').value.trim() || "—",
      province: form.querySelector('[name="province"]').value.trim() || "—",
      job: form.querySelector('[name="job"]').value.trim() || "—",
      mode: form.querySelector('[name="mode"]').value || "—",
      reason: form.querySelector('[name="reason"]').value.trim() || "—",
      concern: form.querySelector('[name="concern"]').value.trim() || "—",
    };
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = getFormData();
    var message = buildMessage(data);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message).catch(function () {});
    }

    window.open("https://lin.ee/KABBEjH", "_blank", "noopener,noreferrer");
  });

  if (lineBtn) {
    lineBtn.addEventListener("click", function () {
      var data = getFormData();
      var message = buildMessage(data);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).catch(function () {});
      }
    });
  }

  var stickyBar = document.getElementById("pbt-sticky-bar");
  var finalSection = document.getElementById("recruit-contact");
  if (!stickyBar || !finalSection) {
    return;
  }

  var mobileQuery = window.matchMedia("(max-width: 960px)");

  function syncStickyBar(finalVisible) {
    if (!mobileQuery.matches) {
      document.body.classList.remove("pbt-has-sticky");
      stickyBar.classList.add("pbt-sticky-bar--hidden");
      return;
    }

    stickyBar.classList.toggle("pbt-sticky-bar--hidden", finalVisible);
    document.body.classList.toggle("pbt-has-sticky", !finalVisible);
  }

  if ("IntersectionObserver" in window) {
    var stickyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          syncStickyBar(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );

    stickyObserver.observe(finalSection);

    mobileQuery.addEventListener("change", function () {
      var rect = finalSection.getBoundingClientRect();
      var inView =
        rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
      syncStickyBar(inView);
    });

    var initialRect = finalSection.getBoundingClientRect();
    syncStickyBar(
      initialRect.top < window.innerHeight * 0.9 &&
        initialRect.bottom > window.innerHeight * 0.1
    );
  } else {
    document.body.classList.add("pbt-has-sticky");
  }
})();
