import { gql, useMutation } from "@apollo/client";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


interface CreateQuizContextType {
    prompt: string
    setPrompt: (value: string) => void;
    createQuiz: (manualPrompt?: string) => void;
    loading: boolean;
}

const CreateQuizContext = createContext<CreateQuizContextType | undefined>(undefined)

export const useCreateQuiz = () => {
    const context = useContext(CreateQuizContext);

    if (!context) {
        throw new Error("useCreateQuiz must be used within a CreateQuizProvider")
    }

    return context;
}

const CREATE_QUIZ = gql`
    mutation createQuiz($input: CreateQuizInput!) {
        createQuiz(input: $input) {
            quizAttempt {
                id
            }
        }
    }
`

export const CreateQuizProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [createQuizMutation, { loading }] = useMutation(CREATE_QUIZ);
    const [prompt, setPrompt] = useState<string>('');
    const navigate = useNavigate();

    const createQuiz = async (manualPrompt: string = '') => {
        const promptText = manualPrompt != '' ? manualPrompt : prompt;

        if (!promptText.trim()) {
            toast.error("Please type out something");
            return;
        }

        setPrompt(promptText);

        const toastId = toast.loading('Generating quiz...')

        try {
            const { data } = await createQuizMutation({
                variables: {
                    input: {
                        prompt: promptText,
                    }
                }
            })

            const quizAttemptId = data?.createQuiz?.quizAttempt?.id;

            if (quizAttemptId) {
                navigate(`/quiz/${quizAttemptId}`)
            } else {
                toast.error("Something went wrong, please try again")
            }
        } catch (e) {
            toast.error("Error creating quiz.")
        } finally {
            toast.dismiss(toastId);
        }
    }

    return <CreateQuizContext.Provider value={{prompt, setPrompt, createQuiz, loading}}>
        {children}
    </CreateQuizContext.Provider>
}

