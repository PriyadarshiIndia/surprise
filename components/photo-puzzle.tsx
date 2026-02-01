"use client"

import { useState, useEffect } from "react"
import { Heart, Shuffle, Check } from "lucide-react"

interface PhotoPuzzleProps {
  onComplete: () => void
}

const correctOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export default function PhotoPuzzle({ onComplete }: PhotoPuzzleProps) {
  const [tiles, setTiles] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Shuffle tiles on mount
    const shuffled = [...correctOrder].sort(() => Math.random() - 0.5)
    setTiles(shuffled)
  }, [])

  useEffect(() => {
    // Check if puzzle is complete
    if (tiles.length > 0 && tiles.every((tile, index) => tile === correctOrder[index])) {
      setIsComplete(true)
    }
  }, [tiles])

  const handleTileClick = (index: number) => {
    if (isComplete) return

    if (selected === null) {
      setSelected(index)
    } else {
      // Swap tiles
      const newTiles = [...tiles]
      const temp = newTiles[selected]
      newTiles[selected] = newTiles[index]
      newTiles[index] = temp
      setTiles(newTiles)
      setSelected(null)
      setMoves((prev) => prev + 1)
    }
  }

  const shuffleTiles = () => {
    setTiles([...correctOrder].sort(() => Math.random() - 0.5))
    setSelected(null)
    setMoves(0)
    setIsComplete(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-lg w-full">
        <div className="mb-6">
          <Heart className="h-12 w-12 mx-auto fill-primary text-primary mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Piece Together Our Memory
            </span>
          </h2>
          <p className="text-muted-foreground">
            {isComplete ? "Beautiful! You completed it!" : "Tap two tiles to swap them"}
          </p>
        </div>

        {/* Puzzle grid */}
        <div className="relative mx-auto w-full max-w-[300px] md:max-w-[360px] aspect-square mb-6">
          <div className="grid grid-cols-3 gap-1 w-full h-full">
            {tiles.map((tile, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(index)}
                className={`relative aspect-square cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                  selected === index
                    ? "ring-4 ring-primary scale-95 shadow-[0_0_20px_rgba(232,74,111,0.5)]"
                    : "hover:scale-95"
                } ${isComplete ? "pointer-events-none" : ""}`}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(/puzzle_image.png?height=360&width=360&query=romantic+couple+photo+together+happy)`,
                    backgroundSize: "300% 300%",
                    backgroundPosition: `${(tile % 3) * 50}% ${Math.floor(tile / 3) * 50}%`,
                  }}
                />
                {isComplete && <div className="absolute inset-0 bg-primary/20 animate-pulse" />}
              </div>
            ))}
          </div>

          {/* Completion overlay */}
          {isComplete && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg animate-fade-in">
              <div className="bg-card/90 backdrop-blur-sm rounded-full p-4">
                <Check className="h-12 w-12 text-green-500" />
              </div>
            </div>
          )}
        </div>

        {/* Stats and controls */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-card/50 rounded-full px-4 py-2">
            <span className="text-muted-foreground">Moves: </span>
            <span className="text-primary font-bold">{moves}</span>
          </div>
          <button
            onClick={shuffleTiles}
            className="flex items-center gap-2 bg-card/50 rounded-full px-4 py-2 hover:bg-card transition-colors"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle
          </button>
        </div>

        {isComplete && (
          <button
            onClick={onComplete}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(232,74,111,0.5)] animate-bounce-in"
          >
            See Your Surprise
            <Heart className="h-5 w-5 fill-current" />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
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
