"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { usePurchaseItemStore } from "@/lib/store"
import { formatted } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useQuery } from "convex/react"
import { Edit2, Trash2 } from "lucide-react"

const ShowCategory = ({categoryId}:{categoryId:Id<'category'>}) => {
  const{category,setCategory} = usePurchaseItemStore()
  const categoryName = useQuery(api.myFunctions.getCategoryById, {id:categoryId}) as Doc<'category'> | null
  return(
    <div className="flex items-center space-x-2">
      
      <p className="capitalize">{categoryName?.category}</p>
    </div>
  )
}
const ShowSupplier = ({supplier}:{supplier:Id<'supplier'>}) => {
  const supplierName = useQuery(api.myFunctions.getSupplierById, {id:supplier}) as Doc<'supplier'> | null
  return(
    <div className="flex items-center space-x-2">
      
      <p className="capitalize">{supplierName?.supplierName}</p>
    </div>
  )
}
export const columns: ColumnDef<Doc<'purchaseItem'>>[] = [
  
  {
    accessorKey: "itemName",
    header: "Item Name",
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
    cell: ({ row }) => {
      const supplier = row.getValue("supplierName") as Id<'supplier'>
      return <ShowSupplier supplier={supplier} />
    }
  },
  {
    accessorKey: "quantity",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as Id<'category'>
      return <ShowCategory categoryId={category} />
    }
  },
  {
    accessorKey: "unity",
    header: "UnIty",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("quantity") as number
      return (
        <p className={`capitalize ${status > 10  ? "text-green-600" : "text-orange-600"}`}>
          {status > 10 ? "In Stock" : "Low Stock"}
        </p>
      )
    }
  },
  {
    accessorKey: "_creationTime",
    header: "last updated",
    cell:({row})=>{
      const date = row.getValue('_creationTime') as number
return(
  <p>{formatted(date)}</p>
)
    }
  },
  { 
    header: 'Actions', 
    accessorKey: '_id',
    cell: ({row}) => (
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-800">
          <Edit2 size={18} />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <Trash2 size={18} />
        </button>
      </div>
    )
  },
]
