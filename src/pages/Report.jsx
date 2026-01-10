import { useLocation } from "react-router-dom";

export default function Report() {
  const { state } = useLocation();

  if (!state) return <h3>No report available</h3>;

  const { questions, answers } = state;

  // Calculate score
  let score = 0;
  questions.forEach((q, index) => {
    if (answers[index] === q.correct_answer) {
      score++;
    }
  });

  return (
    <div className="container">
      <h1>Quiz Report</h1>

      <div className="score">
        🎯 Your Score: {score} / {questions.length}
      </div>

      <hr />

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <p dangerouslySetInnerHTML={{ __html: q.question }} />

          <p>
            <strong>Your Answer:</strong>{" "}
            {answers[index] || "Not Attempted"}
          </p>

          <p>
            <strong>Correct Answer:</strong>{" "}
            {q.correct_answer}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {answers[index] === q.correct_answer
              ? "✅ Correct"
              : "❌ Wrong"}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}
