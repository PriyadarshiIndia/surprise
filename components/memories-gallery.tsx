"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Camera } from "lucide-react"
import Image from "next/image"

const memories = [
  {
    id: 1,
    src: "/romantic-couple-sunset-beach-silhouette.jpg",
    caption: "Our first sunset together",
    date: "The day it all began",
  },
  {
    id: 2,
    src: "/couple-laughing-coffee-shop-date.jpg",
    caption: "Endless conversations",
    date: "Every moment with you",
  },
  {
    id: 3,
    src: "/couple-holding-hands-walking-park-autumn.jpg",
    caption: "Walking through life together",
    date: "Hand in hand, always",
  },
  {
    id: 4,
    src: "/romantic-dinner-candlelight-couple.jpg",
    caption: "Special celebrations",
    date: "Making memories",
  },
  {
    id: 5,
    src: "/couple-dancing-under-stars-night.jpg",
    caption: "Dancing under the stars",
    date: "Our magical nights",
  },
  {
    id: 6,
    src: "/couple-hugging-cozy-home-fireplace.jpg",
    caption: "Home is wherever you are",
    date: "My safe place",
  },
]

export default function MemoriesGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative px-4 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Camera className="h-6 w-6 text-primary" />
            <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase">Our Memories</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Moments We Treasure
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
            Every photograph tells a story of our love. Replace these with your own cherished memories.
          </p>
        </div>

        {/* Photo gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredId(memory.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={memory.src || "/placeholder.svg"}
                  alt={memory.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                    hoveredId === memory.id ? "opacity-100" : "opacity-0"
                  }`}
                />
                {/* Content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                    hoveredId === memory.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-xs text-primary uppercase tracking-wider">{memory.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{memory.caption}</h3>
                </div>
              </div>
              {/* Border glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                  hoveredId === memory.id
                    ? "border-primary shadow-[0_0_30px_rgba(244,63,94,0.3)]"
                    : "border-transparent"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
