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

const addCategorySchema = z.object({
  category: z.string().min(2).max(50),
});

const SelectCategory = ({
  className,
  addBtnText,
}: {
  className?: string;
  addBtnText?: string;
}) => {
    const [openPopover, setopenPopover] = useState(false)
  const categories = useQuery(api.myFunctions.listCategories);
  console.log(categories);
  return (
    <Select>
      <SelectTrigger className={className ? className : "w-full"}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {addBtnText === "Add Category" && (
          <>
            {categories && (
              categories.length !== 0 ? (
                categories.map((category) => (
                    <SelectItem key={category._id} value={category.category} className="capitalize">
                      {category.category}
                    </SelectItem>
                  ))
              ): (
                <div className="text-center py-4 text-sm">
                  No categories found
                </div>
              )
            ) }
          </>
        )}
        {addBtnText === "AddSupplier" && (
          <>
            <SelectItem value="light" className="cursor-pointer">
              Light
            </SelectItem>
          </>
        )}
        {addBtnText && (
          <div className="cursor-pointer w-full flex items-center justify-center">
            <div className=" items-end w-full justify-end">
              <Popover open={openPopover} onOpenChange={()=>setopenPopover(!openPopover)}>
                <PopoverTrigger className="w-full">
                  <div className="!w-full  cursor-pointer hover:bg-indigo-200 text-indigo-950 font-semibold rounded-md px-2 py-1 flex items-center justify-center">
                    {addBtnText}
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  {addBtnText === "Add Category" ? (
                    <AddCategory setOpenPopover={setopenPopover} />
                  ) : (
                    <AddSupplier />
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        {!addBtnText && (
          <>
            <SelectItem value="light" className="cursor-pointer">
              Light
            </SelectItem>
            <SelectItem value="dark" className="cursor-pointer">
              Dark
            </SelectItem>
            <SelectItem value="system" className="cursor-pointer">
              System
            </SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;

const AddCategory = ({setOpenPopover}:{setOpenPopover:Dispatch<SetStateAction<boolean>>}) => {
  const Category = useMutation(api.myFunctions.addCategory);
  // 1. Define your form.
  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      category: "",
    },
  });
  // 2. Define a submit handler.
  async function addCategories(values: z.infer<typeof addCategorySchema>) {
      console.log(values);
    await Category({ category: values.category });
    form.reset()
    setOpenPopover(false)
    
  }
  return (
    <Form {...form}>
      <form className="space-y-8">
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
        <Button type="button" onClick={()=>{addCategories({category:form.getValues('category')})}} className="w-full cursor-pointer">
          Add
        </Button>
      </form>
    </Form>
  );
};
const AddSupplier = () => {
  return <div>AddSupplier</div>;
};
