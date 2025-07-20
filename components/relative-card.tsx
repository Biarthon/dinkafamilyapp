"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface RelativeCardProps {
  id: string
  name: string
  relationship: string
  sharedAncestor: string
  strength: number
  clan: string
  isNew?: boolean
  avatar?: string
  onConnect: (id: string) => void
}

export function RelativeCard({
  id,
  name,
  relationship,
  sharedAncestor,
  strength,
  clan,
  isNew = false,
  avatar,
  onConnect,
}: RelativeCardProps) {
  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return "bg-green-500"
    if (strength >= 60) return "bg-blue-500"
    if (strength >= 40) return "bg-yellow-500"
    return "bg-slate-400"
  }

  const getStrengthText = (strength: number) => {
    if (strength >= 80) return "Very Strong"
    if (strength >= 60) return "Strong"
    if (strength >= 40) return "Moderate"
    return "Weak"
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex">
          {/* Left side - Avatar/Image */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-3xl m-4">
            <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
              <AvatarImage src={avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-slate-100 text-slate-600 text-xl font-bold">
                {name
                  .split(" ")
                  .map((n) => n.charAt(0))
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 p-4 pl-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{name}</h3>
                <p className="text-sm text-slate-600 mt-1">
                  {relationship} | {sharedAncestor}
                </p>
              </div>
              {isNew && <Badge className="bg-green-100 text-green-700 text-xs rounded-full px-2 py-1 ml-2">New</Badge>}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-600">{getStrengthText(strength)}</span>
                <span className="text-xs font-semibold text-slate-700">{strength}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getStrengthColor(strength)}`}
                  style={{ width: `${strength}%` }}
                />
              </div>
            </div>

            {/* Connect Button */}
            <Button
              onClick={() => onConnect(id)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold transition-all duration-300 hover:shadow-md"
              variant="ghost"
            >
              Connect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
