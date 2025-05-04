import { hash } from "bcryptjs";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";
import {
  action,
  internalMutation,
  internalQuery,
  query,
} from "./_generated/server";

export const createUser = internalMutation({
  args: {
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    email: v.string(),
    password: v.optional(v.string()),
    role: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    console.log(args.firstname, args.email, args.image);

    const newUser = await ctx.db.insert("user", {
      firstname: args.firstname,
      lastname: args.lastname,
      email: args.email,
      password: args.password,
      role: args.role,
      image: args.image,
    });

    if (!newUser)
      return new ConvexError("something went wrong in creating user!");
    return newUser;
  },
});

export const getUser = internalQuery({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const User = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (!User) {
      throw new ConvexError("something went wrong in getting user!");
    }
    return User[0];
  },
});

export const getUserIndb = query({
  args: {
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const User = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (!User) {
      throw new ConvexError("something went wrong in creating user!");
    }
    return User[0];
  },
});
export const getAllUsers = query({
  handler: async (ctx) => {
    const User = await ctx.db.query("user").collect();

    if (!User) {
      throw new ConvexError("something went wrong in creating user!");
    }
    return User;
  },
});
export const registerUser = action({
  args: {
    firstname: v.string(),
    lastname: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.runQuery(internal.user.getUser, {
      email: args.email,
    });

    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    const hashPass = await hash(args.password, 12);
    const newUser = await ctx.runMutation(internal.user.createUser, {
      firstname: args.firstname,
      lastname: args.lastname,
      email: args.email,
      password: hashPass,
      role: args.role,
    });

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    console.log("User created successfully");
    return { success: true, error: null };
  },
});
