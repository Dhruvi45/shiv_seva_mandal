"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export async function addEquipment(formData: FormData) {
  const name = formData.get("name") as string;
  const quantity = Number(formData.get("quantity"));

  if (!name || isNaN(quantity) || quantity <= 0) {
    throw new Error("Invalid input values.");
  }

  try {
    await prisma.equipment.create({
      data: { name, quantity },
    });

    revalidatePath("/"); // Refresh the page after adding equipment
  } catch (error) {
    throw new Error("Failed to add equipment.");
  }
}

export async function getEquipmentList() {
  return await prisma.equipment.findMany();
}

export async function updateEquipmentQuantity(id: string, quantity: number) {
    if (quantity < 0) throw new Error("Quantity cannot be negative");
  
    try {
      await prisma.equipment.update({
        where: { id },
        data: { quantity },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to update quantity" };
    }
  }
  