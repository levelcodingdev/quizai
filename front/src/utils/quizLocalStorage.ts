
interface StoredQuiz {
    id: string
    quizAttemptId: string
    title: string
    completed: boolean
}

const STORAGE_KEY = 'quizzes';

export const getStoredQuizzes = (): StoredQuiz[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : []
    } catch (error) {
        console.log("Failed to parse stored quizzes", error)
        return [];
    }
}

export const saveStoredQuizzes = (quizzes: StoredQuiz[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
    } catch (error) {
        console.log("Failed to save quizzes to localStorage", error);
    }
}

export const upsertStoredQuiz = (quiz: StoredQuiz) => {
    let quizzes: StoredQuiz[] = getStoredQuizzes();

    const quizFound = quizzes.find((q) => q.quizAttemptId === quiz.quizAttemptId);

    if (quizFound) {
        quizzes = quizzes.map((q) => {
            return q.quizAttemptId === quiz.quizAttemptId ? {...q, completed: quiz.completed} : q
        })
    } else {
        quizzes.push(quiz);
    }

    saveStoredQuizzes(quizzes);
}