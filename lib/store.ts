// store/purchaseItemStore.ts
import { create } from "zustand";
import { Doc, Id } from "@/convex/_generated/dataModel";
export type Supplier = {
  _id: Id<"supplier">;
  _creationTime: number;
  supplierName: string;
  companyName: string;
  phone: number;
  itemSuplied: string;
};

interface PurchaseItemStore {
  purchaseItems: Doc<"purchaseItem">[] | null;
  setPurchaseItems: (items: Doc<"purchaseItem">[]) => void;
  category:string[],
  setCategory: (newCategories: string[]) => void;
  suppliers: Supplier[];
  setSuppliers: (newSuppliers: Supplier[]) => void;
}

export const usePurchaseItemStore = create<PurchaseItemStore>((set,get) => ({
  purchaseItems: null,
  setPurchaseItems: (items) => set({ purchaseItems: items }),
  category: [],
  setCategory: (newCategories) =>
    set((state) => ({
      category: [
        ...new Set([...state.category, ...newCategories]), // no duplicates
      ],
    })),

  suppliers: [],
  setSuppliers: (newSuppliers) => set({ suppliers: newSuppliers })
    
}));

