/* eslint-disable react/prop-types */
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SendIcon, RefreshCwIcon } from "lucide-react"
import { SendSol } from "@/services/Send"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"


export default function Send({ selectedWallet }) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()


  const handleSend = async () => {
    if (amount > selectedWallet.balance) {
      toast({
        title: "Insufficient Funds!!",
        variant: "destructive",
        description: "You do not have enough SOL to complete this transaction.",
        duration: 1500
      })
    }
    setLoading(true)
    const res = await SendSol(selectedWallet.privateKey, recipient, amount)
    if (res) {
      setLoading(false)
      toast({
        title: "Success!!",
        description: "Transaction successfull!!",
        duration: 1500
      })
      setRecipient("")
      setAmount("")
    } else {
      toast({
        title: "Something gone wrong ",
        variant: "destructive",
        description: "Please check your balance it might be the issue!!",
        duration: 1500
      })
      console.log('something gone wrong')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Send Crypto</h2>
      <Card>
        <CardHeader>
          <CardTitle>Send Transaction</CardTitle>
          <CardDescription>Transfer funds to another wallet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Select disabled value={selectedWallet?.id.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={selectedWallet?.id.toString()}>{selectedWallet?.name}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              placeholder="Recipient's wallet address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="flex space-x-2">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Select defaultValue="SOLANA" disabled>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOLANA">SOL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSend} disabled={!recipient || !amount}>
            {loading ? <RefreshCwIcon className={`mr-2 h-4 w-4 animate-spin`} /> : <SendIcon className="mr-2 h-4 w-4" />} {loading ? ("sending....") : ("Send SOL")}
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}