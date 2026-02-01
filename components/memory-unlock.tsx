"use client"

import { useState, useEffect } from "react"
import { Heart, Lock, Search } from "lucide-react"
import Image from "next/image"

interface MemoryUnlockProps {
  unlockedCount: number
  onUnlock: () => void
  onComplete: () => void
}

const memories = [
  {
    id: 1,
    src: "/image1.jpg",
    caption: "Our first sunset together",
    hint: "Tap the heart hiding in the corner",
    heartPosition: { top: "10%", right: "5%" },
  },
  {
    id: 2,
    src: "/image2.jpg",
    caption: "Our First Trip",
    hint: "Find the heart near the center",
    heartPosition: { bottom: "40%", left: "45%" },
  },
  {
    id: 3,
    src: "/image3.jpg",
    caption: "Our First Date",
    hint: "Look for love in the bottom",
    heartPosition: { bottom: "8%", left: "20%" },
  },
  {
    id: 4,
    src: "/image4.jpg",
    caption: "Our Memories",
    hint: "A hidden heart awaits",
    heartPosition: { top: "30%", right: "15%" },
  },
]

export default function MemoryUnlock({ unlockedCount, onUnlock, onComplete }: MemoryUnlockProps) {
  const [unlockedIds, setUnlockedIds] = useState<number[]>([])
  const [activeMemory, setActiveMemory] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)

  const isAllUnlocked = unlockedIds.length === memories.length

  const handleHeartFound = (id: number) => {
    if (!unlockedIds.includes(id)) {
      setUnlockedIds((prev) => [...prev, id])
      onUnlock()
    }
  }

  useEffect(() => {
    // Auto-show hint after 5 seconds
    const timer = setTimeout(() => setShowHint(true), 5000)
    return () => clearTimeout(timer)
  }, [activeMemory])

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Search className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Find the Hidden Hearts
            </span>
          </h2>
          <p className="text-muted-foreground mb-4">
            Each photo has a hidden heart. Find them all to unlock our memories!
          </p>
          <div className="flex justify-center gap-2">
            {memories.map((_, index) => (
              <Heart
                key={index}
                className={`h-6 w-6 transition-all duration-500 ${
                  index < unlockedIds.length ? "fill-primary text-primary scale-110" : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Memory grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {memories.map((memory) => {
            const isUnlocked = unlockedIds.includes(memory.id)
            const isActive = activeMemory === memory.id

            return (
              <div
                key={memory.id}
                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isActive ? "ring-4 ring-primary shadow-[0_0_30px_rgba(232,74,111,0.4)]" : ""
                }`}
                onClick={() => !isUnlocked && setActiveMemory(memory.id)}
              >
                {/* Image */}
                <Image
                  src={memory.src || "/placeholder.svg"}
                  alt={memory.caption}
                  fill
                  className={`object-cover transition-all duration-500 ${isUnlocked ? "" : "grayscale blur-sm"}`}
                />

                {/* Lock overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-white/70" />
                  </div>
                )}

                {/* Unlocked overlay */}
                {isUnlocked && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                    <p className="text-white text-sm font-medium">{memory.caption}</p>
                  </div>
                )}

                {/* Hidden heart - only show when active and not unlocked */}
                {isActive && !isUnlocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleHeartFound(memory.id)
                    }}
                    className="absolute animate-pulse hover:scale-150 transition-transform z-10"
                    style={memory.heartPosition}
                  >
                    <Heart className="h-6 w-6 fill-primary text-primary drop-shadow-[0_0_10px_rgba(232,74,111,0.8)]" />
                  </button>
                )}

                {/* Hint */}
                {isActive && !isUnlocked && showHint && (
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 rounded-lg p-2 text-center">
                    <p className="text-white text-xs">{memory.hint}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {isAllUnlocked && (
          <div className="text-center animate-bounce-in">
            <p className="text-xl text-primary mb-4">You found all the hidden hearts!</p>
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(232,74,111,0.5)]"
            >
              See the Final Surprise
              <Heart className="h-5 w-5 fill-current" />
            </button>
          </div>
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
