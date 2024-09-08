"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WalletIcon, SendIcon, DownloadIcon, HistoryIcon, SettingsIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Dashboard from "./components/Dashboard"
import Send from "./components/Send"
import Receive from "./components/Receive"
import History from "./components/History"
import Settings from "./components/Settings"
import CreateWallet from "./components/CreateWallet"
import solanaLogo from './assets/solana.svg'
import { CreateNewMnemonic, SOL_createKeyPair } from "./services/SolWallet"
import { Buffer } from 'buffer';
import axios from "axios"
import DevnetBanner from "./components/DevnetBadge"

export default function App() {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(true);

  /* check if wallet exist or not  */
  useEffect(() => {
    const storedMnemonic = localStorage.getItem('mnemonic');
    const storedSeed = retrieveSeed();
    const storedWallets = localStorage.getItem('wallets');

    if (storedMnemonic && storedSeed && storedWallets) {
      const parsedWallets = JSON.parse(storedWallets);
      setWallets(parsedWallets);
      setSelectedWallet(parsedWallets[0]);
      setActiveTab("dashboard");
    }
  }, []);

  /* Store Seed in local storage as HEX */
  const storeSeed = (seed) => {
    if (seed instanceof Buffer) {
      localStorage.setItem('seed', seed.toString('hex'));
    } else {
      console.error('Seed is not a Buffer');
    }
  };

  /* Retrive Seed from local storage as BUFFER */
  const retrieveSeed = () => {
    const storedSeed = localStorage.getItem('seed');
    return storedSeed ? Buffer.from(storedSeed, 'hex') : null;
  };

  /* Create new wallet and also add new wallet from created mneumonic  */
  const createWallet = (name) => {
    let mnemonic = localStorage.getItem('mnemonic');
    let seed = retrieveSeed();

    if (!mnemonic || !seed) {
      const [newMnemonic, newSeed] = CreateNewMnemonic();
      mnemonic = newMnemonic;
      seed = newSeed;
      localStorage.setItem('mnemonic', mnemonic);
      storeSeed(seed);
    }

    const index = wallets.length;
    const [publicKey, privateKey] = SOL_createKeyPair(seed, index);

    const newWallet = {
      id: Date.now(),
      name,
      token: "CRYPT" + Math.random().toString(36).substring(2, 15),
      secretPhrase: mnemonic,
      publicKey: publicKey,
      privateKey: privateKey,
      balance: 0,
    };

    const updatedWallets = [...wallets, newWallet];
    setWallets(updatedWallets);
    setSelectedWallet(newWallet);
    setActiveTab("dashboard");

    localStorage.setItem('wallets', JSON.stringify(updatedWallets));
  };

  /* GET latest balance from alchemy  */
  const getBalance = async (publicKey) => {
    try {
      const res = await axios.post(import.meta.env.VITE_ALCHEMY_URL, {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getAccountInfo",
        "params": [publicKey]
      });

      const balance = (res.data?.result?.value?.lamports / 1000000000) || 0;
      return balance;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return 0;
    }
  };

  /* Refresh the balance its use getBalance and also update the STATE VARIABLE && LOCAL STORAGE */
  const refreshBalance = async (publicKey) => {
    const balance = await getBalance(publicKey);
    const updatedWallets = wallets.map(wallet =>
      wallet.publicKey === publicKey ? { ...wallet, balance } : wallet
    );
    setWallets(updatedWallets);
    localStorage.setItem('wallets', JSON.stringify(updatedWallets));
    if (selectedWallet && selectedWallet.publicKey === publicKey) {
      setSelectedWallet({ ...selectedWallet, balance });
    }
    return balance;
  };

  /* TAB to be renderd */
  const tabItems = [
    { icon: <WalletIcon className="h-5 w-5" />, label: "Dashboard", value: "dashboard" },
    { icon: <SendIcon className="h-5 w-5" />, label: "Send", value: "send" },
    { icon: <DownloadIcon className="h-5 w-5" />, label: "Receive", value: "receive" },
    { icon: <HistoryIcon className="h-5 w-5" />, label: "History", value: "history" },
    { icon: <SettingsIcon className="h-5 w-5" />, label: "Settings", value: "settings" },
  ]

  /* render TABS specified in tabItems */
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            wallets={wallets}
            selectedWallet={selectedWallet}
            setSelectedWallet={setSelectedWallet}
            refreshBalance={refreshBalance}
            createWallet={createWallet}
          />
        )
      case "send":
        return <Send selectedWallet={selectedWallet} />
      case "receive":
        return <Receive selectedWallet={selectedWallet} />
      case "history":
        return <History />
      case "settings":
        return <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen min-w-screen bg-background ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container mx-auto sm:px-18 p-4">
        <Card className="border-none shadow-none">
          <DevnetBanner />
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2 mt-4 w-full">
              <div className="flex justify-center items-center">
                <img src={solanaLogo} alt="img" className="w-6 mr-2 h-6" />
                <h1 className="text-2xl font-bold  text-center">DHANकोश</h1>
              </div>
              <Sheet className={` ${isDarkMode ? 'dark' : 'light'}`}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className={`lg:hidden self-center ${isDarkMode ? 'dark' : 'light'}`}>
                    <MenuIcon className="h-4 w-4 sel" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className={`${isDarkMode ? 'dark' : 'light'}`}>
                  <nav className={`w-4/5 flex flex-col space-y-2 mt-4 ${isDarkMode ? 'text-white' : 'text - black'}`}>
                    {tabItems.map((item) => (
                      <Button
                        key={item.value}
                        variant={activeTab === item.value ? "default" : "ghost"}
                        className={`justify-start ${isDarkMode ? 'dark' : 'light'}`}
                        onClick={() => setActiveTab(item.value)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="hidden lg:inline-flex w-full">
                {tabItems.map((item) => (
                  <TabsTrigger key={item.value} value={item.value} className="flex items-center space-x-2 w-full gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeTab} className="mt-0">
                {wallets.length === 0 ? (
                  <CreateWallet onCreateWallet={createWallet} />
                ) : (
                  renderTabContent()
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
