import { BrowserRouter, Routes, Route } from "react-router"
import LandingPage from "./pages/LandingPage/LandingPage"
import { CreateQuizProvider } from "./contexts/CreateQuizContext"
import Quiz from "./pages/Quiz/Quiz"
import QuizResults from "./pages/QuizResults/QuizResults"
import QuizHistory from "./pages/QuizHistory/QuizHistory"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CreateQuizProvider>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/history" element={<QuizHistory />}/>
            <Route path="/quiz/:quizAttemptId" element={<Quiz />}/>
            <Route path="/quiz/:quizAttemptId/results" element={<QuizResults />}/>
          </Routes>
        </CreateQuizProvider>

      </BrowserRouter>
    </>
  )
}

export default App
