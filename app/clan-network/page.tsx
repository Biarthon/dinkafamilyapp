"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Users, MapPin, Crown, TrendingUp, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ClanNetworkScreen() {
  const [userProfile, setUserProfile] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const profile = localStorage.getItem("userProfile")
    if (profile) {
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  // Mock clan data
  const clanStats = {
    totalMembers: 1247,
    activeMembers: 892,
    newThisMonth: 23,
    subClans: 8,
    locations: 12,
  }

  const subClans = [
    { name: "Malual-Deng", members: 234, leader: "Elder Deng Malual", location: "Juba" },
    { name: "Malual-Twic", members: 189, leader: "Elder Twic Malual", location: "Aweil" },
    { name: "Malual-Bor", members: 156, leader: "Elder Bor Malual", location: "Malakal" },
    { name: "Malual-Rek", members: 143, leader: "Elder Rek Malual", location: "Wau" },
    { name: "Malual-Ngok", members: 127, leader: "Elder Ngok Malual", location: "Bentiu" },
    { name: "Malual-Luach", members: 98, leader: "Elder Luach Malual", location: "Rumbek" },
  ]

  const clanMembers = [
    {
      id: 1,
      name: "Deng Malual Akol",
      subClan: "Malual-Deng",
      location: "Juba, South Sudan",
      joinDate: "2024-01-15",
      isElder: false,
      isOnline: true,
      connections: 23,
    },
    {
      id: 2,
      name: "Nyandeng Rek Garang",
      subClan: "Malual-Rek",
      location: "Wau, South Sudan",
      joinDate: "2023-11-20",
      isElder: false,
      isOnline: false,
      connections: 18,
    },
    {
      id: 3,
      name: "Elder Twic Malual",
      subClan: "Malual-Twic",
      location: "Aweil, South Sudan",
      joinDate: "2023-08-10",
      isElder: true,
      isOnline: true,
      connections: 67,
    },
    {
      id: 4,
      name: "Ayen Bor Deng",
      subClan: "Malual-Bor",
      location: "Malakal, South Sudan",
      joinDate: "2024-02-03",
      isElder: false,
      isOnline: true,
      connections: 15,
    },
  ]

  const filteredMembers = clanMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.subClan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-slate-600">Loading clan network...</p>
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
              <Users className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-slate-900 text-lg">{userProfile.clan} Clan</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <Filter className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 pb-32 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100 rounded-2xl p-1">
            <TabsTrigger
              value="overview"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="subclans"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
            >
              Sub-Clans
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
            >
              Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Clan Statistics */}
            <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-900">Clan Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-2xl">
                    <div className="text-2xl font-bold text-blue-700">{clanStats.totalMembers}</div>
                    <div className="text-sm text-slate-600">Total Members</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-2xl">
                    <div className="text-2xl font-bold text-green-700">{clanStats.activeMembers}</div>
                    <div className="text-sm text-slate-600">Active Members</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-2xl">
                    <div className="text-2xl font-bold text-purple-700">{clanStats.subClans}</div>
                    <div className="text-sm text-slate-600">Sub-Clans</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                    <div className="text-2xl font-bold text-slate-700">{clanStats.locations}</div>
                    <div className="text-sm text-slate-600">Locations</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-900">Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">23 new members joined this month</p>
                    <p className="text-xs text-slate-600">Growth rate: +2.1%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">New sub-clan formed in Yei</p>
                    <p className="text-xs text-slate-600">Malual-Yei with 12 founding members</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-2xl">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Elder council meeting scheduled</p>
                    <p className="text-xs text-slate-600">Next Sunday in Juba</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subclans" className="space-y-4">
            {subClans.map((subClan, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-lg">{subClan.name}</h3>
                    <Badge className="bg-blue-100 text-blue-700 rounded-full px-3 py-1">
                      {subClan.members} members
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Crown className="w-4 h-4" />
                      <span>Leader: {subClan.leader}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>Primary Location: {subClan.location}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                  >
                    View Members
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search clan members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm focus:shadow-md transition-all"
              />
            </div>

            {/* Members List */}
            {filteredMembers.map((member) => (
              <Card key={member.id} className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-14 h-14 border-2 border-slate-200 shadow-sm">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-slate-100 text-slate-700 font-bold">
                          {member.name
                            .split(" ")
                            .map((n) => n.charAt(0))
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-slate-900">{member.name}</h3>
                        {member.isElder && (
                          <Badge className="bg-purple-100 text-purple-700 text-xs rounded-full px-2 py-1">
                            <Crown className="w-3 h-3 mr-1" />
                            Elder
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-blue-600 font-medium mb-2">{member.subClan}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{member.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{member.connections} connections</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                    >
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No members found</h3>
                <p className="text-slate-500 mb-4">Try adjusting your search terms</p>
                <Button
                  variant="outline"
                  className="rounded-2xl border-slate-200 text-slate-600 bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  )
}
