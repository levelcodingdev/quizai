import { createContext, useContext, useEffect, useState } from "react";
import type { Question, Quiz } from "../types/types";
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUIZ, SUBMIT_QUIZ, SUBMIT_QUIZ_ANSWER } from "../grapql";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { upsertStoredQuiz } from "../utils/quizLocalStorage";

interface QuestionAnswer {
    questionId: string
    answerIds: string[]
}

interface QuizContextType {
    quiz: Quiz | null
    currentQuestion: Question | null
    currentQuestionIndex: number
    loading: boolean
    error: any

    questionAnswers: QuestionAnswer[],
    submittingAnswer: boolean
    selectAnswer: (answerId: string) => void
    isAnswerSelected: (answerId: string) => boolean

    goToNextQuestion: () => void
    goToPreviousQuestion: () => void
    questionHasAnswers: (questionId: string) => boolean

    submittingQuiz: boolean
    submitQuiz: () => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

interface QuizProviderProps {
    children: React.ReactNode
    quizAttemptId: string
}

export const QuizProvider: React.FC<QuizProviderProps> = ({
    children,
    quizAttemptId
}) => {
    const { data, loading, error, refetch } = useQuery(GET_QUIZ, {
        skip: !quizAttemptId,
        variables: {
            quizAttemptId
        }
    })

    const navigate = useNavigate()

    const quiz: Quiz | null = data?.getQuiz?.quiz ?? null;
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([])
    const [submittingAnswer, setSubmittingAnswer] = useState(false)
    const [submitQuizAnswer] = useMutation(SUBMIT_QUIZ_ANSWER)

    const [submittingQuiz, setSubmittingQuiz] = useState(false);
    const [submitQuizMutation] = useMutation(SUBMIT_QUIZ)

    useEffect(() => {
        if (quiz?.questions?.length) {
            setCurrentQuestion(quiz.questions[currentQuestionIndex]);

            if (questionAnswers.length === 0) {
                const questionAnswers = [];
                for (let i = 0; i < quiz?.questions.length; i++) {
                    const quizAttemptAnswers = quiz?.quizAttempts?.[0].quizAttemptAnswers.filter(
                        (quizAttemptAnswer) => quizAttemptAnswer.questionId === quiz?.questions[i].id
                    )

                    if (quizAttemptAnswers.length) {
                        const questionAnswer: QuestionAnswer = {
                            questionId: quiz.questions[i].id,
                            answerIds: [],
                        }
                        questionAnswer.answerIds = quizAttemptAnswers.map((quizAttemptAnswer) => quizAttemptAnswer.answerId)
                        questionAnswers.push(questionAnswer);
                    }
                }

                setQuestionAnswers([...questionAnswers])
            }

        }
    }, [quiz, currentQuestionIndex])

    useEffect(() => {
        if (currentQuestion?.id && submittingAnswer) {
            submitAnswer(currentQuestion.id);
        }
    }, [submittingAnswer])

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

    const selectAnswer = (answerId: string) => {
        if (!currentQuestion || submittingAnswer) return;

        const questionId = currentQuestion.id;
        const questionAnswerFound = questionAnswers.find(questionAnswer => questionAnswer.questionId === questionId);

        if (!questionAnswerFound) {
            setQuestionAnswers(prev => [...prev, {questionId, answerIds: [answerId]}])
        } else {
            const answerExists = questionAnswerFound.answerIds.find(a => a === answerId);

            setQuestionAnswers([
                ...questionAnswers.map((questionAnswer) => {
                    if (questionAnswer.questionId === questionAnswerFound.questionId) {
                        questionAnswer.answerIds = answerExists ? [] : [answerId];
                    }

                    return questionAnswer;
                })
            ])
        }

        setSubmittingAnswer(true);
    }

    const submitAnswer = async (questionId: string) => {
        try {
            const response = await submitQuizAnswer({
                variables: {
                    input: {
                        quizId: quiz?.id,
                        quizAttemptId,
                        questionId,
                        answerIds: questionAnswers.find(questionAnswer => questionAnswer.questionId === questionId)?.answerIds ?? [],
                    }
                }
            })

            if (response?.data?.submitQuizAnswer) {
                toast.success("Answer was saved successfully")
            }
        } catch (error) {
            console.log("Error submitting answer:", error)
            toast.error("Failed to save the answer");            
        } finally {
            setSubmittingAnswer(false);
        }
    }

    const submitQuiz = async () => {
        try {
            setSubmittingQuiz(true);

            const response = await submitQuizMutation({
                variables: {
                    quizAttemptId,
                }
            })


            if (response?.data?.submitQuiz) {
                navigate(`/quiz/${quizAttemptId}/results`)
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Something went wwrong", error);
        } finally {
            setSubmittingQuiz(false)
        }
    }

    const isAnswerSelected = (answerId: string) => {
        return !!questionAnswers.find(questionAnswer => questionAnswer.questionId === currentQuestion?.id)
                    ?.answerIds.includes(answerId);
    }

    const goToNextQuestion = () => {
        if (quiz?.questions?.length && currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    }

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    }

    const questionHasAnswers = (questionId: string) => {
        return !!questionAnswers.find(
            questionAnswer => questionAnswer.questionId === questionId
        )?.answerIds?.length;
    }

    const contextValue: QuizContextType = {
        quiz,
        currentQuestion,
        currentQuestionIndex,
        loading,
        error,

        questionAnswers,
        selectAnswer,
        submittingAnswer,
        isAnswerSelected,

        goToNextQuestion,
        goToPreviousQuestion,
        questionHasAnswers,

        submittingQuiz,
        submitQuiz,
    }

    return (
        <QuizContext.Provider value={contextValue}>
            {children}
        </QuizContext.Provider>
    )
}

export const useQuizContext = (): QuizContextType => {
    const context = useContext(QuizContext)

    if (!context) {
        throw new Error("useQuizContext must be used within a QuizProvider")
    }

    return context;
}