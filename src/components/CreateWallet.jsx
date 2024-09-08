/* eslint-disable react/prop-types */

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateWallet({ onCreateWallet }) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    localStorage.setItem('password', password)
    onCreateWallet(name, password)
  }

  return (
    <Card className="w- mx-auto mt-16">
      <CardHeader>
        <CardTitle>Create New Wallet</CardTitle>
        <CardDescription>Set up your first crypto wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Wallet Name</Label>
              <Input id="name" placeholder="My Wallet" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="off" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>Create Wallet</Button>
      </CardFooter>
    </Card>
  )
}