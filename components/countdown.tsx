'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface CountDownProps {
  onComplete?: () => void;
}

export default function CountDown({ onComplete }: CountDownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isAnniversary, setIsAnniversary] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);

  useEffect(() => {
    // Set initial countdown to 3 seconds
    setTimeLeft({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 3,
    });

    const calculateTimeLeft = () => {
      const targetTime = Date.now() + 3000; // 3 seconds from now
      const timer = setInterval(() => {
        const now = Date.now();
        const difference = targetTime - now;

        if (difference <= 0) {
          setIsAnniversary(true);
          setTimeLeft(null);
          clearInterval(timer);
          // Trigger fireworks
          createFireworks();
        } else {
          const seconds = Math.ceil(difference / 1000);
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: seconds,
          });
        }
      }, 100); // Update every 100ms for smooth countdown

      return () => clearInterval(timer);
    };

    const cleanup = calculateTimeLeft();
    return cleanup;
  }, []);

  const createFireworks = () => {
    const colors = ['#ec4899', '#f43f5e', '#fb7185', '#fca5a5', '#fecdd3', '#fff1f2'];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: particleId + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setParticles((prev) => [...prev, ...newParticles]);
    setParticleId((prev) => prev + 60);
    
    // Clear particles after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => p.id < particleId));
    }, 2000);
  };

  // Continuous fireworks when anniversary
  useEffect(() => {
    if (isAnniversary) {
      const interval = setInterval(() => {
        createFireworks();
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [isAnniversary, particleId]);

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,63,94,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(167,139,250,0.1),transparent_40%)]" />
      </div>

      {/* Fireworks particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-firework pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            boxShadow: `0 0 20px ${particle.color}, 0 0 40px ${particle.color}`,
          }}
        />
      ))}

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {!isAnniversary ? (
          <>
            <div className="mb-16 animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent mb-6 animate-gradient drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                Countdown
              </h1>
              <p className="text-xl md:text-2xl text-pink-200/80 font-light tracking-wide">
                to Our Special Day
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            {timeLeft && (
              <div className="flex justify-center gap-3 md:gap-6 mb-16 flex-wrap">
                <div className="relative group animate-scale-in">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 rounded-2xl px-12 md:px-16 py-10 md:py-14 backdrop-blur-xl border-2 border-pink-500/40 group-hover:border-pink-400/80 transition-all duration-500 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
                    <div className="text-7xl md:text-8xl font-black text-transparent bg-gradient-to-br from-pink-300 via-pink-400 to-rose-500 bg-clip-text drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-pink-300/90 text-base md:text-lg mt-4 uppercase tracking-[0.3em] font-bold">
                      Seconds
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              <p className="text-lg md:text-xl text-pink-300/70 font-light animate-pulse-slow tracking-wide">
                Something magical is coming soon...
              </p>
            </div>
          </>
        ) : (
          <div className="animate-celebration space-y-8">
            <div className="relative">
              <h1 className="text-6xl md:text-9xl font-black text-transparent bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 bg-clip-text animate-gradient drop-shadow-[0_0_50px_rgba(236,72,153,0.8)]">
                Happy Aniversary Baby
              </h1>
              {/* Sparkle effects around text */}
              <div className="absolute -top-4 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-twinkle" style={{ animationDelay: '0s' }} />
              <div className="absolute -top-2 right-1/4 w-2 h-2 bg-rose-300 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-2 left-1/3 w-2 h-2 bg-pink-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
            </div>
            
            <p className="text-2xl md:text-4xl text-pink-200/90 font-light drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] tracking-wide">
              Today is our special day
            </p>
            
            {/* Navigation button */}
            {onComplete && (
              <button
                onClick={onComplete}
                className="mt-16 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 px-10 py-5 text-xl font-bold text-white transition-all hover:scale-110 hover:shadow-[0_0_60px_rgba(236,72,153,0.8)] animate-bounce-in shadow-[0_0_40px_rgba(236,72,153,0.5)]"
              >
                Continue
                <Heart className="h-6 w-6 fill-current animate-pulse" />
              </button>
            )}
          </div>
        )}
        
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-25px) translateX(10px) rotate(3deg);
          }
          50% {
            transform: translateY(-35px) translateX(0px) rotate(0deg);
          }
          75% {
            transform: translateY(-25px) translateX(-10px) rotate(-3deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes celebration {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.05) rotate(1deg);
          }
          50% {
            transform: scale(1.1) rotate(-1deg);
          }
          75% {
            transform: scale(1.05) rotate(1deg);
          }
        }

        .animate-celebration {
          animation: celebration 2s ease-in-out infinite;
        }

        @keyframes firework {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc((random() - 0.5) * 300px),
              calc((random() - 0.5) * 300px)
            ) scale(0);
            opacity: 0;
          }
        }

        .animate-firework {
          animation: firework 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        @keyframes bounce-in {
          0% { 
            transform: scale(0); 
            opacity: 0; 
          }
          50% { 
            transform: scale(1.15); 
          }
          70% {
            transform: scale(0.95);
          }
          100% { 
            transform: scale(1); 
            opacity: 1; 
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 1.5s;
          opacity: 0;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}