import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  category: defineTable({
    category: v.string(),
  }),
  supplier: defineTable({
    supplierName: v.string(),
    companyName: v.string(),
    phone: v.number(),
    itemSuplied:v.string(),

  }),
  purchaseItem: defineTable({
    category: v.id('category'),
    itemName: v.string(),
    supplierName: v.id('supplier'),
    quantity: v.number(),
    unity: v.string(),
    

  }),
});
