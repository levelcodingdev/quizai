
import { useParams } from "react-router";
import { QuizProvider } from "../../contexts/QuizContext";
import QuizContent from "./QuizContent";


const Quiz: React.FC = () => {
    const { quizAttemptId } = useParams<{ quizAttemptId: string}>()
    return <>
       <QuizProvider quizAttemptId={quizAttemptId ?? '0'}>
            <QuizContent/>
       </QuizProvider>
    </>
}

export default Quiz;