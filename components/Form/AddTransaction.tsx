"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { addItemSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectCategory from "../SelectCategory";
import { useState } from "react";

export function AddTransaction({setOpenDialog}:{setOpenDialog: (open: boolean) => void}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof addItemSchema>>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      itemName: "",
      category: "",
      quantity: 0,
      suplier: "",
      unity: "",
      totalPrice: 0,
      unityPrice: 0,
    },
  });
  const currentDate = new Date();
  const creationTime =
    currentDate.getTime() + currentDate.getMilliseconds() / 1000;
  // console.log(`_creationTime: ${creationTime}`);

  const addPurchaseItemInDB = useMutation(api.myFunctions.addPurchaseItemInDB);
  const updateSupplierInDB = useMutation(api.myFunctions.updateSupplier);
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addItemSchema>) {
    const status = values.quantity > 10 ? "in-stock" : "low-stock";
    console.log('here');
    
    console.log("values", values,status);
    
    await Promise.all([
      addPurchaseItemInDB({
        category: values.category as Id<"category">,
        itemName: values.itemName,
        suplierName: values.suplier as Id<"supplier">,
        quantity: values.quantity,
        unity: values.unity,
        unityPrice: values.unityPrice,
        status: status,
        totalPrice: values.totalPrice,
      }),
      updateSupplierInDB({
        id: values.suplier as Id<"supplier">,
        lastDelivery: creationTime,
      }),
    ]);

    form.reset();
    setOpenDialog(false)
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
                <FormLabel>MINISTRIES PAYMENT</FormLabel>
                <FormControl>
                  <SelectCategory
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    className={"w-[180px]"}
                    addBtnText="ADD MINISTRIES"
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
        <div className="flex gap-4 w-full ">
          <FormField
            control={form.control}
            name="unityPrice"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Unity Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Shyiramo uko uranguye"
                    {...field}
                    onBlur={()=>{
                      form.setValue("totalPrice", form.watch("quantity") * form.watch("unityPrice"));
                      
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalPrice"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Total Price</FormLabel>
                <FormControl>
                  <Input
                    
                    placeholder=""
                    {...field}
                    value={form.watch("quantity") * form.watch("unityPrice")}
                    disabled
                    
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
        <div className="flex justify-end ">
        <Button type="submit" className="cursor-pointer hover:bg-indigo-900">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
