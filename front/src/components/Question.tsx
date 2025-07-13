import MarkdownContent from "./MarkdownContent"
import type { Answer } from "../types/types"
import { IoMdCheckmark } from "react-icons/io"
import { IoCloseOutline } from "react-icons/io5"

interface QuestionProps {
    id: string
    question: string
    description: string
    explanation: string
    answers: Answer[],
    currentQuestionIndex: number
    isAnswerSelected: (answerId: string) => boolean
    selectAnswer: (answerId: string) => void
    checkAnswerSelected: (questionId: string, answerId: string) => boolean
    resultsMode?: boolean
}

const Question: React.FC<QuestionProps> = ({
    id,
    question,
    description,
    explanation,
    answers,
    currentQuestionIndex,
    isAnswerSelected,
    selectAnswer,
    checkAnswerSelected,
    resultsMode=false
}) => {

    const getAnswerClasses = (answer: Answer): string => {
        const checkIsSelected = checkAnswerSelected(id, answer.id)

        if (resultsMode) {
            if (answer.isCorrect) return 'border-green-300'
            if (checkIsSelected && !answer.isCorrect) return 'border-red-300'
            return 'border-gray-200';
        }

        return isAnswerSelected(answer.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
    }

    const renderAnswerIcon = (answer: Answer) => {
        const checkIsSelected = checkAnswerSelected(id, answer.id)

        if (!resultsMode) return null;

        if (answer.isCorrect) {
            return <IoMdCheckmark className="text-green-500 text-lg"/>
        }

        if (checkIsSelected && !answer.isCorrect) {
            return <IoCloseOutline className="text-red-500 text-lg" />
        }
    }

    return <>
        <h2 className={`
                ${resultsMode ? 'text-md' : 'text-lg'} font-semibold text-gray-900 flex
        `}>
            {currentQuestionIndex + 1}. <MarkdownContent content={question} />
        </h2>

        <div>
            <MarkdownContent content={description} />
        </div>

        <div className="flex flex-col gap-3">
            {answers.map((answer, i) => (
                <div 
                        key={answer.id} 
                        className={`
                            cursor-pointer flex justify-start w-full text-left bg-gray-50 border rounded-lg transitrion-colors 
                            ${resultsMode ? 'p-3' : 'p-4'}
                            ${getAnswerClasses(answer)}    
                        `}
                        onClick={() => {
                            if (!resultsMode) {
                                selectAnswer(answer.id)
                            }
                        }}
                    >
                    <span className="self-center">{renderAnswerIcon(answer)}</span>
                    <span className="font-medium text-blue-600 mr-1">
                        {String.fromCharCode(65 + i)}.
                    </span>
                    <MarkdownContent content={answer.answer}/>
                </div>
            ))}
        </div>

        {resultsMode && explanation && (
            <div className="mt-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-md text-blue-800">
                        <MarkdownContent content={explanation}/>
                    </div>
                </div>
            </div>
        )}
    </>
}

export default Question;