import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  
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
  user: defineTable({
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    email: v.string(),
    password: v.optional(v.string()),
    image: v.optional(v.string()),
    role: v.string(),
  }),
});
