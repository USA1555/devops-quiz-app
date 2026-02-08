const els = {
  topicSelect: document.getElementById("topicSelect"),
  nextBtn: document.getElementById("nextBtn"),
  questionText: document.getElementById("questionText"),
  options: document.getElementById("options"),
  submitBtn: document.getElementById("submitBtn"),
  feedback: document.getElementById("feedback"),
  explanation: document.getElementById("explanation"),
};

let allQuestions = [];
let topicQuestions = [];
let current = null;
let selectedIndex = null;

async function loadQuestions() {
  const res = await fetch("data/questions.json");
  allQuestions = await res.json();
}

function getTopics(questions) {
  const set = new Set(questions.map(q => q.topic));
  return Array.from(set).sort();
}

function fillTopics() {
  const topics = getTopics(allQuestions);
  els.topicSelect.innerHTML = `<option value="">Select topic...</option>` +
    topics.map(t => `<option value="${t}">${t}</option>`).join("");
}

function resetUI() {
  els.options.innerHTML = "";
  els.feedback.textContent = "";
  els.explanation.textContent = "";
  selectedIndex = null;
  els.submitBtn.disabled = true;
}

function showQuestion(q) {
  current = q;
  els.questionText.textContent = q.question;
  resetUI();

  q.options.forEach((opt, idx) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;

    div.addEventListener("click", () => {
      selectedIndex = idx;
      [...els.options.children].forEach(x => x.classList.remove("selected"));
      div.classList.add("selected");
      els.submitBtn.disabled = false;
    });

    els.options.appendChild(div);
  });
}

function pickRandomQuestion() {
  if (!topicQuestions.length) return null;
  return topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
}

els.topicSelect.addEventListener("change", () => {
  const topic = els.topicSelect.value;
  topicQuestions = allQuestions.filter(q => q.topic === topic);
  els.nextBtn.disabled = !topic;
  resetUI();
  els.questionText.textContent = topic ? "Click Next Question" : "Select a topic to start";
});

els.nextBtn.addEventListener("click", () => {
  const q = pickRandomQuestion();
  if (!q) return;
  showQuestion(q);
});

els.submitBtn.addEventListener("click", () => {
  if (!current || selectedIndex === null) return;

  const isCorrect = selectedIndex === current.answerIndex;
  els.feedback.textContent = isCorrect ? "Correct ✅" : "Wrong ❌";
  els.explanation.textContent = current.explanation || "";
  els.submitBtn.disabled = true;
});

(async function init() {
  try {
    await loadQuestions();
    fillTopics();
    els.topicSelect.disabled = false;
  } catch (e) {
    els.topicSelect.innerHTML = `<option value="">Failed to load questions</option>`;
  }
})();
