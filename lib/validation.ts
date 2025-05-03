import { z } from "zod";

export const addItemSchema = z.object({
  itemName: z.string().min(2, {
    message: "itemName must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "category must be at least 2 characters.",
  }),
  quantity: z.coerce.number().min(1, {
    message: "quantity must be at least 1.",
  }),
  unity: z.string().min(2, {
    message: "category must be at least 2 characters.",
  }),
  suplier: z.string().min(2, {
    message: "category must be at least 2 characters.",
  }),

});

export const addSupplierSchema = z.object({
    supplierName: z.string().min(2).max(50),
    companyName: z.string().min(2).max(50),
    phone: z.coerce.number().min(3),
    itemSuplied: z.string().min(2).max(50),
  });

  



