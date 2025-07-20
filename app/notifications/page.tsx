"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bell, Users, UserPlus, TreePine, Heart, Trash2, Check, Settings } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new_relative",
      title: "New Relative Found",
      message: "Deng Malual has been identified as your 2nd cousin with 85% match strength",
      time: "2 hours ago",
      isRead: false,
      icon: UserPlus,
      color: "text-green-600",
      bgColor: "bg-green-50",
      data: {
        relativeName: "Deng Malual",
        relationship: "2nd Cousin",
        strength: 85,
      },
    },
    {
      id: 2,
      type: "clan_update",
      title: "Clan Network Update",
      message: "5 new members joined the Malual clan network this week",
      time: "1 day ago",
      isRead: false,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      data: {
        newMembers: 5,
        clan: "Malual",
      },
    },
    {
      id: 3,
      type: "family_tree",
      title: "Family Tree Updated",
      message: "Your family tree has been updated with new connections and verified lineage information",
      time: "2 days ago",
      isRead: true,
      icon: TreePine,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      data: {},
    },
    {
      id: 4,
      type: "connection_request",
      title: "Connection Request",
      message: "Nyandeng Rek wants to connect with you as a 3rd cousin",
      time: "3 days ago",
      isRead: false,
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      data: {
        requesterName: "Nyandeng Rek",
        relationship: "3rd Cousin",
      },
    },
    {
      id: 5,
      type: "new_relative",
      title: "Potential Match Found",
      message: "Akol Bor might be your distant relative with 45% match strength",
      time: "5 days ago",
      isRead: true,
      icon: UserPlus,
      color: "text-green-600",
      bgColor: "bg-green-50",
      data: {
        relativeName: "Akol Bor",
        relationship: "Distant Relative",
        strength: 45,
      },
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
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
              <div className="relative">
                <Bell className="w-6 h-6 text-blue-500" />
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </div>
                )}
              </div>
              <span className="font-bold text-slate-900 text-lg">Notifications</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <Settings className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 pb-32 relative z-10">
        {/* Action Buttons */}
        {unreadCount > 0 && (
          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 bg-white/80 backdrop-blur-sm"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark all as read ({unreadCount})
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notification.icon
            return (
              <Card
                key={notification.id}
                className={`border-0 shadow-lg rounded-3xl transition-all duration-200 ${
                  notification.isRead
                    ? "bg-white/60 backdrop-blur-sm"
                    : "bg-white/90 backdrop-blur-lg border-l-4 border-l-blue-500"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className={`w-6 h-6 ${notification.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-bold ${notification.isRead ? "text-slate-700" : "text-slate-900"}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2 ml-2">
                          {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 rounded-full"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <p className={`text-sm mb-3 ${notification.isRead ? "text-slate-600" : "text-slate-800"}`}>
                        {notification.message}
                      </p>

                      {/* Special content based on notification type */}
                      {notification.type === "new_relative" && notification.data.strength && (
                        <div className="mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                                style={{ width: `${notification.data.strength}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-600 font-medium">{notification.data.strength}%</span>
                          </div>
                        </div>
                      )}

                      {notification.type === "connection_request" && (
                        <div className="flex space-x-2 mb-3">
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl">
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-2xl"
                          >
                            Decline
                          </Button>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${notification.isRead ? "text-slate-400" : "text-blue-600"}`}>
                          {notification.time}
                        </span>

                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-blue-600 hover:text-blue-700 h-auto p-1 rounded-xl"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Bell className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No notifications</h3>
            <p className="text-slate-500">You're all caught up! New notifications will appear here.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
