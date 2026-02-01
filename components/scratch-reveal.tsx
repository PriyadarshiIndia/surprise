"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Heart, Sparkles } from "lucide-react"

interface ScratchRevealProps {
  onComplete: () => void
}

export default function ScratchReveal({ onComplete }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [revealPercentage, setRevealPercentage] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Fill with scratch overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#e84a6f")
    gradient.addColorStop(0.5, "#ec4899")
    gradient.addColorStop(1, "#f472b6")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add shimmer pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.beginPath()
      ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add text hint
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.font = "bold 20px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Scratch to reveal", canvas.width / 2, canvas.height / 2)
  }, [])

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
    ctx.fill()

    // Calculate reveal percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let transparent = 0
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++
    }
    const percentage = (transparent / (imageData.data.length / 4)) * 100
    setRevealPercentage(Math.round(percentage))

    if (percentage > 60 && !isRevealed) {
      setIsRevealed(true)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    scratch(e.clientX - rect.left, e.clientY - rect.top)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const touch = e.touches[0]
    scratch(touch.clientX - rect.left, touch.clientY - rect.top)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <Sparkles className="h-12 w-12 mx-auto text-accent mb-4 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Scratch to Reveal a Secret
            </span>
          </h2>
          <p className="text-muted-foreground">{isRevealed ? "You found it!" : `Revealed: ${revealPercentage}%`}</p>
        </div>

        {/* Scratch card */}
        <div className="relative mx-auto w-full max-w-[320px] md:max-w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          {/* Hidden content underneath */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-100 flex flex-col items-center justify-center p-6">
            <Heart className="h-16 w-16 fill-primary text-primary mb-4 animate-pulse" />
            <p className="text-2xl md:text-3xl font-bold text-gray-800 text-center">I have always loved you more!!</p>
            <p className="text-muted-foreground mt-2">Every. Single. Day.</p>
          </div>

          {/* Scratchable overlay */}
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDrawing(true)}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={handleTouchMove}
          />
        </div>

        {isRevealed && (
          <button
            onClick={onComplete}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(232,74,111,0.5)] animate-bounce-in"
          >
            Continue the Journey
            <Heart className="h-5 w-5 fill-current" />
          </button>
        )}
      </div>

      <style jsx>{`
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
