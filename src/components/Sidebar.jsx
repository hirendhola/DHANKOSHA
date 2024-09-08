/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { WalletIcon, SendIcon, DownloadIcon, HistoryIcon, SettingsIcon, Coins } from "lucide-react"

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="h-full bg-secondary p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Coins size={35} />
        </div>
        <h1 className="text-3xl self-center font-bold font-[Jaini-Purva]" >धनकोश</h1>
      </div>
      <nav className="space-y-2 flex-grow">
        {[
          { icon: <WalletIcon className="h-5 w-5" />, label: "Dashboard", value: "dashboard" },
          { icon: <SendIcon className="h-5 w-5" />, label: "Send", value: "send" },
          { icon: <DownloadIcon className="h-5 w-5" />, label: "Receive", value: "receive" },
          { icon: <HistoryIcon className="h-5 w-5" />, label: "History", value: "history" },
          { icon: <SettingsIcon className="h-5 w-5" />, label: "Settings", value: "settings" },
        ].map((item) => (
          <Button
            key={item.value}
            variant={activeTab === item.value ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab(item.value)}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Button>
        ))}
      </nav>
      <Separator className="my-4" />
    </div>
  )
}