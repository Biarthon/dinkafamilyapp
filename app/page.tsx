"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, TreePine, Users, Heart } from "lucide-react"
import { DeveloperCredit } from "@/components/developer-credit"

const onboardingData = [
  {
    id: 1,
    title: "Discover Your Roots",
    subtitle: "Connect with your Dinka heritage and find family members through our advanced lineage matching system.",
    bgColor: "from-slate-100 to-blue-50",
    circleColor: "bg-gradient-to-br from-blue-100 to-purple-100",
  },
  {
    id: 2,
    title: "Build Family Connections",
    subtitle: "Visualize your family tree and discover relatives you never knew existed within the Dinka community.",
    bgColor: "from-blue-50 to-purple-50",
    circleColor: "bg-gradient-to-br from-purple-100 to-pink-100",
  },
  {
    id: 3,
    title: "Preserve Cultural Heritage",
    subtitle: "Keep Dinka traditions alive by documenting your lineage and connecting with your clan network.",
    bgColor: "from-purple-50 to-slate-100",
    circleColor: "bg-gradient-to-br from-slate-100 to-blue-100",
  },
]

export default function OnboardingScreen() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const handleNext = () => {
    if (currentScreen < onboardingData.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      window.location.href = "/register"
    }
  }

  const currentData = onboardingData[currentScreen]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentData.bgColor} relative overflow-hidden`}>
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-purple-200/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-slate-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-60 right-10 w-20 h-20 bg-blue-300/30 rounded-full blur-lg"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20 relative z-10">
        {/* Decorative Elements */}
        <div className="absolute top-32 left-8">
          <TreePine className="w-6 h-6 text-blue-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-12">
          <Users className="w-5 h-5 text-slate-400 opacity-60" />
        </div>
        <div className="absolute top-60 left-16">
          <Heart className="w-4 h-4 text-purple-400 opacity-60" />
        </div>
        <div className="absolute top-80 right-8">
          <div className="w-3 h-3 bg-slate-300 rounded-full opacity-60"></div>
        </div>

        {/* Central Image */}
        <div
          className={`w-80 h-80 ${currentData.circleColor} rounded-full flex items-center justify-center mb-12 shadow-2xl relative`}
        >
          <div className="w-64 h-64 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner">
            <TreePine className="w-32 h-32 text-slate-600" />
          </div>
          {/* Floating elements around circle */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/20 rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-400/20 rounded-full"></div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-4 leading-tight max-w-sm">
          {currentData.title}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-center text-lg leading-relaxed mb-12 max-w-sm">{currentData.subtitle}</p>

        {/* Navigation Dots */}
        <div className="flex space-x-3 mb-16">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentScreen ? "bg-blue-500 w-8" : "bg-slate-300 w-2"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-105"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      <DeveloperCredit />
    </div>
  )
}
