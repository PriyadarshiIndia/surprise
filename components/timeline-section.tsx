"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Star, Calendar } from "lucide-react"

const milestones = [
  {
    date: "The Day We Met",
    title: "Our Story Began",
    description:
      "The moment our eyes met, everything changed. Little did we know this was the beginning of something beautiful.",
    icon: Star,
  },
  {
    date: "First Date",
    title: "Butterflies & Smiles",
    description: "Nervous laughter, endless conversations, and the realization that we had found something special.",
    icon: Heart,
  },
  {
    date: "First 'I Love You'",
    title: "Three Magic Words",
    description: "The moment we confessed our love, sealing our hearts together forever.",
    icon: Heart,
  },
  {
    date: "Today",
    title: "Celebrating Us",
    description: "Another year of love, growth, and countless beautiful moments. Here&#39;s to forever.",
    icon: Calendar,
  },
]

export default function TimelineSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate milestones one by one
          milestones.forEach((_, index) => {
            setTimeout(() => setActiveIndex(index), index * 400)
          })
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative px-4 py-20 md:py-32 bg-gradient-to-b from-transparent via-secondary/5 to-transparent"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">Our Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground">Every chapter of our story is a treasure</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-pink-400 to-primary" />

          {milestones.map((milestone, index) => {
            const Icon = milestone.icon
            const isLeft = index % 2 === 0
            const isActive = index <= activeIndex

            return (
              <div
                key={index}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                  <div
                    className={`transition-all duration-700 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <span className="text-sm text-primary font-semibold uppercase tracking-wider">
                      {milestone.date}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-3">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Icon bubble */}
                <div
                  className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 transition-all duration-500 ${
                    isActive ? "scale-100" : "scale-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-[0_0_20px_rgba(232,74,111,0.5)]">
                    <Icon className="h-4 w-4 text-primary-foreground" />
                    {/* Pulse effect */}
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
