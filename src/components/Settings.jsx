/* eslint-disable react/prop-types */
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MoonIcon, BellIcon, LockIcon, KeyIcon, Code } from "lucide-react"

export default function Settings({ isDarkMode, setIsDarkMode }) {
  const [notifications, setNotifications] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [developerMode, SetDeveloperMode] = useState(true)

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match")
      return
    }
    localStorage.setItem('password', newPassword)
    alert("Password changed successfully")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your wallet experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MoonIcon className="h-4 w-4" />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellIcon className="h-4 w-4" />
              <Label htmlFor="notifications">Enable Notifications</Label>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
              disabled
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Advance</CardTitle>
          <CardDescription>Advance Features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <Label htmlFor="dark-mode">Developer Mode</Label>
            </div>
            <Switch
              id="dark-mode"
              checked={developerMode}
              onCheckedChange={SetDeveloperMode}
              disabled
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <KeyIcon className="mr-2 h-4 w-4" /> Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" disabled>
            <LockIcon className="mr-2 h-4 w-4" /> Set Up Two-Factor Authentication
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}