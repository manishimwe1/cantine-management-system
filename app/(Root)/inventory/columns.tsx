"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { usePurchaseItemStore } from "@/lib/store";
import { formatted } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "convex/react";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";


export const ShowLastDelivery = ({ supplierId }: { supplierId: Id<"supplier"> }) => {
  const supplierName = useQuery(api.myFunctions.getSupplierById, {
    id: supplierId,
  }) as Doc<"supplier"> | null;
  const lastDelivery = supplierName?.lastDelivery as number;
  const formattedDate = lastDelivery ? new Date(lastDelivery).toLocaleString() : "N/A";
  return (
    <div className="flex items-center space-x-2">
      <p className="capitalize">{formattedDate}</p>
    </div>
  );
}

const ShowCategory = ({ categoryId }: { categoryId: Id<"category"> }) => {
  const { category, setCategory } = usePurchaseItemStore();
  const categoryName = useQuery(api.myFunctions.getCategoryById, {
    id: categoryId,
  }) as Doc<"category"> | null;
  return (
    <div className="flex items-center space-x-2">
      <p className="capitalize">{categoryName?.category}</p>
    </div>
  );
};
const ShowSupplier = ({ supplier }: { supplier: Id<"supplier"> }) => {
  const supplierName = useQuery(api.myFunctions.getSupplierById, {
    id: supplier,
  }) as Doc<"supplier"> | null;
  return (
    <div className="flex items-center space-x-2">
      <p className="capitalize">{supplierName?.supplierName}</p>
    </div>
  );
};
export const columns: ColumnDef<Doc<"purchaseItem">>[] = [
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ({ row }) => {
      const itemName = row.getValue("itemName") as string;
      return <p className="uppercase">{itemName}</p>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as Id<"category">;
      return <ShowCategory categoryId={category} />;
    },
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
    cell: ({ row }) => {
      const supplier = row.getValue("supplierName") as Id<"supplier">;
      return <ShowSupplier supplier={supplier} />;
    },
  },
  {
    accessorKey: "quantity",
    header: "Amount",
  },
  
  {
    accessorKey: "unity",
    header: "Unity",
    cell:({row})=>{
      const unity = row.getValue('unity') as string
      return <p className="uppercase text-center">{unity}</p>
    }
  },
  {
    accessorKey: "unityPrice",
    header: "Unity/Price",
    cell:({row})=>{
      const unityPrice = row.getValue('unityPrice') as number
      return <p className=" text-center">{unityPrice.toLocaleString()} <span className="text-xs">rwf</span></p>
    }
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell:({row})=>{
      const totalPrice = row.getValue('totalPrice') as number
      return <p className=" text-center">{totalPrice.toLocaleString()} <span className="text-xs">rwf</span></p>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <p
          className={`capitalize ${status === 'in-stock' ? "text-green-600" : "text-orange-600"}`}
        >
          {status === 'in-stock' ? "In Stock" : "Low Stock"}
        </p>
      );
    },
  },
  {
    accessorKey: "_creationTime",
    header: "last delivery",
    cell: ({ row }) => {
      const supplierId = row.getValue("supplierName") as Id<"supplier">;
      return <ShowLastDelivery supplierId={supplierId}/>;
    },
  },
  {
    header: "Actions",
    accessorKey: "_id",
    cell: ({ row }) => (
      <div className="flex space-x-2 justify-end">
        {/* <button className="text-blue-600 hover:text-blue-800">
          <Edit2 size={18} />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <Trash2 size={18} />
        </button> */}
        <MoreVertical className=""/>
      </div>
    ),
  },
];
