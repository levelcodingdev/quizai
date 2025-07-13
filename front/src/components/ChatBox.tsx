import { BsFillSendFill } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { Link } from "react-router";
import { useCreateQuiz } from "../contexts/CreateQuizContext";
import { useEffect } from "react";

interface ChatBoxProps {
    promptText?: string
    disabled?: boolean
}


const ChatBox: React.FC<ChatBoxProps> = ({
    promptText,
    disabled = false
}) => {
    const {prompt, setPrompt, createQuiz, loading} = useCreateQuiz();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    }

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        await createQuiz();
    }

    useEffect(() => {
        setPrompt('')
    }, [])

    return <>
        <div className="w-full max-w-3xl mb-8">
            <form className="relative" onSubmit={handleSubmit}>
                <textarea
                    name="prompt"
                    value={promptText || prompt}
                    onChange={handleChange}
                    disabled={loading || disabled}
                    className="p-4 pr-12 w-full h-32 border border-gray-300 rounded-lg text-sm resize-none outline-0 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Tell me what you want to be quizzed about..."
                />
                <div className="absolute bottom-4 right-3 flex gap-2">
                    <Link to={`/history`}
                        className="size-8 flex items-center justify-center bg-gray-100 rounded-md cursor-pointer"
                        aria-label="My History"
                    >
                        <MdHistory className="text-xl text-gray-500"/>
                    </Link>
                    <button
                        type="submit"
                        disabled={loading || disabled}
                        className="size-8 flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white rounded-md cursor-pointer disabled:opacity-5"
                        aria-label="Send"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full size-4 border-b-2 border-white"></div>
                        ) : (
                            <BsFillSendFill className="text-base"/>
                        )}
                    </button>
                </div>
            </form>
        </div>
    </>
}

export default ChatBox;