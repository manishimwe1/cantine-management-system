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

export type PurchaseItem = {
  _id: Id<"purchaseItem">;
  _creationTime: number;
  category: Id<"category">;
  supplierName: Id<"supplier">;
  itemName: string;
  quantity: number;
  unity: string;
};

type PurchaseStore = {
  items: Doc<'purchaseItem'>[];
  status: "LoadingFirstPage" | "Exhausted" | "LoadingMore" | "LoadedAll" | "CanLoadMore"; // adjust to fit actual types
  setItems: (newItems: PurchaseItem[]) => void;
  addItems: (moreItems: PurchaseItem[]) => void;
  setStatus: (newStatus: PurchaseStore["status"]) => void;
};

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

export const usePurchaseStore = create<PurchaseStore>((set) => ({
  items: [],
  status: "LoadingFirstPage",
  setItems: (newItems) => set({ items: newItems }),
  addItems: (moreItems) =>
    set((state) => ({ items: [...state.items, ...moreItems] })),
  setStatus: (newStatus) => set({ status: newStatus }),
}));

interface SidebarStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
}));