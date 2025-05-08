'use client";'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Plus } from "lucide-react";
import { SuppliersForm } from "./Form/SupliersForm";
import { useState } from "react";
import { AddTransaction } from "./Form/AddTransaction";

const AddISupplies = ({btnText}:{btnText:string}) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={()=>setOpenDialog(!openDialog)}>
      <DialogTrigger>
        <div className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors cursor-pointer">
          
          <Plus size={18} className="mr-2" />
          {btnText}
        </div>
      </DialogTrigger>
      <DialogContent className="bg-indigo-50 overflow-y-scroll max-h-[95vh]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          {
            btnText === "Add New Item" && (

              <SuppliersForm setOpenDialog={setOpenDialog}/>
            )

          }
          {
            btnText === 'New Transaction' && (
              <AddTransaction setOpenDialog={setOpenDialog}/>
            )

          }
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddISupplies;
