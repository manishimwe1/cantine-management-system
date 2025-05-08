"use client";

import { Dispatch, SetStateAction } from "react";
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
import { addSupplierSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddSupplier = ({
  setOpenPopover,
  openPopover
}: {
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  openPopover: boolean;
}) => {
  const addSupliers = useMutation(api.myFunctions.addSupplier);
  const suppliers = useQuery(api.myFunctions.listSuppliers);

  // 1. Define your form.
  const form = useForm<z.infer<typeof addSupplierSchema>>({
    resolver: zodResolver(addSupplierSchema),
    defaultValues: {
      companyName: "",
      itemSuplied: "",
      phone: 0,
      supplierName: "",
    },
  });

  // 2. Define a manual validation and submit handler
  async function addSupliersInDb() {
    // Manually trigger validation for all fields
    const isValid = await form.trigger();

    if (!isValid) {
      return; // Stop if validation fails
    }

    const values = form.getValues();

    // Check if supplier with same name already exists
    if (
      suppliers &&
      suppliers.some(
        (sup) =>
          sup.supplierName.toLowerCase() ===
          values.supplierName.trim().toLowerCase(),
      )
    ) {
      form.setError("supplierName", {
        type: "manual",
        message: "This supplier already exists",
      });
      return;
    }

    try {
      await addSupliers({
        companyName: values.companyName.trim(),
        itemSuplied: values.itemSuplied.trim(),
        phone: Number(values.phone),
        supplierName: values.supplierName.trim(),
      });
      form.reset();
      setOpenPopover(!openPopover);
    } catch (error) {
      console.error("Failed to add supplier:", error);
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-8 flex  items-center justify-center flex-col">
        <div className="w-full flex gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supplierName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier Person</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder=""
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="itemSuplied"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Supplied</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="button"
          onClick={addSupliersInDb}
          className="w-full cursor-pointer"
        >
          Add
        </Button>
      </div>
    </Form>
  );
};

export default AddSupplier;
