"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Dispatch, SetStateAction, useState } from "react";
import { addSupplierSchema } from "@/lib/validation";

const addCategorySchema = z.object({
  category: z
    .string()
    .min(2, "Category must be at least 2 characters")
    .max(50, "Category must be less than 50 characters"),
});

const SelectCategory = ({
  className,
  addBtnText,
  value,
  onChange,
  onBlur,
  name,
}: {
  className?: string;
  addBtnText?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
}) => {
  const [openPopover, setopenPopover] = useState(false);
  const categories = useQuery(api.myFunctions.listCategories);
  const suppliers = useQuery(api.myFunctions.listSuppliers);

  return (
    <Select value={value} onValueChange={onChange} name={name}>
      <SelectTrigger className={className ? className : "w-full"}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {addBtnText === "Add Category" &&
        categories &&
        categories.length > 0 ? (
          categories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              <div className="flex items-center justify-between w-full overflow-hidden">
                <p className="w-full pr-10">{category.category}</p>
              </div>
            </SelectItem>
          ))
        ) : addBtnText === "Add Category" ? (
          <div className="text-center py-4 text-sm">No categories found</div>
        ) : null}
        {addBtnText === "Add Supplier" && suppliers && suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <SelectItem key={supplier._id} value={supplier._id}>
              <div className="flex items-center justify-between w-full overflow-hidden">
                <p className="w-full pr-10">{supplier.companyName}</p>
                <p className="w-full pr-10">{supplier.supplierName}</p>
                <p className="w-full">{supplier.phone}</p>
              </div>
            </SelectItem>
          ))
        ) : addBtnText === "Add Supplier" ? (
          <div className="text-center py-4 text-sm">No suppliers found</div>
        ) : null}

        {addBtnText !== "Add Unity" && (
          <div className="w-full flex items-center justify-center">
            <Popover
              open={openPopover}
              onOpenChange={() => setopenPopover(!openPopover)}
            >
              <PopoverTrigger className="w-full">
                <div className="cursor-pointer hover:bg-indigo-200 text-indigo-950 font-semibold rounded-md px-2 py-1 flex items-center justify-center bg-indigo-50">
                  {addBtnText}
                </div>
              </PopoverTrigger>
              <PopoverContent>
                {addBtnText === "Add Category" ? (
                  <AddCategory setOpenPopover={setopenPopover} />
                ) : (
                  <AddSupplier setOpenPopover={setopenPopover} />
                )}
              </PopoverContent>
            </Popover>
          </div>
        )}

        {addBtnText === "Add Unity" && (
          <>
            <SelectItem value="kg">Kg</SelectItem>
            <SelectItem value="litre">Litre</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;

const AddCategory = ({
  setOpenPopover,
}: {
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}) => {
  const Category = useMutation(api.myFunctions.addCategory);
  const categories = useQuery(api.myFunctions.listCategories);

  // 1. Define your form.
  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      category: "",
    },
  });

  // 2. Define a manual validation and submit handler
  async function addCategories() {
    // Manually trigger validation
    const isValid = await form.trigger("category");

    if (!isValid) {
      return; // Stop if validation fails
    }

    const values = form.getValues();
    const categoryName = values.category.trim().toLowerCase();

    // Check if category already exists
    if (
      categories &&
      categories.some((cat) => cat.category.toLowerCase() === categoryName)
    ) {
      form.setError("category", {
        type: "manual",
        message: "This category already exists",
      });
      return;
    }

    try {
      await Category({ category: categoryName });
      form.reset();
      setOpenPopover(false);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="eg:vegetable,grain,oil" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={addCategories}
          className="w-full cursor-pointer"
        >
          Add
        </Button>
      </div>
    </Form>
  );
};

const AddSupplier = ({
  setOpenPopover,
}: {
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
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
      setOpenPopover(false);
    } catch (error) {
      console.error("Failed to add supplier:", error);
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="supplierName"
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
          name="companyName"
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
