import type React from "react"

interface ChatMessageProps {
    sender?: string
    avatarBg?: string
    message?: string
    children?: React.ReactNode
}

const ChatMessage: React.FC<ChatMessageProps> = ({
    sender = 'AI',
    avatarBg = 'bg-blue-600',
    message = '',
    children
}) => {
    return (

        <div className="flex gap-4 items-start">
            <div className={`size-10 rounded-full ${avatarBg} text-white flex items-center justify-center font-semibold`}>
                {sender}
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                {message || children }
            </div>
        </div>
    )
}

export default ChatMessage;