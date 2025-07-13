import Header from "./partials/Header"
import Suggestions from "./partials/Suggestions"
import ChatBox from "../../components/ChatBox"

const LandingPage: React.FC = () => {
    const suggestions: Array<string> = [
        "Quiz me about PHP OOP",
        "Quiz me about Javascript Closures",
        "Quiz me about React Hooks",
        "Quiz me about Data Structures"
    ]

    return <>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white">
            {/* Header */}
            <Header />

            {/* Chatbox */}
            <ChatBox/>

            {/* Suggestions */}
            <Suggestions suggestions={suggestions}/>
        </div>

    </>
}

export default LandingPage