"use client"

import { Github } from "lucide-react"

interface WatermarkProps {
  text?: string
  opacity?: number
  sizeClass?: string
}

export function Watermark({ 
  text = "amCtrld", 
  opacity = 40, 
  sizeClass = "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl" 
}: WatermarkProps) {
  // Check environment variable to toggle visibility
  const showWatermark = process.env.NEXT_PUBLIC_SHOW_WATERMARK === "true"
  
  if (!showWatermark) {
    return null
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-50"
      style={{ 
        opacity: opacity / 100 
      }}
    >
      <div 
        className={`
          ${sizeClass} 
          font-bold 
          text-gray-800 
          dark:text-gray-200 
          transform 
          -rotate-12 
          whitespace-nowrap 
          flex 
          items-center 
          gap-2
        `}
      >
        <div className="p-2 border-2 border-teal-500 rounded-full">
            <Github className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16" />
        </div>
        {text}
      </div>
    </div>
  )
}