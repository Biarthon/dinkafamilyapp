"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart, ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { RelativeCard } from "@/components/relative-card"

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState(null)
  const [activeFilter, setActiveFilter] = useState("recent")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const profile = localStorage.getItem("userProfile")
    if (profile) {
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  // Mock data for closest relatives
  const closestRelatives = [
    {
      id: "1",
      name: "Deng Malual Akol",
      relationship: "2nd Cousin",
      sharedAncestor: "Same Great-Grandfather",
      strength: 85,
      clan: "Malual",
      isNew: true,
      avatar: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Nyandeng Rek Garang",
      relationship: "3rd Cousin",
      sharedAncestor: "Same Ancestor",
      strength: 72,
      clan: "Rek",
      isNew: false,
      avatar: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Akol Bor Deng",
      relationship: "Distant Relative",
      sharedAncestor: "Shared Lineage",
      strength: 45,
      clan: "Bor",
      isNew: true,
      avatar: "/placeholder.svg",
    },
    {
      id: "4",
      name: "Ayen Twic Malual",
      relationship: "Clan Sister",
      sharedAncestor: "Same Grandfather",
      strength: 92,
      clan: "Malual",
      isNew: false,
      avatar: "/placeholder.svg",
    },
  ]

  const filterOptions = [
    { id: "recent", label: "Recent", count: 18 },
    { id: "strongest", label: "Strongest Match", count: null },
    { id: "clan", label: "Same Clan", count: null },
  ]

  const handleConnect = (relativeId: string) => {
    console.log("Connecting with relative:", relativeId)
    // Handle connection logic here
  }

  const filteredRelatives = closestRelatives.filter((relative) => {
    if (activeFilter === "recent") return relative.isNew
    if (activeFilter === "strongest") return relative.strength >= 80
    if (activeFilter === "clan") return relative.clan === userProfile?.clan
    return true
  })

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-slate-600">Loading your family network...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-16 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-slate-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 relative z-10">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Button>
            <h1 className="text-xl font-bold text-slate-900">Closest Relatives</h1>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200">
              <ShoppingCart className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 pb-32 relative z-10">
        {/* Main Title */}
        <div className="py-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Closest Relatives</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-3 mb-6">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant={activeFilter === option.id ? "default" : "ghost"}
              onClick={() => setActiveFilter(option.id)}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeFilter === option.id
                  ? "bg-slate-900 text-white shadow-lg hover:bg-slate-800"
                  : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200"
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{option.label}</span>
                {option.count && (
                  <span className="bg-slate-600 text-white text-xs rounded-full px-2 py-0.5 ml-2">{option.count}</span>
                )}
              </span>
            </Button>
          ))}
        </div>

        {/* Relatives List */}
        <div className="space-y-4">
          {filteredRelatives.map((relative) => (
            <RelativeCard
              key={relative.id}
              id={relative.id}
              name={relative.name}
              relationship={relative.relationship}
              sharedAncestor={relative.sharedAncestor}
              strength={relative.strength}
              clan={relative.clan}
              isNew={relative.isNew}
              avatar={relative.avatar}
              onConnect={handleConnect}
            />
          ))}
        </div>

        {filteredRelatives.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No relatives found</h3>
            <p className="text-slate-500">Try adjusting your filter or check back later for new connections.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
