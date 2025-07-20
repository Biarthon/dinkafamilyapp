"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Camera, TreePine, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DeveloperCredit } from "@/components/developer_credit"

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    grandfatherName: "",
    greatGrandfatherName: "",
    gender: "",
    clan: "",
    subClan: "",
    dateOfBirth: "",
    profilePicture: null,
  })

  const [step, setStep] = useState(1)
  const totalSteps = 3

  const dinkaClans = ["Malual", "Rek", "Ngok", "Twic", "Bor", "Hol", "Nyarweng", "Aliab", "Ciec", "Luach"]

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      localStorage.setItem("userProfile", JSON.stringify(formData))
      window.location.href = "/dashboard"
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-purple-200/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-slate-200/30 rounded-full blur-2xl"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 mb-6 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Button>
        <div className="flex items-center space-x-2">
          <TreePine className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-slate-700">Register</span>
        </div>
        <div className="text-sm text-slate-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          {step}/{totalSteps}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 relative z-10">
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-1 mb-8">
          <div
            className="bg-blue-500 h-1 rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl rounded-3xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800">
              {step === 1 && "Personal Information"}
              {step === 2 && "Lineage Details"}
              {step === 3 && "Clan & Profile"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            {step === 1 && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-slate-700 font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Enter your first name"
                    className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="gender" className="text-slate-700 font-medium">
                    Gender *
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-0 shadow-xl">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="dateOfBirth" className="text-slate-700 font-medium">
                    Date of Birth (Optional)
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="fatherName" className="text-slate-700 font-medium">
                    Father's Name *
                  </Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="Enter your father's name"
                    className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="grandfatherName" className="text-slate-700 font-medium">
                    Grandfather's Name *
                  </Label>
                  <Input
                    id="grandfatherName"
                    value={formData.grandfatherName}
                    onChange={(e) => setFormData({ ...formData, grandfatherName: e.target.value })}
                    placeholder="Enter your grandfather's name"
                    className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="greatGrandfatherName" className="text-slate-700 font-medium">
                    Great-Grandfather's Name *
                  </Label>
                  <Input
                    id="greatGrandfatherName"
                    value={formData.greatGrandfatherName}
                    onChange={(e) => setFormData({ ...formData, greatGrandfatherName: e.target.value })}
                    placeholder="Enter your great-grandfather's name"
                    className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <Avatar className="w-24 h-24 border-4 border-slate-200 shadow-lg">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-slate-100 text-slate-600 text-2xl">
                      {formData.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 bg-white shadow-sm"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photo
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="clan" className="text-slate-700 font-medium">
                    Clan *
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, clan: value })}>
                    <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white">
                      <SelectValue placeholder="Select your clan" />
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

                <div className="space-y-3">
                  <Label htmlFor="subClan" className="text-slate-700 font-medium">
                    Sub-Clan (Optional)
                  </Label>
                  <Input
                    id="subClan"
                    value={formData.subClan}
                    onChange={(e) => setFormData({ ...formData, subClan: e.target.value })}
                    placeholder="Enter your sub-clan"
                    className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                  />
                </div>
              </>
            )}

            <Button
              onClick={handleNext}
              className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              disabled={
                (step === 1 && (!formData.firstName || !formData.gender)) ||
                (step === 2 && (!formData.fatherName || !formData.grandfatherName || !formData.greatGrandfatherName)) ||
                (step === 3 && !formData.clan)
              }
            >
              <span>{step === totalSteps ? "Complete Registration" : "Continue"}</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>

        <DeveloperCredit />
      </div>
    </div>
  )
}
