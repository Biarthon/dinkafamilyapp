"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Filter, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BottomNavigation } from "@/components/bottom-navigation"
import { RelativeCard } from "@/components/relative-card"

export default function RelationshipsScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("strength")

  // Mock relationship data
  const relationships = [
    {
      id: "1",
      name: "Deng Malual",
      relationship: "2nd Cousin",
      strength: 85,
      sharedAncestor: "Malual Deng (Great-Grandfather)",
      clan: "Malual",
      subClan: "Malual-Deng",
      location: "Juba, South Sudan",
      avatar: "/placeholder.svg",
      isNew: true,
    },
    {
      id: "2",
      name: "Nyandeng Rek",
      relationship: "3rd Cousin",
      strength: 72,
      sharedAncestor: "Rek Deng (Great-Great-Grandfather)",
      clan: "Rek",
      subClan: "Rek-Bor",
      location: "Wau, South Sudan",
      avatar: "/placeholder.svg",
      isNew: false,
    },
    {
      id: "3",
      name: "Akol Bor",
      relationship: "Distant Relative",
      strength: 45,
      sharedAncestor: "Bor Malual (Ancestor)",
      clan: "Bor",
      subClan: "Bor-Twic",
      location: "Malakal, South Sudan",
      avatar: "/placeholder.svg",
      isNew: true,
    },
    {
      id: "4",
      name: "Ayen Ngok",
      relationship: "4th Cousin",
      strength: 38,
      sharedAncestor: "Ngok Deng (Ancestor)",
      clan: "Ngok",
      subClan: "Ngok-Lual",
      location: "Bentiu, South Sudan",
      avatar: "/placeholder.svg",
      isNew: false,
    },
    {
      id: "5",
      name: "Garang Twic",
      relationship: "Clan Brother",
      strength: 92,
      sharedAncestor: "Twic Malual (Grandfather)",
      clan: "Malual",
      subClan: "Malual-Twic",
      location: "Aweil, South Sudan",
      avatar: "/placeholder.svg",
      isNew: false,
    },
  ]

  const filteredRelationships = relationships
    .filter((rel) => {
      const matchesSearch =
        rel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rel.clan.toLowerCase().includes(searchQuery.toLowerCase())

      if (filterBy === "all") return matchesSearch
      if (filterBy === "new") return matchesSearch && rel.isNew
      if (filterBy === "strong") return matchesSearch && rel.strength >= 70
      if (filterBy === "clan") return matchesSearch && rel.clan === "Malual"

      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "strength") return b.strength - a.strength
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  const handleConnect = (relativeId: string) => {
    console.log("Connecting with relative:", relativeId)
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
              <Users className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-slate-900 text-lg">Family Connections</span>
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
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search by name or clan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm focus:shadow-md transition-all"
            />
          </div>

          <div className="flex space-x-3">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="flex-1 h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-xl">
                <SelectItem value="all">All Relatives</SelectItem>
                <SelectItem value="new">New Connections</SelectItem>
                <SelectItem value="strong">Strong Matches</SelectItem>
                <SelectItem value="clan">Same Clan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1 h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-xl">
                <SelectItem value="strength">Relationship Strength</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-slate-600 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block">
            Found {filteredRelationships.length} relative{filteredRelationships.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Relationships List */}
        <div className="space-y-4">
          {filteredRelationships.map((relationship) => (
            <RelativeCard
              key={relationship.id}
              id={relationship.id}
              name={relationship.name}
              relationship={relationship.relationship}
              sharedAncestor={relationship.sharedAncestor}
              strength={relationship.strength}
              clan={relationship.clan}
              isNew={relationship.isNew}
              avatar={relationship.avatar}
              onConnect={handleConnect}
            />
          ))}
        </div>

        {filteredRelationships.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No relatives found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 text-slate-600 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => {
                setSearchQuery("")
                setFilterBy("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
