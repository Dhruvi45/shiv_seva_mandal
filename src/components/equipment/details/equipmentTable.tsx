"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MinusIcon, PlusIcon, SaveIcon, Loader2 } from "lucide-react"
import useSWR from "swr"
import { getEquipmentList, updateEquipmentQuantity } from "@/lib/equipment"

// Define the data type
type Item = {
  id: string
  name: string
  quantity: number
}

export default function EquipmentTable() {
  // Fetch data from API
  const { data, mutate, isLoading } = useSWR<Item[]>("/api/equipment", getEquipmentList, {
    revalidateOnFocus: false,
  })

  // State for tracking which row is being edited
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editValue, setEditValue] = React.useState<number>(0)
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false)

  // Start editing a row
  const startEditing = (item: Item) => {
    setEditingId(item.id)
    setEditValue(item.quantity)
  }

  // Save the edited value
  const saveEdit = async () => {
    if (editingId) {
      setIsUpdating(true)
      try {
        await updateEquipmentQuantity(editingId, editValue)
        mutate()
      } catch (error) {
        console.error("Failed to update quantity:", error)
      } finally {
        setIsUpdating(false)
        setEditingId(null)
      }
    }
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  // Increment quantity
  const incrementQuantity = async (id: string) => {
    const updatedItem = data?.find((item) => item.id === id)
    if (updatedItem) {
      setIsUpdating(true)
      try {
        await updateEquipmentQuantity(id, updatedItem.quantity + 1)
        mutate()
      } catch (error) {
        console.error("Failed to increment quantity:", error)
      } finally {
        setIsUpdating(false)
      }
    }
  }

  // Decrement quantity
  const decrementQuantity = async (id: string) => {
    const updatedItem = data?.find((item) => item.id === id)
    if (updatedItem && updatedItem.quantity > 0) {
      setIsUpdating(true)
      try {
        await updateEquipmentQuantity(id, updatedItem.quantity - 1)
        mutate()
      } catch (error) {
        console.error("Failed to decrement quantity:", error)
      } finally {
        setIsUpdating(false)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary-medium" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-primary-dark to-primary-medium p-4">
        <h2 className="text-white text-xl font-semibold">Equipment Details</h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-primary-light/10">
            <TableRow className="hover:bg-primary-light/5">
              <TableHead className="text-primary-deep font-bold">ID</TableHead>
              <TableHead className="text-primary-deep font-bold">Name</TableHead>
              <TableHead className="text-primary-deep font-bold">Quantity</TableHead>
              <TableHead className="text-primary-deep font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={`
                    ${index % 2 === 0 ? "bg-white" : "bg-primary-light/5"} 
                    hover:bg-primary-light/10 transition-colors
                  `}
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(Number(e.target.value))}
                        className="w-24 border-primary-medium focus:ring-primary-light"
                        min={0}
                      />
                    ) : (
                      <span className="inline-flex items-center justify-center min-w-[40px] h-8 px-3 rounded-full bg-primary-light/10 text-primary-dark font-medium">
                        {item.quantity}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingId === item.id ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={cancelEdit}
                          className="border-primary-medium text-primary-dark hover:bg-primary-light/10"
                          disabled={isUpdating}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={saveEdit}
                          className="bg-primary-medium hover:bg-primary-dark text-white"
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                          ) : (
                            <SaveIcon className="h-4 w-4 mr-1" />
                          )}
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decrementQuantity(item.id)}
                          className="h-8 w-8 border-primary-medium text-primary-dark hover:bg-primary-light/10"
                          disabled={isUpdating || item.quantity <= 0}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => incrementQuantity(item.id)}
                          className="h-8 w-8 border-primary-medium text-primary-dark hover:bg-primary-light/10"
                          disabled={isUpdating}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(item)}
                          className="border-primary-medium text-primary-dark hover:bg-primary-light/10"
                          disabled={isUpdating}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No equipment data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
        <Button className="bg-primary-medium hover:bg-primary-dark text-white flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Equipment
        </Button>
      </div>
    </div>
  )
}

