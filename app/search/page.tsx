"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BottomNavigation } from "@/components/bottom-navigation"
import { RelativeCard } from "@/components/relative-card"

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Mock search results
  const searchResults = [
    {
      id: "1",
      name: "Deng Malual Akol",
      relationship: "2nd Cousin",
      sharedAncestor: "Same Great-Grandfather",
      strength: 85,
      clan: "Malual",
      location: "Juba, South Sudan",
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
      location: "Wau, South Sudan",
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
      location: "Malakal, South Sudan",
      isNew: true,
      avatar: "/placeholder.svg",
    },
  ]

  const filteredResults = searchResults.filter((result) => {
    const matchesSearch =
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.clan.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterBy === "all" || (filterBy === "strong" && result.strength >= 70) || (filterBy === "new" && result.isNew)

    const matchesLocation =
      locationFilter === "all" || result.location.toLowerCase().includes(locationFilter.toLowerCase())

    return matchesSearch && matchesFilter && matchesLocation
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
              <Search className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-slate-900 text-lg">Search Relatives</span>
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
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search by name, clan, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm focus:shadow-md transition-all text-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-3 mb-6">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="flex-1 h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-0 shadow-xl">
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="strong">Strong Matches</SelectItem>
              <SelectItem value="new">New Discoveries</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="flex-1 h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-0 shadow-xl">
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="juba">Juba</SelectItem>
              <SelectItem value="wau">Wau</SelectItem>
              <SelectItem value="malakal">Malakal</SelectItem>
              <SelectItem value="bentiu">Bentiu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-4">
            <p className="text-sm text-slate-600 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block">
              Found {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          </div>
        )}

        <div className="space-y-4">
          {filteredResults.map((result) => (
            <RelativeCard
              key={result.id}
              id={result.id}
              name={result.name}
              relationship={result.relationship}
              sharedAncestor={result.sharedAncestor}
              strength={result.strength}
              clan={result.clan}
              isNew={result.isNew}
              avatar={result.avatar}
              onConnect={handleConnect}
            />
          ))}
        </div>

        {searchQuery && filteredResults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No results found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search terms or filters</p>
            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 text-slate-600 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => {
                setSearchQuery("")
                setFilterBy("all")
                setLocationFilter("all")
              }}
            >
              Clear Search
            </Button>
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">Search for Relatives</h3>
            <p className="text-slate-500">Enter a name, clan, or location to find family connections</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
