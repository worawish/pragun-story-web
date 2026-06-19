(function () {
  var QUESTIONS = [
    "คุณอยากมีอาชีพที่รายได้เติบโตตามความสามารถของตัวเองไหม?",
    "คุณพร้อมเรียนรู้ทักษะใหม่อย่างต่อเนื่องไหม?",
    "คุณชอบอธิบายเรื่องยากให้คนอื่นเข้าใจง่ายไหม?",
    "คุณอยากทำงานที่มีความหมาย ไม่ใช่แค่ทำยอดขายไหม?",
    "คุณรู้สึกไม่สบายใจกับการขายแบบกดดันหรือขอช่วยซื้อไหม?",
    "คุณสนใจเรื่องสุขภาพ การเงิน หรือการวางแผนชีวิตไหม?",
    "คุณอยากสร้างตัวตนหรือทำตลาดออนไลน์มากขึ้นไหม?",
    "คุณอยากมีทีมและ Mentor ช่วยพาเริ่มต้นไหม?",
    "คุณพร้อมดูแลลูกค้าระยะยาว ไม่ใช่แค่ขายจบแล้วจบไหม?",
    "คุณพร้อมเริ่มจากการฝึกฝน แม้ยังไม่เก่งตั้งแต่วันแรกไหม?",
  ];

  var ANSWERS = [
    { label: "ไม่ค่อยใช่", score: 1 },
    { label: "ยังไม่แน่ใจ", score: 2 },
    { label: "ค่อนข้างใช่", score: 3 },
    { label: "ใช่มาก", score: 4 },
  ];

  var LEVELS = [
    {
      min: 32,
      max: 40,
      title: "คุณมีแนวโน้มเหมาะกับเส้นทางที่ปรึกษามาก",
      copy:
        "จากคำตอบของคุณ คุณมีหลายคุณสมบัติที่สอดคล้องกับอาชีพที่ปรึกษาประกันชีวิตและการเงิน ทั้งความตั้งใจเรียนรู้ ความอยากเติบโต ความสนใจเรื่องสุขภาพและการเงิน รวมถึงมุมมองที่อยากช่วยลูกค้าตัดสินใจจากความเข้าใจ<br><br>สิ่งที่น่าสนใจคือ คุณไม่ได้มองงานนี้แค่เรื่องรายได้ แต่มองเห็นคุณค่าของการช่วยคนวางแผนชีวิตด้วย",
      next: "เริ่มคุยกับอุ๋งอิ๋งเพื่อดูเส้นทางเริ่มต้น ระบบทีม การเตรียมตัว และรูปแบบการทำงานที่เหมาะกับคุณ",
      cta: { href: "#recruit-contact", label: "คุยเรื่องอาชีพนี้ก่อน", primary: true },
      micro: "ยังไม่ต้องสมัครวันนี้ แค่คุยให้เข้าใจเส้นทางก่อนก็ได้ค่ะ",
    },
    {
      min: 24,
      max: 31,
      title: "คุณมีความสนใจ และอาจเหมาะถ้าได้ระบบช่วยเริ่มต้น",
      copy:
        "คุณอาจยังมีบางเรื่องที่ไม่แน่ใจ เช่น วิธีเริ่มต้น รายได้มาจากอะไร ต้องขายแบบไหน หรือจะทำตลาดออนไลน์อย่างไร<br><br>แต่คำตอบของคุณสะท้อนว่า คุณมีความสนใจในอาชีพนี้ และอาจไปต่อได้ดี ถ้ามี Mentor ระบบการเรียนรู้ และทีมช่วยพาเดินอย่างเป็นขั้นตอน",
      next: "เริ่มจากการคุยเพื่อทำความเข้าใจอาชีพ ถามข้อกังวล และดูว่า Pragun Buddy Team มีระบบสนับสนุนที่ตอบโจทย์คุณไหม",
      cta: { href: "#recruit-contact", label: "เช็กว่าเหมาะกับคุณไหม", primary: false },
      micro: "ไม่จำเป็นต้องตัดสินใจทันที เริ่มจากถามสิ่งที่ยังไม่แน่ใจก่อนได้ค่ะ",
    },
    {
      min: 16,
      max: 23,
      title: "คุณอาจสนใจอาชีพนี้ แต่ยังควรทำความเข้าใจให้ชัดก่อน",
      copy:
        "จากคำตอบของคุณ อาจมีบางส่วนที่ยังไม่ตรงกับลักษณะงานนี้ เช่น ความพร้อมในการเรียนรู้ การดูแลลูกค้าระยะยาว หรือความเข้าใจเรื่องรายได้และการทำงานแบบที่ปรึกษา<br><br>นี่ไม่ได้แปลว่าคุณไม่เหมาะ แต่อาจแปลว่าคุณควรเริ่มจากการเข้าใจอาชีพนี้ให้มากขึ้นก่อน",
      next: "ลองคุยกับอุ๋งอิ๋งเพื่อฟังภาพจริงของอาชีพ ทั้งข้อดี ข้อท้าทาย ระบบทีม และสิ่งที่ต้องเตรียม",
      cta: { href: "#recruit-contact", label: "คุยให้เข้าใจอาชีพนี้ก่อน", primary: false },
      micro: "การรู้ว่า “ยังไม่พร้อมตรงไหน” ก็เป็นจุดเริ่มต้นที่ดีค่ะ",
    },
    {
      min: 10,
      max: 15,
      title: "อาชีพนี้อาจยังไม่ใช่จังหวะที่เหมาะสำหรับคุณตอนนี้",
      copy:
        "คำตอบของคุณสะท้อนว่า คุณอาจยังไม่ได้สนใจงานที่ต้องใช้การเรียนรู้ต่อเนื่อง การสื่อสาร การดูแลลูกค้าระยะยาว หรือการสร้างผลลัพธ์จากความสม่ำเสมอ<br><br>อาชีพที่ปรึกษาประกันชีวิตและการเงินมีโอกาสเติบโตได้จริง แต่ไม่ใช่งานที่ให้ผลลัพธ์เร็วโดยไม่ต้องฝึกฝน",
      next: "คุณอาจเก็บข้อมูลไว้ก่อน หรือคุยเบื้องต้นเพื่อเข้าใจอาชีพนี้ในมุมจริง โดยยังไม่ต้องตัดสินใจสมัคร",
      cta: { href: "#recruit-contact", label: "ขอข้อมูลเส้นทางอาชีพไว้ก่อน", primary: false },
      micro: "การเลือกยังไม่เริ่มตอนนี้ ก็เป็นการตัดสินใจที่ดีได้ ถ้าคุณเข้าใจตัวเองมากขึ้น",
    },
  ];

  var PERSONAS = {
    growth: {
      keys: [0, 1, 9],
      title: "The Growth Seeker",
      subtitle: "คุณคือคนที่มองหาโอกาสเติบโต",
      copy: "คุณให้ความสำคัญกับรายได้ ความก้าวหน้า และการพัฒนาตัวเอง คุณอาจเหมาะกับอาชีพนี้ ถ้าพร้อมสร้างระบบการทำงานอย่างจริงจัง และมีความสม่ำเสมอในการพัฒนาทักษะ",
      strengths: [
        "อยากเติบโตจากความสามารถของตัวเอง",
        "พร้อมเรียนรู้",
        "สนใจเส้นทางที่มีเป้าหมายชัด",
      ],
      watch: "อย่ามองอาชีพนี้จากตัวเลขรายได้อย่างเดียว เพราะผลลัพธ์มาจากทักษะ ความต่อเนื่อง และการดูแลลูกค้า",
    },
    caring: {
      keys: [2, 3, 4, 8],
      title: "The Caring Advisor",
      subtitle: "คุณคือคนที่อยากช่วยคนตัดสินใจเรื่องสำคัญ",
      copy: "คุณให้ความสำคัญกับความหมายของงาน การช่วยเหลือลูกค้า และการอธิบายเรื่องยากให้เข้าใจง่าย",
      strengths: [
        "มี Service Mind",
        "ไม่ชอบการขายแบบกดดัน",
        "เหมาะกับแนวทางที่ปรึกษา",
      ],
      watch: "ต้องฝึกเรื่องโครงสร้างการขาย การตั้งคำถาม และการเปลี่ยนความตั้งใจดีให้กลายเป็นการทำงานที่มีผลลัพธ์",
    },
    digital: {
      keys: [6, 1, 9],
      title: "The Digital Starter",
      subtitle: "คุณคือคนที่อยากสร้างโอกาสผ่านออนไลน์",
      copy: "คุณสนใจการทำคอนเทนต์ การสร้างตัวตน และการใช้เครื่องมือออนไลน์เพื่อสร้างโอกาสใหม่",
      strengths: [
        "เปิดรับการทำตลาดออนไลน์",
        "พร้อมเรียนรู้เครื่องมือใหม่",
        "เหมาะกับการสร้าง Personal Brand ระยะยาว",
      ],
      watch: "ต้องมีความสม่ำเสมอในการทำคอนเทนต์ และเรียนรู้เครื่องมืออย่างต่อเนื่อง ไม่ใช่ทำครั้งเดียวแล้วหวังผลทันที",
    },
    life: {
      keys: [5, 7, 8],
      title: "The Life Planner",
      subtitle: "คุณคือคนที่สนใจเรื่องชีวิต สุขภาพ และการเงิน",
      copy: "คุณให้ความสำคัญกับการวางแผนชีวิต การมีทีมคอยช่วย และการดูแลลูกค้าระยะยาว",
      strengths: [
        "สนใจสุขภาพ การเงิน และการวางแผนชีวิต",
        "อยากมี Mentor และทีมสนับสนุน",
        "มองการทำงานในมุมระยะยาว",
      ],
      watch: "ต้องแปลงความสนใจให้เป็นระบบการเรียนรู้และการปฏิบัติจริง ไม่ใช่แค่ชอบเรื่องวางแผนโดยไม่ลงมือทำ",
    },
  };

  var panel = document.getElementById("pbt-quiz-panel");
  if (!panel) return;

  var intro = document.getElementById("pbt-quiz-intro");
  var active = document.getElementById("pbt-quiz-active");
  var result = document.getElementById("pbt-quiz-result");
  var startBtn = document.getElementById("pbt-quiz-start");
  var retryBtn = document.getElementById("pbt-quiz-retry");
  var progressText = document.getElementById("pbt-quiz-progress-text");
  var progressFill = document.getElementById("pbt-quiz-progress-fill");
  var questionEl = document.getElementById("pbt-quiz-question");
  var answersEl = document.getElementById("pbt-quiz-answers");
  var resultLevel = document.getElementById("pbt-quiz-result-level");
  var resultPersona = document.getElementById("pbt-quiz-persona");
  var resultActions = document.getElementById("pbt-quiz-result-actions");

  var currentIndex = 0;
  var scores = [];

  function resetQuiz() {
    currentIndex = 0;
    scores = [];
    intro.hidden = false;
    active.hidden = true;
    result.hidden = true;
  }

  function showQuestion() {
    questionEl.textContent = QUESTIONS[currentIndex];
    progressText.textContent = "ข้อ " + (currentIndex + 1) + " จาก " + QUESTIONS.length;
    progressFill.style.width = ((currentIndex + 1) / QUESTIONS.length) * 100 + "%";
    answersEl.innerHTML = "";

    ANSWERS.forEach(function (answer) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pbt-quiz-answer";
      btn.textContent = answer.label;
      btn.addEventListener("click", function () {
        scores[currentIndex] = answer.score;
        currentIndex += 1;
        if (currentIndex < QUESTIONS.length) {
          questionEl.parentElement.classList.add("pbt-quiz-question-card--fade");
          window.setTimeout(function () {
            questionEl.parentElement.classList.remove("pbt-quiz-question-card--fade");
            showQuestion();
          }, 180);
        } else {
          showResult();
        }
      });
      answersEl.appendChild(btn);
    });
  }

  function getLevel(total) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (total >= LEVELS[i].min && total <= LEVELS[i].max) {
        return LEVELS[i];
      }
    }
    return LEVELS[LEVELS.length - 1];
  }

  function getPersona() {
    var totals = { growth: 0, caring: 0, digital: 0, life: 0 };
    Object.keys(PERSONAS).forEach(function (key) {
      PERSONAS[key].keys.forEach(function (qIndex) {
        totals[key] += scores[qIndex] || 0;
      });
    });
    var best = "growth";
    Object.keys(totals).forEach(function (key) {
      if (totals[key] > totals[best]) best = key;
    });
    return PERSONAS[best];
  }

  function renderList(items) {
    return items.map(function (item) {
      return "<li>" + item + "</li>";
    }).join("");
  }

  function showResult() {
    active.hidden = true;
    result.hidden = false;

    var total = scores.reduce(function (sum, n) {
      return sum + n;
    }, 0);
    var level = getLevel(total);
    var persona = getPersona();

    resultLevel.innerHTML =
      '<span class="pbt-quiz-score">คะแนนรวม ' +
      total +
      " / 40</span>" +
      "<h3>" +
      level.title +
      "</h3>" +
      '<p class="pbt-quiz-result-copy">' +
      level.copy +
      "</p>" +
      '<p class="pbt-quiz-next"><strong>Next Step:</strong> ' +
      level.next +
      "</p>";

    resultPersona.innerHTML =
      '<div class="pbt-quiz-persona-card">' +
      '<span class="pbt-quiz-persona-kicker">Career Persona</span>' +
      "<h4>" +
      persona.title +
      "</h4>" +
      "<p class=\"pbt-quiz-persona-sub\">" +
      persona.subtitle +
      "</p>" +
      "<p>" +
      persona.copy +
      "</p>" +
      '<div class="pbt-quiz-persona-cols">' +
      "<div><strong>Strengths</strong><ul>" +
      renderList(persona.strengths) +
      "</ul></div>" +
      "<div><strong>Watch out</strong><p>" +
      persona.watch +
      "</p></div>" +
      "</div></div>";

    var btnClass = level.cta.primary ? "btn btn-primary" : "btn btn-secondary";
    resultActions.innerHTML =
      '<a class="' +
      btnClass +
      '" href="' +
      level.cta.href +
      '">' +
      level.cta.label +
      "</a>" +
      '<p class="pbt-quiz-result-micro">' +
      level.micro +
      "</p>";

    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  startBtn.addEventListener("click", function () {
    intro.hidden = true;
    active.hidden = false;
    result.hidden = true;
    currentIndex = 0;
    scores = [];
    showQuestion();
  });

  retryBtn.addEventListener("click", resetQuiz);
})();
