"use client"

import { useState, useEffect } from "react"
import { Heart, Sparkles } from "lucide-react"

export default function FinalSurprise() {
  const [stage, setStage] = useState(0)
  const [heartsExploded, setHeartsExploded] = useState(false)
  const [confettiHearts, setConfettiHearts] = useState<{ id: number; x: number; delay: number; duration: number }[]>([])

  useEffect(() => {
    // Stage progression
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 2500),
      setTimeout(() => {
        setStage(4)
        setHeartsExploded(true)
        // Generate confetti hearts
        const hearts = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 4,
        }))
        setConfettiHearts(hearts)
      }, 3500),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Confetti hearts */}
      {heartsExploded && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiHearts.map((heart) => (
            <Heart
              key={heart.id}
              className="absolute fill-primary text-primary animate-confetti"
              style={{
                left: `${heart.x}%`,
                top: "-20px",
                width: `${Math.random() * 20 + 15}px`,
                height: `${Math.random() * 20 + 15}px`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Radial glow background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${stage >= 4 ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "radial-gradient(circle at center, rgba(232,74,111,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Animated heart */}
        <div
          className={`mb-8 transition-all duration-1000 ${stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        >
          <div className="relative inline-block">
            <Heart
              className={`h-32 w-32 md:h-40 md:w-40 fill-primary text-primary drop-shadow-[0_0_60px_rgba(232,74,111,0.6)] ${
                stage >= 4 ? "animate-heartbeat" : ""
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl md:text-4xl font-bold text-white">∞</span>
            </div>
            {/* Orbiting sparkles */}
            {stage >= 3 && (
              <>
                <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-accent animate-spin-slow" />
                <Sparkles className="absolute -bottom-4 -left-4 h-6 w-6 text-accent animate-spin-slow-reverse" />
                <Sparkles className="absolute top-1/2 -right-8 h-5 w-5 text-accent animate-pulse" />
                <Sparkles className="absolute top-1/2 -left-8 h-5 w-5 text-accent animate-pulse" />
              </>
            )}
          </div>
        </div>

        {/* I Love You text */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-1000 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="bg-gradient-to-r from-primary via-pink-400 to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
            I Love You
          </span>
        </h1>

        {/* Message */}
        <p
          className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-1000 ${
            stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Today, tomorrow, and for all the days to come.
          <br />
          You are my everything, and I am blessed to have you in my life.
        </p>

        {/* Forever badge */}
        <div className={`transition-all duration-1000 ${stage >= 4 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div className="inline-flex items-center gap-3 rounded-full border-2 border-primary bg-card/50 px-8 py-4 backdrop-blur-sm animate-pulse-glow">
            <Heart className="h-6 w-6 fill-primary text-primary" />
            <span className="text-xl md:text-2xl font-bold">Forever & Always</span>
            <Heart className="h-6 w-6 fill-primary text-primary" />
          </div>
        </div>

        {/* Restart button */}
        <div className={`mt-12 transition-all duration-1000 ${stage >= 4 ? "opacity-100" : "opacity-0"}`}>
          <p className="text-muted-foreground mb-4">Made with all my love, just for you</p>
          <button onClick={() => window.location.reload()} className="text-primary hover:underline text-sm">
            Experience this journey again
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        :global(.animate-confetti) {
          animation: confetti linear forwards;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(232,74,111,0.3); }
          50% { box-shadow: 0 0 40px rgba(232,74,111,0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow 8s linear infinite reverse;
        }
      `}</style>
    </div>
  )
}
