"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, TreePine, Phone, Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeveloperCredit } from "@/components/developer_credit"

export default function LoginScreen() {
  const [loginMethod, setLoginMethod] = useState("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [showOtp, setShowOtp] = useState(false)

  const handleSendOtp = () => {
    setShowOtp(true)
  }

  const handleLogin = () => {
    window.location.href = "/dashboard"
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
      <div className="flex items-center justify-between px-6 py-4 mb-8 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (window.location.href = "/")}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Button>
        <div className="flex items-center space-x-2">
          <TreePine className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-slate-700">Welcome Back</span>
        </div>
        <div></div>
      </div>

      <div className="max-w-md mx-auto px-6 relative z-10">
        <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl rounded-3xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800">Sign In</CardTitle>
            <p className="text-slate-600 text-sm mt-2">Enter your details to access your family network</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Tabs value={loginMethod} onValueChange={setLoginMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 rounded-2xl p-1">
                <TabsTrigger
                  value="phone"
                  className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </TabsTrigger>
                <TabsTrigger
                  value="email"
                  className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-6">
                {!showOtp ? (
                  <>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-slate-700 font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+211 XXX XXX XXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                      />
                    </div>
                    <Button
                      onClick={handleSendOtp}
                      className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      disabled={!phoneNumber}
                    >
                      Send OTP
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <Label htmlFor="otp" className="text-slate-700 font-medium">
                        Enter OTP
                      </Label>
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all text-center text-lg tracking-widest"
                        maxLength={6}
                      />
                      <p className="text-sm text-slate-600 text-center">Code sent to {phoneNumber}</p>
                    </div>
                    <Button
                      onClick={handleLogin}
                      className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      disabled={otp.length !== 6}
                    >
                      Verify & Sign In
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowOtp(false)}
                      className="w-full h-12 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 bg-white shadow-sm"
                    >
                      Change Phone Number
                    </Button>
                  </>
                )}
              </TabsContent>

              <TabsContent value="email" className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-300 transition-all"
                  />
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  disabled={!email}
                >
                  Sign In with Email
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="text-blue-500 p-0 h-auto font-semibold hover:text-blue-600"
                  onClick={() => (window.location.href = "/register")}
                >
                  Register here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        <DeveloperCredit />
      </div>
    </div>
  )
}
