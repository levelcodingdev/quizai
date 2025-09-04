import { Link, useNavigate } from "react-router";
import { useQuizResultsContext } from "../../contexts/QuizResultsContext";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Question from "../../components/Question";

const QuizResultsContent: React.FC = () => {
    const {quiz, loading, correctCount, incorrectCount, score, checkAnswerSelected} = useQuizResultsContext();
    const navigate = useNavigate();

    if (!quiz?.quizAttempts?.[0]?.isCompleted) {
        navigate(`/quiz/${quiz?.quizAttempts?.[0]?.id}`);
        return;
    }

    return <>
        <div className="min-h-screen px-4 py-10 bg-white">
            <div className="flex flex-col w-full max-w-3xl mx-auto flex-grow overflow-y-auto pb-48">
                <h1 className="text-center text-4xl font-medium mb-10">Quiz Results</h1>

                <div className="mb-10 flex gap-2 justify-center items-center">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Retake Quiz</button>
                    <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">New Quiz</Link>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Share Quiz</button>
                </div>

                {loading ? (
                    <div className="flex justify-center space-x-2 p-5">
                        <div className="size-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="size-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="size-2 bg-gray-600 rounded-full animate-bounce"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <IoCheckmarkCircleOutline className="size-6 text-blue-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Score</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {score}
                                            <span className="text-lg">%</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <IoCheckmarkCircleOutline className="size-6 text-green-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Correct</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {correctCount}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-red-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <div className="bg-red-100 p-3 rounded-full mr-4">
                                        <IoCheckmarkCircleOutline className="size-6 text-red-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Incorrect</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {incorrectCount}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-center text-2xl font-medium mb-10">{quiz?.title}</h2>

                        <div className="space-y-4">
                            {quiz?.questions.map((question, questionIndex) => (
                                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                                    <Question 
                                        {...question}
                                        currentQuestionIndex={questionIndex}
                                        isAnswerSelected={() => false}
                                        selectAnswer={() => {}}

                                        checkAnswerSelected={checkAnswerSelected}
                                        resultsMode={true}
                                    />
                                </div>

                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
}

export default QuizResultsContent;
