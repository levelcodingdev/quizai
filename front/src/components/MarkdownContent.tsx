
import { useState } from 'react';
import { LuCheck, LuCode, LuCopy } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {oneLight} from "react-syntax-highlighter/dist/esm/styles/prism"

interface MarkdownContentProps {
    content: string
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({
    content
}) => {
    return (
        <div className="w-full">
            <div className="max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({node, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            const language = match ? match[1] : ''

                            const isInline = !className

                            return !isInline ? (
                                <CodeBlock 
                                    code={String(children).replace(/\n$/, '')}
                                    language={language}
                                />
                            ) : (
                                <code className="px-1 py-0.5 bg-gray-10 rounded text-sm" {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

function CodeBlock({code, language}: {code: string, language: string}) {
    const [copied, setCopied] = useState(false)

    const copyCode = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative my-6 rounded-md overflow-hidden border border-neutral-200">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-50 border-b border-neutral-200">
                <div className="flex items-center gap-2 text-neutrak-600">
                    <LuCode size={16} className="text-neutral-400"/>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                        {language || "Code"}
                    </span>
                </div>
                <button
                    onClick={copyCode}
                    className="relative text-neutral-500 hover:text-neutral-700 transition focus:outline-none group"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <LuCheck size={16} className="text-emerald-600"/>
                    ) : (
                        <LuCopy size={16}/>
                    )}
                </button>
            </div>

            <SyntaxHighlighter
                language={language}
                style={oneLight}
                customStyle={{
                    fontSize: 13,
                    margin: 0,
                    padding: '1rem',
                    background: "transparent"
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default MarkdownContent