/* eslint-disable react/prop-types */
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MoonIcon, BellIcon, LockIcon, KeyIcon, Code, CopyIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Settings({ isDarkMode, setIsDarkMode, selectedWallet }) {
  const [notifications, setNotifications] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [developerMode, SetDeveloperMode] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast()

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

  const confirmPassword_cpy = () => {
    if (password === localStorage.getItem('password')) {
      navigator.clipboard.writeText(selectedWallet?.secretPhrase.split(" ").join(","));
      toast({
        title: "Copied!!",
        description: "Secret Phrase copied to clipboard!",
        duration: 1000
      })
      setIsDialogOpen(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleCopy = () => {
    setIsDialogOpen(true);
  };

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
      <Card>
        <CardHeader>
          <CardTitle>Secret Recovery Phrase</CardTitle>
          <CardDescription>Keep this phrase safe and never share it with anyone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 blur-sm hover:blur-none bg transition-all">
            {selectedWallet?.secretPhrase?.split(' ').map((word, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 bg-secondary rounded p-2 overflow-hidden">
                <span className="font-mono text-center  select-none ">{word}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" onClick={handleCopy}>
                <CopyIcon className="mr-2 h-4 w-4" /> Copy Recovery Phrase
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark">
              <DialogHeader>
                <DialogTitle className="text-white">Confirm Password</DialogTitle>
                <DialogDescription>
                  Please enter your password to copy the recovery phrase.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="col-span-3 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <DialogFooter>
                <Button onClick={confirmPassword_cpy}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}