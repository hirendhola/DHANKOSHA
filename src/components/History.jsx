import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function History() {
  const transactions = Array(10).fill().map((_, i) => ({
    id: i,
    type: i % 2 === 0 ? 'Received' : 'Sent',
    amount: (Math.random() * 10).toFixed(2),
    date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
  }))

  // const transactions = Array(0);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Transaction History</h2>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest crypto activities</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[475px] ">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-2 hover:bg-secondary rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{transaction.type === 'Received' ? 'IN' : 'OUT'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{transaction.type}</div>
                      <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={transaction.type === 'Received' ? "text-green-500" : "text-red-500"}>
                    {transaction.type === 'Received' ? '+' : '-'}
                    {transaction.amount} CRYPT
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}