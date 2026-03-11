"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const CURRENCIES = [
  { code: "EUR", label: "EUR", flagSrc: "/assets/flags/europe.png" },
  { code: "AUD", label: "AUD", flagSrc: "/assets/flags/australia.png" },
  { code: "CAD", label: "CAD", flagSrc: "/assets/flags/canada.png" },
  { code: "GBP", label: "GBP", flagSrc: "/assets/flags/united-kingdom.png" },
]

// Mock exchange rates relative to EUR
const RATES: Record<string, number> = {
  EUR: 1.0,
  AUD: 1.63,
  CAD: 1.47,
  GBP: 0.86,
}

function convert(amount: number, from: string, to: string): string {
  if (!amount || isNaN(amount)) return "—"
  const inEur = amount / RATES[from]
  const result = inEur * RATES[to]
  return result.toFixed(2)
}

function CurrencyPicker({
  value,
  onChange,
  exclude,
}: {
  value: string
  onChange: (code: string) => void
  exclude: string
}) {
  const current = CURRENCIES.find((c) => c.code === value)!
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 px-3">
          <Image
            src={current.flagSrc}
            alt={current.label}
            width={20}
            height={20}
            className="size-5 rounded-full object-cover"
          />
          <span className="font-medium">{current.label}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {CURRENCIES.filter((c) => c.code !== exclude).map((c) => (
          <DropdownMenuItem
            key={c.code}
            onSelect={() => onChange(c.code)}
            className="flex items-center gap-2"
          >
            <Image
              src={c.flagSrc}
              alt={c.label}
              width={20}
              height={20}
              className="size-5 rounded-full object-cover"
            />
            {c.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function TransferCalculator() {
  const [from, setFrom] = useState("EUR")
  const [to, setTo] = useState("GBP")
  const [amount, setAmount] = useState("")

  function swap() {
    setFrom(to)
    setTo(from)
  }

  const converted = convert(parseFloat(amount), from, to)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Transfer calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* From row */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">You send</p>
          <div className="flex gap-2">
            <CurrencyPicker value={from} onChange={setFrom} exclude={to} />
            <Input
              type="number"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Swap button */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <Button variant="outline" size="icon" onClick={swap} aria-label="Swap currencies">
            <ArrowLeftRight className="size-4" />
          </Button>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* To row */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Recipient gets</p>
          <div className="flex gap-2">
            <CurrencyPicker value={to} onChange={setTo} exclude={from} />
            <div className="flex flex-1 items-center rounded-md border bg-muted/50 px-3 text-sm font-medium">
              {converted}
            </div>
          </div>
        </div>

        {/* Rate hint */}
        {amount && converted !== "—" && (
          <p className="text-xs text-muted-foreground">
            1 {from} = {(RATES[to] / RATES[from]).toFixed(4)} {to} · indicative rate
          </p>
        )}

        <Button className="w-full" size="sm">
          Send {from}
        </Button>
      </CardContent>
    </Card>
  )
}
