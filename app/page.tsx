'use client'

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select"
import { toast } from "sonner"

type Order = {
  id: number
  coffee_name: string
  size: string
  quantity: number
  created_at: string
}

const coffeeTypes = ["Espresso", "Latte", "Cappuccino", "Americano"]
const sizes = ["Small", "Medium", "Large"]

export default function Home() {
  const [coffee, setCoffee] = useState("Latte")
  const [size, setSize] = useState("Medium")
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  const API_URL = process.env.API_URL;

  const fetchOrders = async () => {
    setOrdersLoading(true)
    try {
      const res = await fetch(`${API_URL}/orders`)
      if (!res.ok) throw new Error("Failed to fetch orders")
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      toast.error("Could not load orders")
    } finally {
      setOrdersLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coffee_name: coffee, size: size, quantity: quantity }),
      })

      if (!res.ok) throw new Error("Order failed")

      toast.success("Your coffee is on the way")
      setCoffee("Latte")
      setSize("Medium")
      setQuantity(1)
      fetchOrders()
    } catch (err) {
      toast.error("Could not place order")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-100 p-6 gap-6">

      {/* Order Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="space-y-4 p-6">
            <h1 className="text-2xl font-bold text-center">☕ Order Coffee</h1>

            <div className="space-y-2">
              <Label>Coffee Type</Label>
              <Select value={coffee} onValueChange={setCoffee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coffee" />
                </SelectTrigger>
                <SelectContent>
                  {coffeeTypes.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
                min={1}
              />
            </div>

            <Button onClick={handleSubmit} disabled={loading} className="w-full">
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">📋 Submitted Orders</h2>
            <Button variant="outline" onClick={fetchOrders}>
              {ordersLoading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {orders.length === 0 ? (
            <p className="text-zinc-500">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-zinc-200 text-zinc-700">
                  <tr>
                    <th className="py-2 px-4">ID</th>
                    <th className="py-2 px-4">Coffee</th>
                    <th className="py-2 px-4">Size</th>
                    <th className="py-2 px-4">Qty</th>
                    <th className="py-2 px-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2 px-4">{order.id}</td>
                      <td className="py-2 px-4">{order.coffee_name}</td>
                      <td className="py-2 px-4">{order.size}</td>
                      <td className="py-2 px-4">{order.quantity}</td>
                      <td className="py-2 px-4">{new Date(order.created_at).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
