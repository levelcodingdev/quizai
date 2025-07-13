import { createContext, useContext, useEffect, useMemo } from "react";
import type { Answer, Question, Quiz } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_QUIZ_RESULTS } from "../grapql";
import { upsertStoredQuiz } from "../utils/quizLocalStorage";

interface QuizResultsContextType {
    quiz: Quiz | null
    loading: boolean
    error: any

    correctCount: number
    incorrectCount: number
    score: number

    checkAnswerSelected: (questionId: string, answer: string) => boolean
}

const QuizResultsContext = createContext<QuizResultsContextType | undefined>(undefined)

export const useQuizResultsContext = () => {
    const context = useContext(QuizResultsContext)

    if (!context) {
        throw new Error("useQuizResultsContext must be used within a QuizResultsProvider")
    }

    return context;
}

export const QuizResultsProvider: React.FC<{children: React.ReactNode, quizAttemptId: string}> = ({
    children,
    quizAttemptId
}) => {
    const { data, loading, error, refetch } = useQuery(GET_QUIZ_RESULTS, {
        variables: {
            quizAttemptId
        }
    })

    const quiz: Quiz | null = data?.getQuizResults?.quiz ?? null;

    const correctCount = useMemo(() => {
        if (!quiz) return 0;

        return quiz.quizAttempts[0]?.quizAttemptAnswers.filter((quizAttemptAnswer) => {
            const question = quiz.questions.find((q: Question) => q.id === quizAttemptAnswer.questionId);
            const answer = question?.answers.find((a: Answer) => a.id == quizAttemptAnswer.answerId);

            return answer?.isCorrect;
        }).length || 0;
    }, [quiz])

    const incorrectCount = quiz ? quiz.questions.length - correctCount : 0;
    const score = quiz ? Math.round((correctCount / quiz?.questions.length) * 100) : 0;

    const checkAnswerSelected = (questionId: string, answerId: string) => {
        return !!quiz?.quizAttempts?.[0]?.quizAttemptAnswers?.find(
            (quizAttemptAnswer) => quizAttemptAnswer.questionId == questionId && quizAttemptAnswer.answerId == answerId
        )
    }

    useEffect(() => {
        if (quiz) {
            upsertStoredQuiz({
                id: quiz.id,
                quizAttemptId: quiz.quizAttempts[0].id,
                title: quiz.title,
                completed: quiz.quizAttempts[0].isCompleted,
            })
        }
    }, [quiz])

    const contextValue: QuizResultsContextType = {
        quiz: quiz,
        loading,
        error,

        correctCount,
        incorrectCount,
        score,

        checkAnswerSelected
    }

    return (
        <QuizResultsContext.Provider value={contextValue}>
            {children}
        </QuizResultsContext.Provider>
    )
}