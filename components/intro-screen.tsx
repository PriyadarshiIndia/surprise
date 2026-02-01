"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, MousePointerClick } from "lucide-react"

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [clickCount, setClickCount] = useState(0)
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    }
    setHearts((prev) => [...prev, newHeart])
    setClickCount((prev) => prev + 1)

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 1000)
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer" onClick={handleClick}>
      {/* Click-spawned hearts */}
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="fixed h-8 w-8 fill-primary text-primary animate-heart-pop pointer-events-none"
          style={{ left: heart.x - 16, top: heart.y - 16 }}
        />
      ))}

      {/* Main content */}
      <div className="text-center z-10 px-4">
        <div className="mb-8 animate-pulse">
          <Heart className="h-24 w-24 mx-auto fill-primary text-primary drop-shadow-[0_0_30px_rgba(232,74,111,0.5)]" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          <span className="bg-gradient-to-r from-primary via-pink-400 to-primary bg-clip-text text-transparent">
            I Have a Surprise For You
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 animate-fade-in-delay">
          Click anywhere to spread some love...
        </p>

        <div className="text-sm text-muted-foreground mb-4">
          Hearts created: <span className="text-primary font-bold">{clickCount}</span>
        </div>

        {showButton && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onStart()
            }}
            className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(232,74,111,0.5)] animate-bounce-in"
          >
            <MousePointerClick className="h-5 w-5" />
            Begin Our Journey
            <Heart className="h-5 w-5 fill-current group-hover:animate-ping" />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes heart-pop {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(15deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(-15deg) translateY(-100px);
            opacity: 0;
          }
        }
        :global(.animate-heart-pop) {
          animation: heart-pop 1s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s forwards;
          opacity: 0;
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
