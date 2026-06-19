(function () {
  var ratesData = window.EHP_PREMIUM_RATES;
  if (!ratesData) return;

  var panel = document.querySelector("#premium-calculator .ehp-calculator-panel");
  if (!panel) return;

  var genderSelect = panel.querySelector('[data-ehp-field="gender"]');
  var ageInput = panel.querySelector('[data-ehp-field="age"]');
  var planSelect = panel.querySelector('[data-ehp-field="plan"]');
  var areaSelect = panel.querySelector('[data-ehp-field="area"]');
  var maternityCheck = panel.querySelector('[data-ehp-field="maternity"]');
  var wellbeingCheck = panel.querySelector('[data-ehp-field="wellbeing"]');
  var maternityBlock = panel.querySelector('[data-ehp-addon="maternity"]');
  var maternityPlans = panel.querySelector("[data-ehp-maternity-plans]");
  var maternityPlanInputs = panel.querySelectorAll(
    '[data-ehp-field="maternity-plan"]'
  );
  var maternityHint = panel.querySelector("[data-ehp-maternity-hint]");
  var wellbeingBlock = panel.querySelector('[data-ehp-addon="wellbeing"]');
  var wellbeingPlans = panel.querySelector("[data-ehp-wellbeing-plans]");
  var wellbeingPlanInputs = panel.querySelectorAll(
    '[data-ehp-field="wellbeing-plan"]'
  );
  var resultMeta = panel.querySelector("[data-ehp-result-meta]");
  var resultAmount = panel.querySelector("[data-ehp-result-amount]");
  var resultUnit = panel.querySelector("[data-ehp-result-unit]");
  var resultNote = panel.querySelector("[data-ehp-result-note]");
  var lineCta = panel.querySelector("[data-ehp-line-cta]");

  var MATERNITY_MIN_AGE =
    ratesData.maternityMinAge != null ? ratesData.maternityMinAge : 15;
  var MATERNITY_MAX_AGE =
    ratesData.maternityMaxAge != null ? ratesData.maternityMaxAge : 49;

  var planLabels = {
    "20m": "แผน 20 ล้านบาท/ปี",
    "40m": "แผน 40 ล้านบาท/ปี",
    "75m": "แผน 75 ล้านบาท/ปี",
    "100m": "แผน 100 ล้านบาท/ปี",
  };

  var areaLabels = {
    th: "ประเทศไทย",
    asia: "ทวีปเอเชีย 46 ประเทศ",
    world: "ทั่วโลกยกเว้น USA",
    "world-usa": "ทั่วโลกรวม USA",
  };

  var maternityPlanLabels = {
    "2m": "Maternity Plus วงเงิน 2 ล้าน/ปี",
    "4m": "Maternity Plus วงเงิน 4 ล้าน/ปี",
  };

  var wellbeingPlanLabels = {
    wb1: "Well-Being Plus แผน 1",
    wb2: "Well-Being Plus แผน 2",
  };

  function parseAge() {
    var age = parseInt(ageInput.value, 10);
    return Number.isFinite(age) ? age : NaN;
  }

  function formatBaht(amount) {
    return amount.toLocaleString("th-TH");
  }

  function lookupBasePremium(age, plan, area) {
    if (!ratesData.hasRates || !ratesData.rates) return null;

    var ageRow = ratesData.rates[String(age)];
    if (!ageRow) return null;

    var planRow = ageRow[plan];
    if (!planRow) return null;

    var premium = planRow[area];
    return premium != null ? premium : null;
  }

  function lookupMaternityPremium(age, maternityPlan) {
    if (!ratesData.maternity) return null;
    var row = ratesData.maternity[String(age)];
    if (!row) return null;
    return row[maternityPlan] != null ? row[maternityPlan] : null;
  }

  function lookupWellbeingPremium(age, wellbeingPlan) {
    if (!ratesData.wellbeing) return null;
    var row = ratesData.wellbeing[String(age)];
    if (!row) return null;
    return row[wellbeingPlan] != null ? row[wellbeingPlan] : null;
  }

  function isMaternityEligible(gender, age) {
    return (
      gender === "หญิง" &&
      Number.isFinite(age) &&
      age >= MATERNITY_MIN_AGE &&
      age <= MATERNITY_MAX_AGE
    );
  }

  function getSelectedMaternityPlan() {
    var selected = panel.querySelector(
      '[data-ehp-field="maternity-plan"]:checked'
    );
    return selected ? selected.value : "2m";
  }

  function getSelectedWellbeingPlan() {
    var selected = panel.querySelector(
      '[data-ehp-field="wellbeing-plan"]:checked'
    );
    return selected ? selected.value : "wb1";
  }

  function syncMaternityOption(gender, age) {
    var eligible = isMaternityEligible(gender, age);
    var ageOk =
      Number.isFinite(age) &&
      age >= MATERNITY_MIN_AGE &&
      age <= MATERNITY_MAX_AGE;
    var showPlans = eligible && maternityCheck.checked;

    maternityCheck.disabled = !eligible;
    maternityBlock.classList.toggle("ehp-addon-block--disabled", !eligible);
    maternityPlans.hidden = !showPlans;
    maternityPlans.disabled = !showPlans;

    maternityPlanInputs.forEach(function (input) {
      input.disabled = !showPlans;
    });

    if (!eligible) {
      maternityCheck.checked = false;
      if (gender !== "หญิง") {
        maternityHint.textContent =
          "คลอดบุตร · รับเฉพาะเพศหญิง อายุ " +
          MATERNITY_MIN_AGE +
          "–" +
          MATERNITY_MAX_AGE +
          " ปี";
      } else if (!ageOk) {
        maternityHint.textContent =
          "คลอดบุตร · รับเฉพาะเพศหญิง อายุ " +
          MATERNITY_MIN_AGE +
          "–" +
          MATERNITY_MAX_AGE +
          " ปี (อายุปัจจุบันไม่เข้าเงื่อนไข)";
      }
    } else {
      maternityHint.textContent =
        "คลอดบุตร · เลือกวงเงิน 2 หรือ 4 ล้าน/ปี · รับเฉพาะเพศหญิง อายุ " +
        MATERNITY_MIN_AGE +
        "–" +
        MATERNITY_MAX_AGE +
        " ปี";
    }
  }

  function syncWellbeingOption() {
    var showPlans = wellbeingCheck.checked;
    wellbeingPlans.hidden = !showPlans;
    wellbeingPlans.disabled = !showPlans;
    wellbeingPlanInputs.forEach(function (input) {
      input.disabled = !showPlans;
    });
  }

  function getAddonSummary() {
    var parts = [];
    if (wellbeingCheck.checked) {
      parts.push(
        wellbeingPlanLabels[getSelectedWellbeingPlan()] || "Well-Being Plus"
      );
    }
    if (maternityCheck.checked && !maternityCheck.disabled) {
      var maternityPlan = getSelectedMaternityPlan();
      parts.push(
        maternityPlanLabels[maternityPlan] || "Maternity Plus"
      );
    }
    return parts;
  }

  function buildLineMessage(gender, age, plan, area, addons, totalPremium) {
    var lines = [
      "สวัสดีค่ะ ขอเช็กเบี้ย Elite Health Plus",
      "เพศ: " + gender,
      "อายุ: " + age + " ปี",
      planLabels[plan],
      "พื้นที่: " + areaLabels[area],
    ];

    if (addons.length) {
      lines.push("สัญญาเพิ่มเติม: " + addons.join(", "));
    } else {
      lines.push("สัญญาเพิ่มเติม: ไม่เลือก");
    }

    if (totalPremium != null) {
      lines.push("เบี้ยประมาณการ: " + formatBaht(totalPremium) + " บาท/ปี");
    }

    lines.push("ขอเบี้ยประมาณการและรายละเอียดเพิ่มเติมค่ะ");
    return lines.join("\n");
  }

  function calculatePremium(gender, age, plan, area) {
    var base = lookupBasePremium(age, plan, area);
    if (base == null) return null;

    var total = base;

    if (wellbeingCheck.checked) {
      var wellbeing = lookupWellbeingPremium(age, getSelectedWellbeingPlan());
      if (wellbeing == null) return null;
      total += wellbeing;
    }

    if (maternityCheck.checked && !maternityCheck.disabled) {
      var maternity = lookupMaternityPremium(age, getSelectedMaternityPlan());
      if (maternity == null) return null;
      total += maternity;
    }

    return total;
  }

  function update() {
    var gender = genderSelect.value;
    var age = parseAge();
    var plan = planSelect.value;
    var area = areaSelect.value;
    var inRange =
      Number.isFinite(age) &&
      age >= ratesData.minAge &&
      age <= ratesData.maxAge;

    syncMaternityOption(gender, age);
    syncWellbeingOption();

    var addons = getAddonSummary();
    var summary =
      gender +
      " · อายุ " +
      (Number.isFinite(age) ? age : "—") +
      " ปี · " +
      planLabels[plan] +
      " · " +
      areaLabels[area];

    if (addons.length) {
      summary += " · +" + addons.join(", ");
    }

    resultMeta.textContent = summary;

    if (!inRange) {
      resultAmount.textContent = "—";
      resultUnit.textContent = "บาท/ปี";
      resultNote.textContent =
        "อายุรับประกัน " +
        ratesData.minAge +
        "–" +
        ratesData.maxAge +
        " ปี กรุณาปรับอายุหรือทัก LINE ให้ผู้เชี่ยวชาญช่วยเช็กเบี้ยจริง";
      lineCta.href = "https://lin.ee/KABBEjH";
      lineCta.setAttribute(
        "data-ehp-summary",
        buildLineMessage(gender, age, plan, area, addons, null)
      );
      return;
    }

    var premium = ratesData.hasRates
      ? calculatePremium(gender, age, plan, area)
      : null;
    var addonNote =
      addons.length > 0
        ? " รวมสัญญาเพิ่มเติมที่เลือก: " + addons.join(", ") + "."
        : "";

    if (premium != null) {
      resultAmount.textContent = formatBaht(premium);
      resultUnit.textContent = "บาท/ปี (Elite Health Plus)";
      resultNote.textContent =
        "ตัวเลขจากตารางเบี้ยเบื้องต้น รวมแผนหลักและสัญญาเพิ่มเติมที่เลือก ยังไม่รวมประกันชีวิตหลัก สัญญาเพิ่มเติมอื่น และขึ้นอยู่กับการพิจารณาของบริษัท" +
        addonNote;
    } else {
      resultAmount.textContent = "ขอเช็กเบี้ย";
      resultUnit.textContent = "ส่งข้อมูลให้ผู้เชี่ยวชาญช่วยคำนวณ";
      resultNote.textContent =
        "ไม่พบเบี้ยในระบบสำหรับเงื่อนไขนี้ — กดปุ่มด้านล่างเพื่อส่งข้อมูลให้ผู้เชี่ยวชาญช่วยเช็กจากตารางบริษัทได้ฟรี" +
        addonNote;
    }

    lineCta.href = "https://lin.ee/KABBEjH";
    lineCta.setAttribute(
      "data-ehp-summary",
      buildLineMessage(gender, age, plan, area, addons, premium)
    );
  }

  genderSelect.addEventListener("change", update);
  planSelect.addEventListener("change", update);
  areaSelect.addEventListener("change", update);
  maternityCheck.addEventListener("change", update);
  wellbeingCheck.addEventListener("change", update);
  maternityPlanInputs.forEach(function (input) {
    input.addEventListener("change", update);
  });
  wellbeingPlanInputs.forEach(function (input) {
    input.addEventListener("change", update);
  });
  ageInput.addEventListener("input", update);
  ageInput.addEventListener("change", update);

  lineCta.addEventListener("click", function () {
    var summary = lineCta.getAttribute("data-ehp-summary");
    if (summary && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(summary).catch(function () {});
    }
  });

  update();
})();
