'use client';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentForm } from "./equipmentForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function AddButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-5 w-5" />
          Add Equipment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <EquipmentForm />
      </DialogContent>
    </Dialog>
  );
}
