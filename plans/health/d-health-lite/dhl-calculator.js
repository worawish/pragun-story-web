(function () {
  var ratesData = window.DHL_PREMIUM_RATES;
  if (!ratesData) return;

  var panel = document.querySelector("#premium-calculator .dhl-calculator-panel");
  if (!panel) return;

  var genderSelect = panel.querySelector('[data-dhl-field="gender"]');
  var ageInput = panel.querySelector('[data-dhl-field="age"]');
  var planSelect = panel.querySelector('[data-dhl-field="plan"]');
  var resultMeta = panel.querySelector("[data-dhl-result-meta]");
  var resultAmount = panel.querySelector("[data-dhl-result-amount]");
  var resultUnit = panel.querySelector("[data-dhl-result-unit]");
  var resultNote = panel.querySelector("[data-dhl-result-note]");
  var lineCta = panel.querySelector("[data-dhl-line-cta]");

  var planLabels = {
    "5m-4k": "แผน 5 ล้านบาท · ค่าห้อง 4,000 บาท/วัน",
    "5m-6k": "แผน 5 ล้านบาท · ค่าห้อง 6,000 บาท/วัน",
    "5m-8k": "แผน 5 ล้านบาท · ค่าห้อง 8,000 บาท/วัน",
    "1m-2k": "แผน 1 ล้านบาท · ค่าห้อง 2,000 บาท/วัน",
  };

  function parseAge() {
    var age = parseInt(ageInput.value, 10);
    return Number.isFinite(age) ? age : NaN;
  }

  function getGenderRates(gender) {
    var rates = ratesData.rates;
    if (rates[gender]) return rates[gender];
    if (rates["11"]) return rates;
    return rates["หญิง"] || rates;
  }

  function lookupPremium(gender, age, plan) {
    var table = getGenderRates(gender);
    var row = table[String(age)];
    if (!row) return null;

    switch (plan) {
      case "1m-2k":
        return row[0];
      case "5m-4k":
        return row[1];
      case "5m-6k":
        return row[2];
      case "5m-8k":
        return row[3];
      default:
        return null;
    }
  }

  function formatBaht(amount) {
    return amount.toLocaleString("th-TH");
  }

  function update() {
    var gender = genderSelect.value;
    var age = parseAge();
    var plan = planSelect.value;
    var inRange =
      Number.isFinite(age) &&
      age >= ratesData.minAge &&
      age <= ratesData.maxAge;

    if (!inRange) {
      resultMeta.textContent =
        gender + " · อายุ " + (Number.isFinite(age) ? age : "—") + " ปี";
      resultAmount.textContent = "—";
      resultUnit.textContent = "บาท/ปี";
      resultNote.textContent =
        "ตารางเบี้ยครอบคลุมอายุ " +
        ratesData.minAge +
        "–" +
        ratesData.maxAge +
        " ปี กรุณาปรับอายุหรือทัก LINE ให้ผู้เชี่ยวชาญช่วยเช็กเบี้ยจริง";
      lineCta.href = "https://lin.ee/KABBEjH";
      return;
    }

    var premium = lookupPremium(gender, age, plan);
    if (premium === null) {
      resultAmount.textContent = "—";
      resultNote.textContent = "ไม่พบเบี้ยในระบบ กรุณาติดต่อผู้เชี่ยวชาญ";
      return;
    }

    resultMeta.textContent =
      gender + " · อายุ " + age + " ปี · " + planLabels[plan];
    resultAmount.textContent = formatBaht(premium);
    resultUnit.textContent = "บาท/ปี (D Health Lite)";
    resultNote.textContent =
      "ตัวเลขจากตารางเบี้ยเบื้องต้น ยังไม่รวม Care Plus ประกันชีวิตหลัก และขึ้นอยู่กับเงื่อนไขการพิจารณาของบริษัท";
    lineCta.href = "https://lin.ee/KABBEjH";
  }

  function updatePremiumExamples() {
    var row = getGenderRates("หญิง")["35"];
    if (!row) return;

    var examples = {
      "4k": row[1],
      "6k": row[2],
      "8k": row[3],
    };

    document.querySelectorAll("[data-dhl-example-price]").forEach(function (el) {
      var key = el.getAttribute("data-dhl-example-price");
      if (examples[key] != null) {
        el.textContent = formatBaht(examples[key]);
      }
    });
  }

  genderSelect.addEventListener("change", update);
  planSelect.addEventListener("change", update);
  ageInput.addEventListener("input", update);
  ageInput.addEventListener("change", update);

  update();
  updatePremiumExamples();
})();
