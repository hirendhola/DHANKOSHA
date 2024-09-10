/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCodeIcon, CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Receive({ selectedWallet }) {
  // Memoize the QR code URL to avoid recalculating it on every render
  const qrCodeUrl = useMemo(() => {
    return selectedWallet?.publicKey
      ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selectedWallet.publicKey}`
      : "";
  }, [selectedWallet?.publicKey]);

  const { toast } = useToast()


  const handleCopy = () => {
    navigator.clipboard.writeText(selectedWallet?.publicKey);
    toast({
      title: "Copied!!",
      description: "Public key copied to clipboard!",
      duration: 1000
    })
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Receive Crypto</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Wallet Address</CardTitle>
          <CardDescription>Share this address to receive funds</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-lg">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="Wallet QR Code"
                className="h-40 w-40"
              />
            ) : <QrCodeIcon />}
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center space-x-2">
              <Input value={selectedWallet?.publicKey} readOnly />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Send only SOLANA to this address. Sending any other coins may result in permanent loss.
          </p>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}
