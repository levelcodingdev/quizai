import { Link, useNavigate } from "react-router"
import ChatMessage from "../../components/ChatMessage"
import Question from "../../components/Question"
import { GoPlus } from "react-icons/go"
import ChatBox from "../../components/ChatBox"
import { useQuizContext } from "../../contexts/QuizContext"

const QuizContent: React.FC = () => {
    const {
        quiz, 
        currentQuestion, 
        currentQuestionIndex, 
        loading, 
        error,

        selectAnswer,
        isAnswerSelected,

        goToNextQuestion,
        goToPreviousQuestion,
        questionHasAnswers,

        submittingQuiz,
        submitQuiz
    } = useQuizContext();

    const navigate = useNavigate();

    if (quiz?.quizAttempts?.[0]?.isCompleted) {
        navigate(`/quiz/${quiz?.quizAttempts?.[0]?.id}/results`);
        return;
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>error...</p>
    if (!currentQuestion) return <p>no question...</p>

    return <>
        <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-white">
            {/* Chat messages container */}
            <div className="flex flex-col w-full max-w-3xl flex-grow overflow-y-auto pb-48">
                {/* messages list */}
                <div className="flex flex-col space-y-6">
                    <ChatMessage message="I wish you good luck!"/>

                    <ChatMessage>
                        <Question 
                            {...currentQuestion}
                            currentQuestionIndex={currentQuestionIndex}
                            isAnswerSelected={isAnswerSelected}
                            selectAnswer={selectAnswer}
                            checkAnswerSelected={() => false}
                        
                        />

                        <div className="flex space-x-2">
                            {currentQuestionIndex > 0 && (
                                <button className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    onClick={() => goToPreviousQuestion()}
                                >
                                    Prev
                                </button>
                            )}
                            {quiz?.questions?.length && currentQuestionIndex + 1 < quiz?.questions?.length && questionHasAnswers(currentQuestion.id) && (
                                <button className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    onClick={() => goToNextQuestion()}
                                >
                                    Next
                                </button>
                            )}

                            {quiz?.questions?.length && currentQuestionIndex + 1 == quiz?.questions?.length && questionHasAnswers(currentQuestion.id) && (
                                <button onClick={() => submitQuiz()} className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    {submittingQuiz ? (
                                        <div className="animate-spin rounded-full size-4 border-b-2 border-white"></div>
                                    ) : (
                                       <>Submit Quiz</>
                                    )}
                                </button>
                            )}
                        </div>
                    </ChatMessage>
                </div>
                
            </div>

            {/* ChatBox container */}
            <div className="fixed inset-x-0 bottom-5 z-10 mx-auto w-full max-w-3xl bg-white border-t border-gray-200 pt-4 px-2">
                <div className="flex justify-between items-center mb-4">
                    <Link to="/" className="flex items-center text-sm font-medium text-blue-600 hover:underline gap-1">
                        <GoPlus /> New Chat
                    </Link>
                </div>
                <ChatBox promptText={quiz?.promptText} disabled={true}/>
            </div>
        </div>
    </>
}

export default QuizContent;
