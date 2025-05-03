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
import { SuppliersForm } from "./SupliersForm";

const AddISupplies = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors cursor-pointer">
          
          <Plus size={18} className="mr-2" />
          Add New Item
        </div>
      </DialogTrigger>
      <DialogContent className="bg-indigo-50">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <SuppliersForm />
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddISupplies;
