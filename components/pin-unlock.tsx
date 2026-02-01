'use client'

import { useState } from 'react'
import { Gift, X } from 'lucide-react'

interface PinUnlockProps {
  onComplete: () => void
}

export default function PinUnlock({ onComplete }: PinUnlockProps) {
  const [pin, setPin] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [showHintModal, setShowHintModal] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const CORRECT_PIN = '2024'
  const MAX_ATTEMPTS = 3

  const handlePinInput = (digit: string) => {
    if (pin.length < 4 && !unlocked) {
      setPin(pin + digit)
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
  }

  const handleSubmit = () => {
    if (pin.length !== 4) return

    if (pin === CORRECT_PIN) {
      setUnlocked(true)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setPin('')

      if (newAttempts >= MAX_ATTEMPTS) {
        setShowHintModal(true)
      }
    }
  }

  const handleHintAccept = () => {
    setShowHint(true)
    setShowHintModal(false)
  }

  if (unlocked) {
    return (
      <div className="w-full flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center shadow-2xl animate-bounce">
              <Gift className="h-12 w-12 text-white fill-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-pink-400 to-primary bg-clip-text text-transparent">
            Gift Unlocked!
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Your Myntra Gift Card has been unlocked!
          </p>

          <div className="bg-gradient-to-br from-primary/20 to-pink-400/20 rounded-2xl p-8 mb-8 border-2 border-primary">
            <p className="text-sm text-muted-foreground mb-2">Gift Card Code:</p>
            <p className="text-2xl md:text-3xl font-bold text-primary font-mono tracking-wider">
              6001220312242946 <br /> PIN : 254962
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Use this code on Myntra to buy your favorite items!
            </p>
          </div>

          <button
            onClick={onComplete}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(232,74,111,0.5)]"
          >
            Continue to Final Surprise
            <Gift className="h-5 w-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Unlock Your Gift</h2>
        <p className="text-muted-foreground mb-8">Enter a 4-digit PIN to unlock your Myntra Gift Card</p>

        {/* PIN Display */}
        <div className="mb-8 flex justify-center gap-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-14 h-14 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-center text-2xl font-bold text-primary transition-all"
            >
              {pin[index] ? '●' : ''}
            </div>
          ))}
        </div>

        {/* Hint Display */}
        {showHint && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/20 to-pink-400/20 rounded-lg border border-primary/50">
            <p className="text-sm text-muted-foreground italic">
              Hint: Think of the year we met
            </p>
          </div>
        )}

        {/* Attempt Counter */}
        {attempts > 0 && (
          <p className="text-sm text-muted-foreground mb-6">
            Attempts remaining: {MAX_ATTEMPTS - attempts}
          </p>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handlePinInput(String(num))}
              className="py-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-semibold transition-all text-lg"
              disabled={unlocked || pin.length >= 4}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handlePinInput('0')}
            className="col-span-3 py-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-semibold transition-all text-lg"
            disabled={unlocked || pin.length >= 4}
          >
            0
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleBackspace}
            className="flex-1 py-3 rounded-lg border-2 border-primary text-primary font-semibold transition-all hover:scale-105"
          >
            Backspace
          </button>
          <button
            onClick={handleSubmit}
            disabled={pin.length !== 4}
            className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:scale-105 disabled:opacity-50"
          >
            Submit
          </button>
        </div>

        {/* Hint Modal */}
        {showHintModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
            <div className="bg-background border-2 border-primary rounded-2xl p-8 max-w-sm mx-auto shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-primary">Need a Hint?</h3>
                <button
                  onClick={() => setShowHintModal(false)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-lg text-muted-foreground mb-8 italic">
                If you want a hint, you owe me 5 kisses
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowHintModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold transition-all hover:scale-105"
                >
                  Not Yet
                </button>
                <button
                  onClick={handleHintAccept}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:scale-105"
                >
                  Deal!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
