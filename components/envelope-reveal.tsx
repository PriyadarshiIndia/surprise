"use client"

import { useState } from "react"
import { Heart, Mail } from "lucide-react"

interface EnvelopeRevealProps {
  onComplete: () => void
}

export default function EnvelopeReveal({ onComplete }: EnvelopeRevealProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showLetter, setShowLetter] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    setTimeout(() => setShowLetter(true), 800)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-xl text-muted-foreground mb-8 animate-pulse">
          {isOpen ? "A message from my heart..." : "Tap the envelope to open"}
        </p>

        {/* Envelope */}
        <div
          className={`relative mx-auto cursor-pointer transition-all duration-500 ${
            isOpen ? "scale-110" : "hover:scale-105"
          }`}
          onClick={!isOpen ? handleOpen : undefined}
        >
          {/* Envelope body */}
          <div
            className={`relative w-72 h-48 md:w-96 md:h-64 bg-gradient-to-br from-rose-100 to-pink-200 rounded-lg shadow-2xl transition-all duration-500 ${
              isOpen ? "shadow-[0_0_60px_rgba(232,74,111,0.4)]" : ""
            }`}
          >
            {/* Envelope flap */}
            <div
              className={`absolute -top-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-br from-rose-200 to-pink-300 transition-all duration-700 origin-bottom ${
                isOpen ? "rotate-x-180 -translate-y-full" : ""
              }`}
              style={{
                clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Heart seal */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500 ${
                isOpen ? "scale-0 opacity-0" : "scale-100"
              }`}
            >
              <div className="relative">
                <Heart className="h-16 w-16 fill-primary text-primary drop-shadow-lg animate-pulse" />
                <Mail className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-white" />
              </div>
            </div>

            {/* Letter inside */}
            {showLetter && (
              <div className="absolute inset-4 bg-white rounded-lg shadow-inner flex items-center justify-center animate-slide-up">
                <div className="text-center p-4">
                  <Heart className="h-12 w-12 mx-auto fill-primary text-primary mb-4" />
                  <p className="text-lg md:text-xl text-gray-700 italic">
                    " <b>I Love You,</b>
                    <br />
                    More than you can imagine."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {showLetter && (
          <button
            onClick={onComplete}
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(232,74,111,0.5)] animate-bounce-in"
          >
            Continue
            <Heart className="h-5 w-5 fill-current" />
          </button>
        )}
      </div>

      <style jsx>{`
        .rotate-x-180 {
          transform: rotateX(180deg);
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
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
