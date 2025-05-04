import { Doc, Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

export const supplierColumns: ColumnDef<Doc<'supplier'>>[] = [
    { header: 'Supplier Name', accessorKey: 'supplierName' },
    { header: 'Company Name', accessorKey: 'companyName' },
    { header: 'Phone', accessorKey: 'phone' },
    { header: 'Items Supplied', accessorKey: 'itemSuplied', cell: ({row}) => {
      const itemSupplied = row.getValue('itemSuplied') as Id<'supplier'>;
      return <p>{itemSupplied}</p>;
    } },
    { header: 'Last Delivery', accessorKey: 'lastDelivery' , cell: ({row}) => {
      const lastDelivery = row.getValue('lastDelivery') as number;
      const formattedDate = lastDelivery ? new Date(lastDelivery).toLocaleString() : 'N/A';
      return <p>{formattedDate}</p>;
    }},
    { 
      header: 'Actions', 
      accessorKey: '_creationTime',
      cell: ({row}) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Edit size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      )
    },
  ];