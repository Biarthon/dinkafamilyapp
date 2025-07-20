"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Users, Upload, Camera } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ConnectScreen() {
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    clan: "",
    location: "",
    notes: "",
    photo: null,
  })

  const dinkaClans = ["Malual", "Rek", "Ngok", "Twic", "Bor", "Hol", "Nyarweng", "Aliab", "Ciec", "Luach"]
  const relationships = [
    "Father",
    "Mother",
    "Brother",
    "Sister",
    "Son",
    "Daughter",
    "Grandfather",
    "Grandmother",
    "Uncle",
    "Aunt",
    "Cousin",
    "2nd Cousin",
    "3rd Cousin",
    "Distant Relative",
    "Clan Member",
  ]

  const handleSubmit = () => {
    console.log("Adding new relative:", formData)
    // Handle form submission
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
        <div className="max-w-md mx-auto px-6 py-6">
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
              <Plus className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-slate-900 text-lg">Add Relative</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 pb-32 relative z-10">
        <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-slate-900">New Family Connection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Photo Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-4 border-slate-200">
                <Camera className="w-8 h-8 text-slate-400" />
              </div>
              <Button
                variant="outline"
                className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700 font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
              />
            </div>

            {/* Relationship */}
            <div className="space-y-2">
              <Label htmlFor="relationship" className="text-slate-700 font-medium">
                Relationship *
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, relationship: value })}>
                <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-0 shadow-xl">
                  {relationships.map((rel) => (
                    <SelectItem key={rel} value={rel.toLowerCase()}>
                      {rel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clan */}
            <div className="space-y-2">
              <Label htmlFor="clan" className="text-slate-700 font-medium">
                Clan
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, clan: value })}>
                <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white">
                  <SelectValue placeholder="Select clan" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-0 shadow-xl">
                  {dinkaClans.map((clan) => (
                    <SelectItem key={clan} value={clan.toLowerCase()}>
                      {clan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-slate-700 font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-slate-700 font-medium">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional information about this relative..."
                className="rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all resize-none"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              disabled={!formData.name || !formData.relationship}
            >
              Add to Family Network
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}
