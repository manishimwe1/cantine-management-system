"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addItemSchema } from "@/lib/validation";
import SelectCategory from "./SelectCategory";
import { use } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function SuppliersForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof addItemSchema>>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      itemName: "",
      category: "",
      quantity: 0,
      suplier: "",
      unity: "",
    },
  });
  const addPurchaseItemInDB = useMutation(api.myFunctions.addPurchaseItemInDB);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addItemSchema>) {
    
    await addPurchaseItemInDB({
      category: values.category as Id<'category'>,
      itemName: values.itemName,
      suplierName: values.suplier  as Id<'supplier'>,
      quantity: values.quantity,
      unity: values.unity,
    });
    form.reset();
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Shyiramo ikirangurwa" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <SelectCategory
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    className={"w-[180px]"}
                    addBtnText="Add Category"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full ">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Shyiramo ikirangurwa"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unity"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Unity</FormLabel>
                <FormControl>
                  <SelectCategory
                  addBtnText="Add Unity"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="suplier"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Select Supplier</FormLabel>
                <FormControl>
                  <SelectCategory
                    addBtnText="Add Supplier"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
