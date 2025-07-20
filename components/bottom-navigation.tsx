"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Home, Search, Plus, Users, Settings } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

interface NavItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "Home", href: "/dashboard" },
  { id: "search", icon: Search, label: "Search", href: "/search" },
  { id: "add", icon: Plus, label: "Connect", href: "/connect" },
  { id: "relatives", icon: Users, label: "Relatives", href: "/relationships" },
  { id: "profile", icon: Settings, label: "Profile", href: "/profile" },
]

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const getActiveItem = () => {
    const currentItem = navItems.find((item) => pathname.startsWith(item.href))
    return currentItem?.id || "home"
  }

  const activeItem = getActiveItem()

  const handleNavigation = (item: NavItem) => {
    router.push(item.href)
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-slate-900/95 backdrop-blur-lg rounded-3xl px-6 py-3 shadow-2xl border border-slate-800/50">
        <div className="flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item)}
                className={`relative transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-lg"
                    : "text-slate-400 hover:text-white p-3 rounded-2xl hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5" />
                  {isActive && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                </div>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
