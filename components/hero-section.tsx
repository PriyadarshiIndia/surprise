"use client"

import { useEffect, useState } from "react"
import { Heart, Sparkles } from "lucide-react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [heartBeat, setHeartBeat] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setHeartBeat((prev) => !prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20">
      {/* Animated background rings */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/10 animate-pulse-ring"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 text-center transition-all duration-[2000ms] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Animated heart */}
        <div className="mb-8 flex justify-center">
          <div className={`relative transition-transform duration-300 ${heartBeat ? "scale-110" : "scale-100"}`}>
            <Heart
              className="h-24 w-24 fill-primary text-primary drop-shadow-[0_0_30px_rgba(232,74,111,0.5)]"
              strokeWidth={1.5}
            />
            <Sparkles className="absolute -right-2 -top-2 h-8 w-8 text-accent animate-spin-slow" />
            <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-accent animate-spin-slow-reverse" />
          </div>
        </div>

        {/* Anniversary text */}
        <div className="space-y-4">
          <p className="text-lg tracking-[0.3em] text-muted-foreground uppercase animate-fade-in-up">
            Celebrating Our Love
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-in-up animation-delay-200">
            <span className="bg-gradient-to-r from-primary via-pink-400 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              Happy Anniversary
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground animate-fade-in-up animation-delay-400 italic">
            My Love ❤️
          </p>
        </div>

        {/* Date badge */}
        <div className="mt-12 animate-fade-in-up animation-delay-600">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-card/50 px-6 py-3 backdrop-blur-sm">
            <Heart className="h-5 w-5 fill-primary text-primary" />
            <span className="text-lg">January 16th, 2024 — Forever & Always</span>
            <Heart className="h-5 w-5 fill-primary text-primary" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore our journey</span>
          <div className="h-8 w-5 rounded-full border-2 border-primary/50 p-1">
            <div className="h-2 w-1 rounded-full bg-primary animate-scroll-dot mx-auto" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.05);
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 4s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
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
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow 8s linear infinite reverse;
        }
        @keyframes scroll-dot {
          0%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.3;
          }
        }
        .animate-scroll-dot {
          animation: scroll-dot 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
