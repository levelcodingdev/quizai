import { Link } from "react-router";
import { getStoredQuizzes } from "../../utils/quizLocalStorage";

const QuizHistory: React.FC = () => {
    const quizzes = getStoredQuizzes();

    console.log(quizzes);

    return <>
        <div className="px-4 py-10 bg-white">
            <div className="text-center mb-10">
                <h1 className="text-blue-600 font-bold text-5xl mb-2">QuizAI</h1>
                <p className="text-gray-600 mt-3 text-base sm:text-lg">Your AI-powered Quiz Agent</p>
            </div>

            <div className="max-w-3xl mx-auto">
                <h1 className="text-xl font-medium mb-10">Quiz History</h1>

                <div>
                    {quizzes.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {quizzes.map((quiz) => (
                                <li key={quiz.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {quiz.title}
                                                </p>
                                                {quiz.completed ? (
                                                    <span className="bg-green-500 text-xs rounded-lg text-white p-0.5 px-2">completed</span>
                                                ) : (
                                                    <span className="bg-blue-500 text-xs rounded-lg text-white p-0.5 px-2">in progress</span>
                                                )}
                                            </div>
                                        </div>
                                        <Link to={`/quiz/${quiz.quizAttemptId}`} className="ml-4 text-sm text-blue-600 hover:text-blue-500">
                                                View
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No quiz history found
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
}

export default QuizHistory;