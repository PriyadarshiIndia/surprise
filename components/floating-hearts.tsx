"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface HeartParticle {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([])

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 24 + 12,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          <Heart className="fill-primary text-primary" style={{ width: heart.size, height: heart.size }} />
        </div>
      ))}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </div>
  )
}
