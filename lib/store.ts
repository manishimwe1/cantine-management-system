// store/purchaseItemStore.ts
import { create } from "zustand";
import { Doc } from "@/convex/_generated/dataModel";

interface PurchaseItemStore {
  purchaseItems: Doc<"purchaseItem">[] | null;
  setPurchaseItems: (items: Doc<"purchaseItem">[]) => void;
  category:string[],
  setCategory: (newCategories: string[]) => void;
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
}));

