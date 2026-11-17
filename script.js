class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;

        // Menghubungkan elemen HTML
        this.startButton = document.getElementById('start-btn');
        this.nextButton = document.getElementById('next-btn');
        this.questionContainerElement = document.getElementById('quiz-container');
        this.questionElement = document.getElementById('question');
        this.answerButtonsElement = document.getElementById('answer-buttons');
        this.resultContainerElement = document.getElementById('result-container');
        this.scoreElement = document.getElementById('score');

        // Menambahkan event listener
        this.startButton.addEventListener('click', () => this.startQuiz());
        this.nextButton.addEventListener('click', () => this.nextQuestion());
    }

    // Fungsi untuk memulai kuis
    startQuiz() {
        this.startButton.classList.add('hide');
        this.resultContainerElement.classList.add('hide');
        this.questionContainerElement.classList.remove('hide');
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.showQuestion();
    }

    // Fungsi untuk menampilkan soal
    showQuestion() {
        this.resetState();
        const question = this.questions[this.currentQuestionIndex];
        this.questionElement.innerText = question.question;

        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.id = `choice-${index + 1}`;

            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }

            button.addEventListener('click', (e) => this.selectAnswer(e));
            this.answerButtonsElement.appendChild(button);
        });
    }

    // Fungsi untuk mereset tombol dan elemen
    resetState() {
        this.nextButton.classList.add('hide');
        while (this.answerButtonsElement.firstChild) {
            this.answerButtonsElement.removeChild(this.answerButtonsElement.firstChild);
        }
    }

    // Fungsi untuk memilih jawaban
    selectAnswer(event) {
        const selectedButton = event.target;
        const correct = selectedButton.dataset.correct === 'true';

        if (correct) {
            this.score++;
        }

        Array.from(this.answerButtonsElement.children).forEach((button) => {
            this.setStatusClass(button, button.dataset.correct);
        });

        if (this.currentQuestionIndex + 1 < this.questions.length) {
            this.nextButton.classList.remove('hide');
        } else {
            this.showResult();
        }
    }

    // Fungsi untuk memberikan status benar/salah
    setStatusClass(element, correct) {
        this.clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    // Fungsi untuk menghapus status benar/salah
    clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    // Fungsi untuk menampilkan hasil
    showResult() {
        this.questionContainerElement.classList.add('hide');
        this.resultContainerElement.classList.remove('hide');
        this.scoreElement.innerText = `Skor Anda: ${this.score}/${this.questions.length}`;
        this.startButton.innerText = 'Ujian Lagi';
        this.startButton.classList.remove('hide');
    }

    // Fungsi untuk melanjutkan ke soal berikutnya
    nextQuestion() {
        this.currentQuestionIndex++;
        this.showQuestion();
    }
}

// Soal kuis
const questions = [
    {
        question: "Berapa hasil dari 2 + 2?",
        answers: [
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "3", correct: false },
            { text: "6", correct: false },
        ],
    },
    {
        question: "Planet terbesar di tata surya?",
        answers: [
            { text: "Bumi", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturnus", correct: false },
        ],
    },
    {
        question: "Apa ibu kota dari Jepang?",
        answers: [
            { text: "Tokyo", correct: true },
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Bangkok", correct: false },
        ],
    },
];

// Inisialisasi kuis
const quiz = new Quiz(questi,ons);