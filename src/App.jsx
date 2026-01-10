import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Quiz from "./pages/Quiz";
import Report from "./pages/Report";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}
