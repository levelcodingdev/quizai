import { FaQuestion } from "react-icons/fa";
import { useCreateQuiz } from "../../../contexts/CreateQuizContext";

interface SuggestionsProps {
    suggestions: Array<string>
}

const Suggestions: React.FC<SuggestionsProps> = ({
    suggestions
}) => {
    const {createQuiz, loading} = useCreateQuiz();

    return <>
        <div className="w-full max-w-3xl">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4">
                {suggestions.map((text, index) => (
                    <button
                        key={index}
                        onClick={() => createQuiz(text)}
                        disabled={loading}
                        className="flex items-center gap-3 border border-gray-200 p-3 rounded-lg text-sm text-gray-800 bg-white transition cursor-pointer"
                    >
                        <span className={`${loading ? 'bg-gray-100' : 'bg-blue-600 hover:bg-blue-500'} text-white p-1.5 rounded-md`}>
                            <FaQuestion className="text-sm"/>
                        </span>
                        {text}
                    </button>
                ))}
            </div>
        </div>
    </>
}

export default Suggestions;