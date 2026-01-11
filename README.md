# Simple Quiz Application – CausalFunnel Assignment

This project is a **Simple Quiz Application** built as part of the **Software Engineer Intern assignment for CausalFunnel**.  
The application simulates a real online examination system with a clean UI, timer, navigation, result report, and multiple usability enhancements.

---

## 🚀 Live Demo

🔗 **Hosted Application:**  
https://resplendent-sopapillas-12c401.netlify.app

🎥 **Demo Video:**  
https://drive.google.com/file/d/1rhZO7AZDASI8X9DNjpWB65rHE6Tjx77N/view?usp=drivesdk

📦 **Source Code:**  
https://github.com/CoderParva/causal-funnel-quiz

---

## 🧠 Features Implemented

### Core Requirements
- Email input before starting the quiz
- Fetches **15 quiz questions** from Open Trivia Database API
- **30-minute timer** with automatic submission when time expires
- Question navigation panel to jump between questions
- Ability to select, change, and review answers
- Manual quiz submission
- Final report page showing:
  - Each question
  - User’s answer
  - Correct answer
  - Correct / Incorrect status
- Score calculation displayed as `X / 15`

---

### Reliability & Error Handling
- API rate-limit handling
- **Fallback question set** used if API fails or is slow
- API timeout mechanism to prevent long loading screens
- Application never crashes due to API issues

---

### User Experience Enhancements (Bonus)
- Attempted vs total questions counter
- Visual progress bar
- Keyboard navigation:
  - Arrow keys → Next / Previous
  - Number keys (1–4) → Select options
- Confirmation dialog before final submission
- Smooth animations when navigating between questions
- Responsive design (mobile, tablet, desktop)
- Compatible with major browsers (Chrome, Firefox, Edge, Safari)

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Routing:** React Router
- **Styling:** CSS (no external UI libraries)
- **Hosting:** Netlify
- **API:** Open Trivia Database (https://opentdb.com)

---

## 📁 Project Structure

src/
├── components/
│ └── NavigationPanel.jsx
├── pages/
│ ├── Start.jsx
│ ├── Quiz.jsx
│ └── Report.jsx
├── App.jsx
├── main.jsx
└── index.css


---

## ⚙️ Setup Instructions (Run Locally)

1. Clone the repository:
```bash
git clone <your-repo-url>
Install dependencies:

bash
npm install

Start the development server:
bash
npm run dev

Open in browser:
http://localhost:5173


🌐 Deployment

The application is deployed on Netlify using the production build:

npm run build


A Netlify _redirects file is used to support React Router navigation.

📝 Assumptions

Quiz questions are multiple-choice with one correct answer

Internet connection may be unreliable, so fallback questions are included

User can submit quiz manually or via auto-submit when timer expires

⚠️ Challenges Faced & Solutions

API Rate Limiting:
Solved using fallback questions and timeout-based fetch logic.

Long Loading Time:
Implemented API timeout to ensure fast UI response.

User Experience Improvements:
Added progress indicators, keyboard navigation, skip option, and animations.

✅ Conclusion

This application fulfills all required criteria mentioned in the assignment and includes several bonus enhancements to improve usability, performance, and reliability.
The focus was on clean code, graceful error handling, and a realistic exam-like user experience.