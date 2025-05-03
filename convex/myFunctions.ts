import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";


export const purchaseItem = query({

  handler: async (ctx) => {
    
    const supplier = await ctx.db
      .query("purchaseItem")
      .order("desc")
    
    return supplier.collect()
    
  },
});

export const addPurchaseItemInDB = mutation({
  args: {
    category: v.id('category'),
    itemName: v.string(),
    suplierName: v.id('supplier'),
    quantity: v.number(),
    unity: v.string(),
  },

  handler: async (ctx, args) => {
    
    const id = await ctx.db.insert("purchaseItem", { category: args.category,itemName:args.itemName,quantity:args.quantity,supplierName:args.suplierName,unity:args.unity });

    console.log("Added new document with id:", id);
  },
});

export const getSupplierById = query({
  args: {
    id: v.id("supplier"),
  },

  handler: async (ctx, args) => {
    
    const supplier = await ctx.db.get(args.id);
    
    return supplier;
  },
})

export const listSuppliers = query({

  handler: async (ctx) => {
    
    const supplier = await ctx.db
      .query("supplier")
      .order("desc")
    
    return supplier.collect()
    
  },
});

export const addSupplier = mutation({
  args: {
    supplierName: v.string(),
    companyName: v.string(),
    phone: v.number(),
    itemSuplied: v.string(),
  },

  handler: async (ctx, args) => {
    
    const id = await ctx.db.insert("supplier", { supplierName: args.supplierName,companyName:args.companyName,phone:args.phone,itemSuplied:args.itemSuplied });

    console.log("Added new document with id:", id);
  },
});


export const listCategories = query({

  handler: async (ctx) => {
    
    const category = await ctx.db
      .query("category")
      .order("desc")
    
    return category.collect()
    
  },
});

export const getCategoryById = query({
  args: {
    id: v.id("category"),
  },

  handler: async (ctx, args) => {
    
    const category = await ctx.db.get(args.id);
    
    return category;
  },
})

export const addCategory = mutation({
  args: {
    category: v.string(),
  },

  handler: async (ctx, args) => {
    

    const id = await ctx.db.insert("category", { category: args.category });

    console.log("Added new document with id:", id);
  },
});

// You can fetch data from and send data to third-party APIs via an action:
// export const myAction = action({
//   // Validators for arguments.
//   args: {
//     first: v.number(),
//     second: v.string(),
//   },

//   // Action implementation.
//   handler: async (ctx, args) => {
//     //// Use the browser-like `fetch` API to send HTTP requests.
//     //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
//     // const response = await ctx.fetch("https://api.thirdpartyservice.com");
//     // const data = await response.json();

//     //// Query data by running Convex queries.
//     const data = await ctx.runQuery(api.myFunctions.listNumbers, {
//       count: 10,
//     });
//     console.log(data);

//     //// Write data by running Convex mutations.
//     await ctx.runMutation(api.myFunctions.addCategory, {
//       value: args.first,
//     });
//   },
// });
