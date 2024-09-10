/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RefreshCwIcon, ChevronsUp, ChevronsDown, PlusCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Dashboard({ wallets, selectedWallet, setSelectedWallet, refreshBalance, createWallet }) {
  const [balance, setBalance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast()

  useEffect(() => {
    if (selectedWallet) {
      setBalance(Number(selectedWallet.balance) || 0);
    }
  }, [selectedWallet]);

  const updateBalance = async () => {
    if (selectedWallet) {
      const newBalance = await refreshBalance(selectedWallet.publicKey);
      setBalance(Number(newBalance) || 0);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await updateBalance();
    setIsRefreshing(false);
  };

  const handleWalletChange = (value) => {
    const wallet = wallets.find(w => w.id.toString() === value);
    if (wallet) {
      setSelectedWallet(wallet);
    }
  };


  const copyAdd = () => {
    navigator.clipboard.writeText(selectedWallet?.publicKey);
    toast({
      title: "Copied!!",
      description: "Public key copied to clipboard!",
      duration: 1000
    })
  };


  return (
    <div className="space-y-6">


      {/* SELECT WALLET && ADD WALLET*/}
      <div className="flex items-center justify-between w-full gap-2">
        <Select
          value={selectedWallet?.id.toString()}
          onValueChange={handleWalletChange}
          className="w-full"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Wallet" className="text-center" />
          </SelectTrigger>
          <SelectContent className="dark">
            {wallets?.map((wallet) => (
              <SelectItem key={wallet.id} value={wallet.id.toString()}>{wallet.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => createWallet("SOLANA_" + (wallets.length + 1), localStorage.getItem('password'))}>
          <PlusCircleIcon className="light" />
        </Button>
      </div>

      {/* SHOWS CURRENT BALANCE && SEND/RECEIVE/REFRESHBALANCE BUTTON */}
      {selectedWallet && (
        <>
          <Card>
            <CardHeader>
              <CardTitle> {selectedWallet.name}</CardTitle>
              <CardDescription>Your current balance and wallet details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-[5vh] font-bold mb-4">
                {balance.toFixed(8)} <h5 className='text-teal-300 inline shadow-lg'>SOL</h5>
                {/* SOL ≈ ${(balance * 100).toFixed(2)} */}
              </div>
              <div className="grid gap-2 max-w-full overflow-hidden">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Public Key:</Label>
                  <div className="max-w-xs font-mono bg-secondary p-2 rounded text-sm cursor-pointer overflow-hidden" onClick={copyAdd}>
                    {selectedWallet.publicKey.slice(0, 4) + "..." + selectedWallet.publicKey.slice(-6)}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid lg:items-center lg:grid-cols-3 lg:gap-8">
              <Button className="w-full m-2 bg-emerald-400">
                <ChevronsUp className="mr-2 h-4 w-4" /> Send
              </Button>
              <Button className="w-full m-2 bg-green-400">
                <ChevronsDown className="mr-2 h-4 w-4" /> Receive
              </Button>
              <Button onClick={handleRefresh} className="w-full m-2 bg-orange-400" disabled={isRefreshing}>
                <RefreshCwIcon className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh Balance'}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
      <Toaster />
    </div>
  );
}