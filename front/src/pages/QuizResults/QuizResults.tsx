import { useParams } from "react-router";
import { QuizResultsProvider } from "../../contexts/QuizResultsContext";
import QuizResultsContent from "./QuizResultsContent";

const QuizResults: React.FC = () => {
    const { quizAttemptId } = useParams<{quizAttemptId: string}>()

    return <>
        <QuizResultsProvider quizAttemptId={quizAttemptId ?? '0'}>
            <QuizResultsContent />
        </QuizResultsProvider>
    </>
}

export default QuizResults;