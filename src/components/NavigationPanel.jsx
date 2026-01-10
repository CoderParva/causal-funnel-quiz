export default function NavigationPanel({ total, answers, setCurrentIndex }) {
  return (
    <div className="nav-panel">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentIndex(i)}
          className={`nav-btn ${
            answers[i] ? "attempted" : "unattempted"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
