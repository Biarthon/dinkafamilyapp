"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, TreePine, ZoomIn, ZoomOut, User } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function FamilyTreeScreen() {
  const [userProfile, setUserProfile] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedPerson, setSelectedPerson] = useState(null)

  useEffect(() => {
    const profile = localStorage.getItem("userProfile")
    if (profile) {
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  // Mock family tree data
  const familyTreeData = {
    user: {
      id: "user",
      name: userProfile?.firstName || "You",
      generation: 0,
      gender: userProfile?.gender || "male",
      isUser: true,
    },
    ancestors: [
      // Generation -1 (Parents)
      {
        id: "father",
        name: userProfile?.fatherName || "Father",
        generation: -1,
        gender: "male",
        relationship: "Father",
        position: { x: -150, y: -120 },
      },
      {
        id: "mother",
        name: "Mother",
        generation: -1,
        gender: "female",
        relationship: "Mother",
        position: { x: 150, y: -120 },
      },
      // Generation -2 (Grandparents)
      {
        id: "paternal_grandfather",
        name: userProfile?.grandfatherName || "Grandfather",
        generation: -2,
        gender: "male",
        relationship: "Paternal Grandfather",
        position: { x: -250, y: -240 },
      },
      {
        id: "paternal_grandmother",
        name: "Grandmother",
        generation: -2,
        gender: "female",
        relationship: "Paternal Grandmother",
        position: { x: -50, y: -240 },
      },
      {
        id: "maternal_grandfather",
        name: "Grandfather",
        generation: -2,
        gender: "male",
        relationship: "Maternal Grandfather",
        position: { x: 50, y: -240 },
      },
      {
        id: "maternal_grandmother",
        name: "Grandmother",
        generation: -2,
        gender: "female",
        relationship: "Maternal Grandmother",
        position: { x: 250, y: -240 },
      },
      // Generation -3 (Great-Grandparents)
      {
        id: "great_grandfather",
        name: userProfile?.greatGrandfatherName || "Great-Grandfather",
        generation: -3,
        gender: "male",
        relationship: "Great-Grandfather",
        position: { x: -250, y: -360 },
      },
    ],
    relatives: [
      // Discovered relatives
      {
        id: "cousin1",
        name: "Deng Malual",
        generation: 0,
        gender: "male",
        relationship: "2nd Cousin",
        strength: 85,
        position: { x: -300, y: 0 },
        isDiscovered: true,
      },
      {
        id: "cousin2",
        name: "Nyandeng Rek",
        generation: 0,
        gender: "female",
        relationship: "3rd Cousin",
        strength: 72,
        position: { x: 300, y: 0 },
        isDiscovered: true,
      },
    ],
  }

  const allPeople = [familyTreeData.user, ...familyTreeData.ancestors, ...familyTreeData.relatives]

  const getPersonColor = (person) => {
    if (person.isUser) return "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-white"
    if (person.isDiscovered) return "bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-green-300"
    if (person.gender === "male") return "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 border-blue-300"
    return "bg-gradient-to-br from-pink-100 to-pink-200 text-pink-800 border-pink-300"
  }

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.2, 0.5))
  }

  const handlePersonClick = (person) => {
    setSelectedPerson(person)
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-slate-600">Loading family tree...</p>
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
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-20">
        <div className="max-w-full px-6 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => (window.location.href = "/dashboard")}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Button>
            <div className="flex items-center space-x-2">
              <TreePine className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-slate-900 text-lg">Family Tree</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
              >
                <ZoomOut className="w-5 h-5 text-slate-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
              >
                <ZoomIn className="w-5 h-5 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="relative overflow-auto h-[calc(100vh-160px)] pb-20">
        <div
          className="relative min-w-[800px] min-h-[600px] flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
        >
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Parent to User connections */}
            <line x1="350" y1="280" x2="250" y2="400" stroke="#3b82f6" strokeWidth="2" />
            <line x1="450" y1="280" x2="550" y2="400" stroke="#3b82f6" strokeWidth="2" />

            {/* Grandparent to Parent connections */}
            <line x1="150" y1="160" x2="250" y2="280" stroke="#64748b" strokeWidth="1.5" />
            <line x1="350" y1="160" x2="250" y2="280" stroke="#64748b" strokeWidth="1.5" />
            <line x1="450" y1="160" x2="550" y2="280" stroke="#64748b" strokeWidth="1.5" />
            <line x1="650" y1="160" x2="550" y2="280" stroke="#64748b" strokeWidth="1.5" />

            {/* Great-grandparent connections */}
            <line x1="150" y1="40" x2="150" y2="160" stroke="#94a3b8" strokeWidth="1" />
          </svg>

          {/* People Nodes */}
          {allPeople.map((person) => {
            const baseX = 400
            const baseY = 400
            const x = baseX + (person.position?.x || 0)
            const y = baseY + (person.position?.y || 0)

            return (
              <div
                key={person.id}
                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  left: x - 40,
                  top: y - 40,
                  zIndex: 10,
                }}
                onClick={() => handlePersonClick(person)}
              >
                <div
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg ${getPersonColor(person)}`}
                >
                  <div className="text-center">
                    <div className="text-xs font-semibold truncate px-1">{person.name.split(" ")[0]}</div>
                    {person.isDiscovered && <div className="text-xs opacity-75">{person.strength}%</div>}
                  </div>
                </div>

                {/* Generation Labels */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-600 text-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
                  {person.generation === 0 && "Current"}
                  {person.generation === -1 && "Parents"}
                  {person.generation === -2 && "Grandparents"}
                  {person.generation === -3 && "Great-GP"}
                </div>
              </div>
            )
          })}

          {/* User Node (Special styling) */}
          <div
            className="absolute cursor-pointer"
            style={{
              left: 360,
              top: 360,
              zIndex: 15,
            }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white shadow-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <User className="w-6 h-6 mx-auto mb-1" />
                <div className="text-xs font-bold">You</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-24 left-4 bg-white/90 backdrop-blur-lg rounded-2xl p-4 border border-slate-200/50 shadow-lg">
        <div className="text-xs font-semibold text-slate-700 mb-3">Legend</div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <span>You</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300"></div>
            <span>Male Relatives</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 border border-pink-300"></div>
            <span>Female Relatives</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-100 to-green-200 border border-green-300"></div>
            <span>Discovered</span>
          </div>
        </div>
      </div>

      {/* Person Details Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30 p-4">
          <Card className="w-full max-w-sm bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-3xl">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Avatar className="w-16 h-16 mx-auto mb-3 border-4 border-slate-200 shadow-lg">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-slate-100 text-slate-700 text-xl font-bold">
                    {selectedPerson.name
                      .split(" ")
                      .map((n) => n.charAt(0))
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-slate-900">{selectedPerson.name}</h3>
                <p className="text-blue-600 font-medium">{selectedPerson.relationship}</p>
              </div>

              {selectedPerson.isDiscovered && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Relationship Strength</span>
                    <span className="text-sm font-semibold">{selectedPerson.strength}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      style={{ width: `${selectedPerson.strength}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Generation:</span>
                  <span className="text-sm font-medium">
                    {selectedPerson.generation === 0 && "Current"}
                    {selectedPerson.generation === -1 && "Parents"}
                    {selectedPerson.generation === -2 && "Grandparents"}
                    {selectedPerson.generation === -3 && "Great-Grandparents"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Gender:</span>
                  <span className="text-sm font-medium capitalize">{selectedPerson.gender}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                  onClick={() => setSelectedPerson(null)}
                >
                  Close
                </Button>
                {selectedPerson.isDiscovered && (
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl">Connect</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}
