import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavigationPanel from "../components/NavigationPanel";

const TOTAL_TIME = 30 * 60; // 30 minutes

// ✅ 15 fallback questions
const fallbackQuestions = [
  { question: "What does HTML stand for?", correct_answer: "Hyper Text Markup Language", incorrect_answers: ["Home Tool Markup Language", "Hyperlinks Text Markup Language", "Hyper Tool Multi Language"] },
  { question: "Which company developed React?", correct_answer: "Facebook", incorrect_answers: ["Google", "Microsoft", "Amazon"] },
  { question: "Which language is used for styling web pages?", correct_answer: "CSS", incorrect_answers: ["HTML", "Java", "Python"] },
  { question: "Which hook is used to manage state in React?", correct_answer: "useState", incorrect_answers: ["useEffect", "useContext", "useRef"] },
  { question: "Which keyword is used to declare a constant in JavaScript?", correct_answer: "const", incorrect_answers: ["var", "let", "static"] },
  { question: "What does CSS stand for?", correct_answer: "Cascading Style Sheets", incorrect_answers: ["Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"] },
  { question: "Which HTML tag is used to define an unordered list?", correct_answer: "<ul>", incorrect_answers: ["<ol>", "<li>", "<list>"] },
  { question: "Which JavaScript method converts JSON to object?", correct_answer: "JSON.parse()", incorrect_answers: ["JSON.stringify()", "JSON.object()", "parse.JSON()"] },
  { question: "Which operator is used to compare both value and type?", correct_answer: "===", incorrect_answers: ["==", "!=", "="] },
  { question: "Which lifecycle hook runs after first render in React?", correct_answer: "useEffect", incorrect_answers: ["useState", "useMemo", "useCallback"] },
  { question: "Which HTML attribute is used for inline styles?", correct_answer: "style", incorrect_answers: ["class", "id", "css"] },
  { question: "Which method is used to add elements to an array?", correct_answer: "push()", incorrect_answers: ["add()", "insert()", "append()"] },
  { question: "Which protocol is used to load web pages?", correct_answer: "HTTP", incorrect_answers: ["FTP", "SMTP", "TCP"] },
  { question: "Which company owns GitHub?", correct_answer: "Microsoft", incorrect_answers: ["Google", "Facebook", "Amazon"] },
  { question: "Which tool is used to bundle React apps?", correct_answer: "Vite", incorrect_answers: ["Node", "NPM", "Express"] }
];

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const navigate = useNavigate();
  const questionRef = useRef(null);

  // 🔹 FAST API fetch with timeout fallback
  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
      setQuestions(fallbackQuestions);
    }, 2000);

    fetch("https://opentdb.com/api.php?amount=15", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.results && data.results.length) {
          clearTimeout(timeoutId);
          setQuestions(data.results);
        }
      })
      .catch(() => {
        setQuestions(fallbackQuestions);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  // 🔹 Timer + auto-submit
  useEffect(() => {
    if (!questions.length) return;

    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions]);

  // 🔹 Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" && currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
      if (["1", "2", "3", "4"].includes(e.key)) {
        const opts = [...questions[currentIndex].incorrect_answers, questions[currentIndex].correct_answer].sort();
        const selected = opts[Number(e.key) - 1];
        if (selected) handleAnswer(selected);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, questions]);

  // 🔹 Animation on question change
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.classList.remove("fade-in");
      void questionRef.current.offsetWidth;
      questionRef.current.classList.add("fade-in");
    }
  }, [currentIndex]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
  };

  // ✅ Skip question
  const skipQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const submitQuiz = () => {
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the quiz?"
    );
    if (confirmSubmit) {
      navigate("/report", { state: { questions, answers } });
    }
  };

  if (!questions.length || !questions[currentIndex]) {
    return <h3>Loading questions...</h3>;
  }

  const q = questions[currentIndex];
  const options = [...q.incorrect_answers, q.correct_answer].sort();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const attempted = Object.keys(answers).length;

  return (
    <div className="quiz-container">
      <div className="timer">
        Time Left: {minutes}:{seconds < 10 ? "0" : ""}{seconds}
      </div>

      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
        Attempted: {attempted} / {questions.length}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(attempted / questions.length) * 100}%` }}
        />
      </div>

      <NavigationPanel
        total={questions.length}
        answers={answers}
        setCurrentIndex={setCurrentIndex}
      />

      <div ref={questionRef} className="fade-in">
        <h3>Question {currentIndex + 1}</h3>
        <p dangerouslySetInnerHTML={{ __html: q.question }} />
      </div>

      {options.map((opt, i) => (
        <div
          key={i}
          className={`option ${
            answers[currentIndex] === opt ? "selected" : ""
          }`}
          onClick={() => handleAnswer(opt)}
        >
          <input type="radio" checked={answers[currentIndex] === opt} readOnly />
          <span dangerouslySetInnerHTML={{ __html: opt }} />
        </div>
      ))}

      <br />

      {/* ✅ FIXED NAV BUTTON ROW (Skip visible) */}
      <div className="nav-actions">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          Prev
        </button>

        <button
          disabled={currentIndex === questions.length - 1}
          onClick={skipQuestion}
          className="skip-btn"
        >
          Skip
        </button>

        <button
          disabled={currentIndex === questions.length - 1}
          onClick={() => setCurrentIndex(currentIndex + 1)}
        >
          Next
        </button>
      </div>

      <br />

      <button disabled={attempted === 0} onClick={submitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
}
