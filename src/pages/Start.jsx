import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const startQuiz = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }
    navigate("/quiz", { state: { email } });
  };

  return (
    <div className="container">
      <h1>Quiz Application</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}
