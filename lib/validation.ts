import { z } from "zod";

export const addItemSchema = z.object({
  itemName: z.string().min(2, {
    message: "itemName must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "category must be at least 2 characters.",
  }),
  quantity: z.number().min(1, {
    message: "quantity must be at least 1.",
  }),
  unity: z.string().min(2, {
    message: "category must be at least 2 characters.",
  }),
//   status: z.enum(["In Stock", "Out of Stock", "Low Stock"], {
//     required_error: "Please select a status",
//   }),
});
