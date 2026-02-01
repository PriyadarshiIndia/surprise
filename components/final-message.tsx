"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Sparkles } from "lucide-react"

export default function FinalMessage() {
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowConfetti(true), 1000)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Confetti hearts */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <Heart
              key={i}
              className="absolute animate-confetti fill-primary text-primary"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div
        className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <Sparkles className="h-12 w-12 text-accent animate-pulse" />
        </div>

        {/* Giant heart animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Heart
              className="h-32 w-32 md:h-40 md:w-40 fill-primary text-primary animate-heartbeat drop-shadow-[0_0_60px_rgba(232,74,111,0.5)]"
              strokeWidth={1}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-primary-foreground">∞</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-primary via-pink-400 to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
            I Love You
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
          Today, tomorrow, and for all the days to come. You are my everything, and I am blessed to have you in my life.
        </p>

        {/* Forever badge */}
        <div className="inline-flex items-center gap-3 rounded-full border-2 border-primary bg-card/50 px-8 py-4 backdrop-blur-sm animate-pulse-glow">
          <Heart className="h-6 w-6 fill-primary text-primary" />
          <span className="text-xl md:text-2xl font-bold">Forever & Always</span>
          <Heart className="h-6 w-6 fill-primary text-primary" />
        </div>

        {/* Footer */}
        <p className="mt-12 text-muted-foreground">Made with ❤️ just for you</p>
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
        .animate-confetti {
          animation: confetti linear forwards;
        }
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.15);
          }
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(232, 74, 111, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(232, 74, 111, 0.6);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
