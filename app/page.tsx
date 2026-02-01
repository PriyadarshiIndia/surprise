"use client"

import { useState } from "react"
import IntroScreen from "@/components/intro-screen"
import EnvelopeReveal from "@/components/envelope-reveal"
import PhotoPuzzle from "@/components/photo-puzzle"
import ScratchReveal from "@/components/scratch-reveal"
import LoveLetterTyping from "@/components/love-letter-typing"
import MemoryUnlock from "@/components/memory-unlock"
import FinalSurprise from "@/components/final-surprise"
import FloatingHearts from "@/components/floating-hearts"
import PinUnlock from "@/components/pin-unlock"
import Countdown from "@/components/countdown"

export default function AnniversaryPage() {
  const [stage, setStage] = useState(0)
  const [unlockedMemories, setUnlockedMemories] = useState(0)

  const nextStage = () => setStage((prev) => prev + 1)

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FloatingHearts />
      {/* Stage 0: Intro with click to start */}
      {stage === 0 && <Countdown onComplete={nextStage} />}

      {/* Stage 1: Intro with click to start */}
      {stage === 1 && <IntroScreen onStart={nextStage} />}

      {/* Stage 2: Envelope to open */}
      {stage === 2 && <EnvelopeReveal onComplete={nextStage} />}

      {/* Stage 3: Photo puzzle game */}
      {stage === 3 && <PhotoPuzzle onComplete={nextStage} />}

      {/* Stage 4: Scratch card reveal */}
      {stage === 4 && <ScratchReveal onComplete={nextStage} />}

      {/* Stage 5: Love letter with typing effect */}
      {stage === 5 && <LoveLetterTyping onComplete={nextStage} />}

      {/* Stage 6: Memory unlock - find hidden hearts */}
      {stage === 6 && (
        <MemoryUnlock
          unlockedCount={unlockedMemories}
          onUnlock={() => setUnlockedMemories((prev) => prev + 1)}
          onComplete={nextStage}
        />
      )}

      {/* Stage 7: PIN Unlock - Myntra Gift Card */}
      {stage === 7 && <PinUnlock onComplete={nextStage} />}

      {/* Stage 8: Final surprise */}
      {stage === 8 && <FinalSurprise />}
    </main>
  )
}
