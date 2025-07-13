import { gql } from "@apollo/client";


export const GET_QUIZ = gql`
    query getQuiz($quizAttemptId: String!) {
        getQuiz(quizAttemptId: $quizAttemptId) {
            quiz {
                id
                title
                promptText
                questions {
                    id
                    question
                    description
                    explanation
                    type
                    answers {
                        id
                        answer
                    }
                }
                quizAttempts {
                    id
                    isCompleted
                    quizAttemptAnswers {
                        id
                        questionId
                        answerId
                    }
                }
            }
        }
    }
`

export const GET_QUIZ_RESULTS = gql`
    query getQuizResults($quizAttemptId: String!) {
        getQuizResults(quizAttemptId: $quizAttemptId) {
            quiz {
                id
                title
                promptText
                questions {
                    id
                    question
                    description
                    explanation
                    type
                    answers {
                        id
                        answer
                        isCorrect
                    }
                }
                quizAttempts {
                    id
                    isCompleted
                    quizAttemptAnswers {
                        id
                        questionId
                        answerId
                        isCorrect
                    }
                }
            }
        }
    }
`

export const SUBMIT_QUIZ_ANSWER  = gql`
    mutation SubmitQuizAnswer($input: SubmitQuizAnswerInput!) {
        submitQuizAnswer(input: $input)
    }
`

export const SUBMIT_QUIZ = gql`
    mutation SubmitQuiz($quizAttemptId: ID!) {
        submitQuiz(quizAttemptId: $quizAttemptId)
    }
`