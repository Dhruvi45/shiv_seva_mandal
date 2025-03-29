"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MinusIcon, PlusIcon, SaveIcon } from "lucide-react"

// Define the data type
type Item = {
  id: string
  name: string
  quantity: number
}

export default function DataTable() {
  // Sample initial data
  const [data, setData] = React.useState<Item[]>([
    { id: "1", name: "Product A", quantity: 5 },
    { id: "2", name: "Product B", quantity: 10 },
    { id: "3", name: "Product C", quantity: 3 },
    { id: "4", name: "Product D", quantity: 8 },
    { id: "5", name: "Product E", quantity: 12 },
  ])

  // State for tracking which row is being edited
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editValue, setEditValue] = React.useState<number>(0)

  // Start editing a row
  const startEditing = (item: Item) => {
    setEditingId(item.id)
    setEditValue(item.quantity)
  }

  // Save the edited value
  const saveEdit = () => {
    if (editingId) {
      setData(data.map((item) => (item.id === editingId ? { ...item, quantity: editValue } : item)))
      setEditingId(null)
    }
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  // Increment quantity
  const incrementQuantity = (id: string) => {
    setData(data.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  // Decrement quantity
  const decrementQuantity = (id: string) => {
    setData(data.map((item) => (item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <Input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(Number(e.target.value))}
                    className="w-24"
                    min={0}
                  />
                ) : (
                  <span>{item.quantity}</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingId === item.id ? (
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      Cancel
                    </Button>
                    <Button variant="default" size="sm" onClick={saveEdit}>
                      <SaveIcon className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => decrementQuantity(item.id)}>
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => incrementQuantity(item.id)}>
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => startEditing(item)}>
                      Edit
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

