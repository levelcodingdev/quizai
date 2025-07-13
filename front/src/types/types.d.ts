
export interface Answer {
    id: string
    answer: string
    isCorrect?: boolean
}

export interface Question {
    id: string
    question: string
    description: string
    explanation: string
    type: string
    answers: Answer[]
}

export interface QuizAttemptAnswer {
    id: string
    questionId: string
    answerId: string
    isCorrect?: boolean
}

export interface QuizAttempt {
    id: string
    quizId: string
    isCompleted: boolean
    quizAttemptAnswers: QuizAttemptAnswer[]
}

export interface Quiz {
    id: string
    title: string
    promptText: string
    questions: Question[]
    quizAttempts: QuizAttempt[]
}