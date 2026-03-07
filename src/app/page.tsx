import Link from "next/link"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpCircle, PlusCircle, ChevronDown } from "lucide-react"

/**
 * DESIGNER NOTE: Wise-style dashboard — layout and structure only.
 * All core sections use ShadCN components. Designers can restyle to match Wise UI (colours, typography, spacing).
 *
 * Sections:
 * — Total balance + action buttons (Send, Add money, Request)
 * — Currency account cards (EUR, AUD, CAD, GBP)
 * — Recent transactions list
 * — Footer (Provided by Wise Assets Europe)
 */

const CURRENCY_ACCOUNTS = [
  { code: "EUR", label: "EUR", accountId: "51568", balance: "1.00", flagSrc: "/assets/flags/europe.png" },
  { code: "AUD", label: "AUD", accountId: "30779", balance: "0.00", flagSrc: "/assets/flags/australia.png" },
  { code: "CAD", label: "CAD", accountId: "15376", balance: "0.00", flagSrc: "/assets/flags/canada.png" },
  { code: "GBP", label: "GBP", accountId: "13159", balance: "0.00", flagSrc: "/assets/flags/united-kingdom.png" },
]

const RECENT_TRANSACTIONS = [
  { id: "1", icon: ArrowUpCircle, name: "Hannah Johnson", subtitle: "Sent - 18 Apr", amount: "49 EUR", isCredit: false },
  { id: "2", icon: PlusCircle, name: "To EUR", subtitle: "Added - 18 Apr", amount: "+ 50 EUR", subAmount: "50.44 EUR", isCredit: true },
  { id: "3", icon: ArrowUpCircle, name: "Brandon Bolt", subtitle: "Sent - 2 Apr", amount: "110 EUR", isCredit: false },
]

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[976px] flex-1 flex-col gap-14 p-6 pt-14">
      {/* Total balance + actions */}
      <section className="space-y-4">
        <div className="space-y-0">
        <p className="text-sm font-medium text-muted-foreground">Total balance</p>
        <h2 className="text-3xl font-bold tracking-tight">1.00 EUR</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="default">
            Send money
          </Button>
          <Button size="sm" variant="secondary">
            Add money
          </Button>
          <Button size="sm" variant="secondary">
            Request money
          </Button>
        </div>
      </section>

      {/* Currency account cards */}
      <section className="scrollbar-on-hover flex gap-3 overflow-x-auto pb-2">
        {CURRENCY_ACCOUNTS.map((account) => (
          <Card key={account.code} className="flex h-[206px] w-[256px] shrink-0 justify-between bg-muted/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Image
                src={account.flagSrc}
                alt={`${account.label} flag`}
                width={96}
                height={96}
                quality={100}
                className="size-12 rounded-full object-cover"
              />
              <CardTitle className="text-base font-medium">{account.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-end space-y-1">
              <p className="text-xs text-muted-foreground">Account - {account.accountId}</p>
              <p className="text-2xl font-bold">{account.balance}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Recent transactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transactions</h2>
          <Link
            href="/"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            See all
          </Link>
        </div>
        <ul className="divide-y divide-border rounded-lg">
          {RECENT_TRANSACTIONS.map((tx) => (
            <li key={tx.id} className="flex items-center gap-4 px-4 py-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <tx.icon className="size-5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{tx.name}</p>
                <p className="text-sm text-muted-foreground">{tx.subtitle}</p>
                {tx.subAmount && (
                  <p className="text-xs text-muted-foreground">{tx.subAmount}</p>
                )}
              </div>
              <p className={`shrink-0 text-right font-medium ${tx.isCredit ? "text-primary" : ""}`}>
                {tx.amount}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-4">
        <p className="text-xs text-muted-foreground">
          Provided by Wise Assets Europe
        </p>
      </footer>
    </div>
  )
}
