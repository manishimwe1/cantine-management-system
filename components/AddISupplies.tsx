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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="!bg-white rounded-md shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors cursor-pointer">
                <Plus size={18} className="mr-2" />
                Add New Item
              </div>
            </TooltipTrigger>
            <TooltipContent className="text-indigo-950 bg-indigo-100">
              <p className=" bg-indigo-100 !text-indigo-900 w-full">Ogera ibirangurwa muri system</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
            <SuppliersForm />
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddISupplies;
