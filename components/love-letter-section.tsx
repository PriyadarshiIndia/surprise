"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Pen } from "lucide-react"

export default function LoveLetterSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div
        className={`relative max-w-3xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        {/* Love letter card */}
        <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/20 shadow-[0_0_60px_rgba(232,74,111,0.1)]">
          {/* Decorative corner hearts */}
          <Heart className="absolute -top-3 -left-3 h-6 w-6 fill-primary text-primary" />
          <Heart className="absolute -top-3 -right-3 h-6 w-6 fill-primary text-primary" />
          <Heart className="absolute -bottom-3 -left-3 h-6 w-6 fill-primary text-primary" />
          <Heart className="absolute -bottom-3 -right-3 h-6 w-6 fill-primary text-primary" />

          {/* Header */}
          <div className="flex items-center gap-3 mb-8 border-b border-primary/20 pb-6">
            <Pen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl italic">A Letter For You</h2>
          </div>

          {/* Letter content - CUSTOMIZE YOUR MESSAGE HERE */}
          <div className="space-y-6 italic text-lg md:text-xl leading-relaxed text-foreground/90">
            <p className="animate-text-reveal" style={{ animationDelay: "0.2s" }}>
              My Dearest Love,
            </p>
            <p className="animate-text-reveal text-muted-foreground" style={{ animationDelay: "0.4s" }}>
              Every moment with you feels like a beautiful dream I never want to wake up from. From the first time our
              eyes met, I knew my life would never be the same.
            </p>
            <p className="animate-text-reveal text-muted-foreground" style={{ animationDelay: "0.6s" }}>
              You are my sunshine on cloudy days, my comfort in times of trouble, and my greatest adventure. Your smile
              lights up my world, and your love makes every day worth living.
            </p>
            <p className="animate-text-reveal text-muted-foreground" style={{ animationDelay: "0.8s" }}>
              Thank you for choosing me, for loving me unconditionally, and for being my partner in this beautiful
              journey called life. Here&#39;s to many more years of laughter, love, and unforgettable memories together.
            </p>
            <p className="animate-text-reveal pt-4" style={{ animationDelay: "1s" }}>
              Forever Yours,
              <br />
              <span className="text-primary font-bold">With All My Love ❤️</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes text-reveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-text-reveal {
          opacity: 0;
          animation: text-reveal 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
