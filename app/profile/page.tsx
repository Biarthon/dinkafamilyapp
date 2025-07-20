"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, User, Edit, Shield, Bell, Globe, Eye, Camera, Save, TreePine, Users, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({})
  const [privacySettings, setPrivacySettings] = useState({
    showLineage: true,
    allowNotifications: true,
    showLocation: true,
    allowConnections: true,
    showInClanDirectory: true,
  })

  useEffect(() => {
    const profile = localStorage.getItem("userProfile")
    if (profile) {
      const parsedProfile = JSON.parse(profile)
      setUserProfile(parsedProfile)
      setEditedProfile(parsedProfile)
    }

    // Load privacy settings
    const savedPrivacy = localStorage.getItem("privacySettings")
    if (savedPrivacy) {
      setPrivacySettings(JSON.parse(savedPrivacy))
    }
  }, [])

  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(editedProfile))
    setUserProfile(editedProfile)
    setIsEditing(false)
  }

  const handlePrivacyChange = (setting, value) => {
    const newSettings = { ...privacySettings, [setting]: value }
    setPrivacySettings(newSettings)
    localStorage.setItem("privacySettings", JSON.stringify(newSettings))
  }

  const dinkaClans = ["Malual", "Rek", "Ngok", "Twic", "Bor", "Hol", "Nyarweng", "Aliab", "Ciec", "Luach"]

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-slate-600">Loading profile...</p>
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
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-10">
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
              <User className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-slate-900 text-lg">Profile & Settings</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <Edit className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 pb-32 relative z-10">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 rounded-2xl p-1">
            <TabsTrigger
              value="profile"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
            >
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-slate-200 shadow-lg">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-slate-100 text-slate-700 text-2xl font-bold">
                        {userProfile.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-slate-900">{userProfile.firstName}</h2>
                      <p className="text-blue-600 font-medium">{userProfile.clan} Clan</p>
                      <p className="text-sm text-slate-600">Son/Daughter of {userProfile.fatherName}</p>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-slate-700 font-medium">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={editedProfile.firstName || ""}
                          onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                          className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lineage Information */}
            <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TreePine className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-900">Lineage Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditing ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Father:</span>
                      <span className="text-sm font-medium text-slate-900">{userProfile.fatherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Grandfather:</span>
                      <span className="text-sm font-medium text-slate-900">{userProfile.grandfatherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Great-Grandfather:</span>
                      <span className="text-sm font-medium text-slate-900">{userProfile.greatGrandfatherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Clan:</span>
                      <span className="text-sm font-medium text-slate-900">{userProfile.clan}</span>
                    </div>
                    {userProfile.subClan && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Sub-Clan:</span>
                        <span className="text-sm font-medium text-slate-900">{userProfile.subClan}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherName" className="text-slate-700 font-medium">
                        Father's Name
                      </Label>
                      <Input
                        id="fatherName"
                        value={editedProfile.fatherName || ""}
                        onChange={(e) => setEditedProfile({ ...editedProfile, fatherName: e.target.value })}
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grandfatherName" className="text-slate-700 font-medium">
                        Grandfather's Name
                      </Label>
                      <Input
                        id="grandfatherName"
                        value={editedProfile.grandfatherName || ""}
                        onChange={(e) => setEditedProfile({ ...editedProfile, grandfatherName: e.target.value })}
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="greatGrandfatherName" className="text-slate-700 font-medium">
                        Great-Grandfather's Name
                      </Label>
                      <Input
                        id="greatGrandfatherName"
                        value={editedProfile.greatGrandfatherName || ""}
                        onChange={(e) => setEditedProfile({ ...editedProfile, greatGrandfatherName: e.target.value })}
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clan" className="text-slate-700 font-medium">
                        Clan
                      </Label>
                      <Select
                        value={editedProfile.clan || ""}
                        onValueChange={(value) => setEditedProfile({ ...editedProfile, clan: value })}
                      >
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
                    <div className="space-y-2">
                      <Label htmlFor="subClan" className="text-slate-700 font-medium">
                        Sub-Clan (Optional)
                      </Label>
                      <Input
                        id="subClan"
                        value={editedProfile.subClan || ""}
                        onChange={(e) => setEditedProfile({ ...editedProfile, subClan: e.target.value })}
                        placeholder="Enter your sub-clan"
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-900">Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditing ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Gender:</span>
                      <span className="text-sm font-medium text-slate-900 capitalize">{userProfile.gender}</span>
                    </div>
                    {userProfile.dateOfBirth && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Date of Birth:</span>
                        <span className="text-sm font-medium text-slate-900">{userProfile.dateOfBirth}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-slate-700 font-medium">
                        Gender
                      </Label>
                      <Select
                        value={editedProfile.gender || ""}
                        onValueChange={(value) => setEditedProfile({ ...editedProfile, gender: value })}
                      >
                        <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-0 shadow-xl">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-slate-700 font-medium">
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={editedProfile.dateOfBirth || ""}
                        onChange={(e) => setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })}
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {isEditing && (
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                  onClick={() => {
                    setIsEditing(false)
                    setEditedProfile(userProfile)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl"
                  onClick={handleSaveProfile}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            {/* Privacy Settings */}
            <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-900">Privacy Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-slate-600" />
                      <span className="font-medium text-slate-900">Show my lineage to others</span>
                    </div>
                    <p className="text-sm text-slate-600">Allow other users to see your family lineage</p>
                  </div>
                  <Switch
                    checked={privacySettings.showLineage}
                    onCheckedChange={(checked) => handlePrivacyChange("showLineage", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-slate-600" />
                      <span className="font-medium text-slate-900">Allow notifications</span>
                    </div>
                    <p className="text-sm text-slate-600">Receive notifications for new relatives and updates</p>
                  </div>
                  <Switch
                    checked={privacySettings.allowNotifications}
                    onCheckedChange={(checked) => handlePrivacyChange("allowNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-slate-600" />
                      <span className="font-medium text-slate-900">Show location</span>
                    </div>
                    <p className="text-sm text-slate-600">Display your location to clan members</p>
                  </div>
                  <Switch
                    checked={privacySettings.showLocation}
                    onCheckedChange={(checked) => handlePrivacyChange("showLocation", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-slate-600" />
                      <span className="font-medium text-slate-900">Allow connection requests</span>
                    </div>
                    <p className="text-sm text-slate-600">Let other users send you connection requests</p>
                  </div>
                  <Switch
                    checked={privacySettings.allowConnections}
                    onCheckedChange={(checked) => handlePrivacyChange("allowConnections", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-slate-600" />
                      <span className="font-medium text-slate-900">Show in clan directory</span>
                    </div>
                    <p className="text-sm text-slate-600">Appear in your clan's member directory</p>
                  </div>
                  <Switch
                    checked={privacySettings.showInClanDirectory}
                    onCheckedChange={(checked) => handlePrivacyChange("showInClanDirectory", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="text-slate-900">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                >
                  Export My Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                >
                  Deactivate Account
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl border-red-200 text-red-600 hover:bg-red-50 bg-white"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
