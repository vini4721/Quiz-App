document.addEventListener("DOMContentLoaded", () => {
    loadNextQuestion();
    setOptionListeners();
});

let intervalId, sum = 0, progress = 0;

function startTimer() {
    clearInterval(intervalId);

    let time = 30;
    let timerEle = document.querySelector(".timer .num");
    timerEle.innerText = time;

    intervalId = setInterval(function () {
    time--;
    timerEle.innerText = time;

    if (time <= 10) {
        timerEle.classList.add("timer-warning");
    } else {
        timerEle.classList.remove("timer-warning");
    }
    if (time === 0){
        options.forEach(item => {
            item.classList.add("disabled");
        });
        clearInterval(intervalId);
    }
    }, 1000);
}

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markdown Language",
    ],
    correctAnswer: "B",
    points: 10,
    level: "Easy",
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correctAnswer: "C",
    points: 10,
    level: "Easy",
  },
  {
    question: "What does const mean in JavaScript?",
    options: [
      "A function",
      "A constant value that can’t be reassigned",
      "A conditional statement",
      "A loop",
    ],
    correctAnswer: "B",
    points: 20,
    level: "Medium",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Django", "Flask", "React", "Laravel"],
    correctAnswer: "C",
    points: 20,
    level: "Medium",
  },
  {
    question: "What is the result of typeof null in JavaScript?",
    options: ['"null"', '"object"', '"undefined"', '"number"'],
    correctAnswer: "B",
    points: 30,
    level: "Hard",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: "B",
    points: 10,
    level: "Easy",
  },
  {
    question: "What is the default display value of a <div>?",
    options: ["inline", "block", "inline-block", "flex"],
    correctAnswer: "B",
    points: 20,
    level: "Medium",
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["Python", "Java", "HTML", "JavaScript"],
    correctAnswer: "C",
    points: 10,
    level: "Easy",
  },
  {
    question: "What is Git used for?",
    options: [
      "Designing websites",
      "Version control",
      "Compiling code",
      "Hosting servers",
    ],
    correctAnswer: "B",
    points: 20,
    level: "Medium",
  },
  {
    question: "What is the correct syntax to comment in CSS?",
    options: [
      "// this is a comment",
      "# this is a comment",
      "/* this is a comment */",
      "<!-- this is a comment -->",
    ],
    correctAnswer: "C",
    points: 10,
    level: "Easy",
  },
];

const nextBtn = document.querySelector(".next");
// const prevbtn = document.querySelector("previous");
const options = document.querySelectorAll(".option");
let currentQuestion = 0;

nextBtn.addEventListener("click", loadNextQuestion);
// prevbtn.addEventListener("click", loadPrevQuestion);

// function loadPrevQuestion() {
//     // options.forEach((item, index) => {
//     //     item.querySelector("p").innerText = questions[currentQuestion--].options[index];
//     // });
//     document.querySelector(".question").innerText = questions[currentQuestion-1].question;
// }

function loadNextQuestion() {
    startTimer();

    // Clear previous classes (correct/wrong/disabled)
    options.forEach(item => {
        item.classList.remove("correct", "wrong", "disabled");
    });

    document.querySelector(".question").innerText = questions[currentQuestion].question;

    options.forEach((item, index) => {
        item.querySelector("p").innerText = questions[currentQuestion].options[index];
    });

    document.querySelector(".points").innerText = questions[currentQuestion].points;
    document.querySelector(".level").innerText = questions[currentQuestion].level;

    if (currentQuestion === questions.length - 1) {
        nextBtn.classList.add("disabled");
    }
}

function correctAnswer() {
    //Disabling options after selecting one option
    options.forEach(item => {
        item.classList.add("disabled");
    });

    const selectedOpt = this.getAttribute("data-index");

    if(selectedOpt === questions[currentQuestion].correctAnswer) {
        this.classList.add("correct");

        //Updating score
        sum += questions[currentQuestion].points;
        document.querySelector(".score .num").innerText = sum;

        //Updating progress
        progress++;
        document.querySelector(".progress .num").innerText = `${progress}/10`;

    }
    else{
        this.classList.add("wrong");
    }

    //displaying correct option if wrong is chosen

    options.forEach(item => {
        if(item.getAttribute("data-index") === questions[currentQuestion].correctAnswer)
            item.classList.add("correct");
    })

    currentQuestion++;
}

function setOptionListeners() {
    options.forEach(item => {
        item.addEventListener("click", correctAnswer);
    })
}

document.querySelector(".submit").addEventListener("click", () => {
    clearInterval(intervalId)
    const correct = progress;
    const wrong = currentQuestion - correct;
    showResultChart(correct, wrong);
});

function showResultChart(correct, wrong) {
    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Correct', 'Wrong'],
            datasets: [{
                data: [correct, wrong],
                backgroundColor: ['#10b981', '#ef4444'],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}
