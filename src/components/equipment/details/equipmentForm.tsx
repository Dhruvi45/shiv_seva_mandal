"use client";

import { useState } from "react";
// Removed incorrect import
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addEquipment } from "@/lib/equipment";

export function EquipmentForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
          const formData = new FormData(event.currentTarget);
          await addEquipment(formData);
          setError(null);
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : "An error occurred";
          setError(errorMessage);
        }
        setLoading(false);
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="name" className="mb-3">Equipment Name</Label>
        <Input id="name" name="name" required />
      </div>

      <div>
        <Label htmlFor="quantity" className="mb-3">Quantity</Label>
        <Input id="quantity" name="quantity" type="number" required />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Equipment"}
      </Button>
    </form>
  );
}
