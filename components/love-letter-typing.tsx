"use client"

import { useState, useEffect } from "react"
import { Heart, Pen, SkipForward } from "lucide-react"

interface LoveLetterTypingProps {
  onComplete: () => void
}

const letterLines = [
  "My Dearest Love,",
  "",
  "Every moment with you feels like a beautiful dream",
  "I never want to wake up from.",
  "",
  "From the first time our eyes met,",
  "I knew my life would never be the same.",
  "",
  "You are my sunshine on cloudy days,",
  "my comfort in times of trouble,",
  "and my greatest adventure.",
  "",
  "Your smile lights up my world,",
  "and your love makes every day worth living.",
  "",
  "Thank you for choosing me,",
  "for loving me unconditionally,",
  "and for being my partner in this beautiful journey.",
  "",
  "Forever Yours,",
  "With All My Love",
]

export default function LoveLetterTyping({ onComplete }: LoveLetterTypingProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (skipped) {
      setDisplayedLines(letterLines)
      setIsComplete(true)
      return
    }

    if (currentLineIndex >= letterLines.length) {
      setIsComplete(true)
      return
    }

    const currentLine = letterLines[currentLineIndex]

    if (currentCharIndex <= currentLine.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedLines((prev) => {
            const newLines = [...prev]
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex)
            return newLines
          })
          setCurrentCharIndex((prev) => prev + 1)
        },
        currentLine === "" ? 300 : 40,
      )

      return () => clearTimeout(timeout)
    } else {
      setCurrentLineIndex((prev) => prev + 1)
      setCurrentCharIndex(0)
    }
  }, [currentLineIndex, currentCharIndex, skipped])

  const handleSkip = () => {
    setSkipped(true)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-2xl mx-auto my-auto">
        {/* Skip button */}
        {!isComplete && (
          <button
            onClick={handleSkip}
            className="fixed top-4 right-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward className="h-4 w-4" />
            Skip
          </button>
        )}

        {/* Letter card */}
        <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/10">
          {/* Decorative elements */}
          <Heart className="absolute -top-3 -left-3 h-6 w-6 fill-primary text-primary" />
          <Heart className="absolute -top-3 -right-3 h-6 w-6 fill-primary text-primary" />
          <Heart className="absolute -bottom-3 -left-3 h-6 w-6 fill-primary text-primary" />
          <Heart className="absolute -bottom-3 -right-3 h-6 w-6 fill-primary text-primary" />

          {/* Header */}
          <div className="flex items-center gap-3 mb-8 border-b border-primary/20 pb-6">
            <Pen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl italic text-gray-800">A Letter For You</h2>
          </div>

          {/* Letter content */}
          <div className="space-y-2 min-h-[300px] md:min-h-[400px]">
            {displayedLines.map((line, index) => (
              <p
                key={index}
                className={`text-lg md:text-xl leading-relaxed ${
                  index === 0 || index >= letterLines.length - 2 ? "text-gray-800 font-semibold" : "text-gray-600"
                } ${line === "" ? "h-4" : ""}`}
              >
                {line}
                {index === currentLineIndex && !isComplete && (
                  <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-blink" />
                )}
              </p>
            ))}
          </div>

          {/* Heart signature */}
          {isComplete && (
            <div className="mt-8 flex justify-center animate-fade-in">
              <Heart className="h-12 w-12 fill-primary text-primary animate-pulse" />
            </div>
          )}
        </div>

        {isComplete && (
          <div className="text-center mt-8">
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(232,74,111,0.5)] animate-bounce-in"
            >
              Discover More Surprises
              <Heart className="h-5 w-5 fill-current" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
