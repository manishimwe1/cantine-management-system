"use client"

import { Doc } from "@/convex/_generated/dataModel"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Doc<'purchaseItem'>>[] = [
  
  {
    accessorKey: "itemName",
    header: "Item Name",
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
  },
  {
    accessorKey: "quantity",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "unity",
    header: "UnIty",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "lastupdated",
    header: "last updated",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
]
