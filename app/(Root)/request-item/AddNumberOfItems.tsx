"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";
import { useAddRequestItemStore } from "@/lib/store";
import { Id } from "@/convex/_generated/dataModel";

const additemSchema = z.object({
  numberOfItem: z.coerce.number(),
});

const AddNumberOfItems = ({
  quantity,
  id,
}: {
  quantity: number;
  id: Id<"purchaseItem">;
}) => {
  const { addRequestItem: addReqItem = [], setAddRequestItem } =
    useAddRequestItemStore();

  const form = useForm<z.infer<typeof additemSchema>>({
    resolver: zodResolver(additemSchema),
    defaultValues: {
      numberOfItem: 0,
    },
  });

  async function addRequestItem(values: z.infer<typeof additemSchema>) {
    const existingItemIndex = addReqItem.findIndex((item) => item.id === id);
    let updatedItems;

    if (existingItemIndex !== -1) {
      updatedItems = [...addReqItem];
      updatedItems[existingItemIndex].quantity = values.numberOfItem;
    } else {
      updatedItems = [...addReqItem, { id, quantity: values.numberOfItem }];
    }

    setAddRequestItem(updatedItems);

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          addRequestItem(values);
        })}
      >
        <div className="flex items-center justify-center gap-4">
          <FormField
            control={form.control}
            name="numberOfItem"
            render={({ field }) => (
              <FormItem className="w-[100px]">
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    max={quantity}
                    type="number"
                    onChange={(e) => {
                      const newValue = Number(e.target.value);

                      // Check if the value exceeds the quantity
                      if (newValue > quantity) {
                        form.setError("numberOfItem", {
                          type: "manual",
                          message: `Cannot exceed ${quantity}`,
                        });
                      } else {
                        // Clear the error if the value is valid
                        form.clearErrors("numberOfItem");
                      }

                      field.onChange(e); // Update the field value in the form

                      // Update the state
                      const existingItemIndex = addReqItem.findIndex(
                        (item) => item.id === id
                      );
                      let updatedItems;

                      if (existingItemIndex !== -1) {
                        updatedItems = [...addReqItem];
                        updatedItems[existingItemIndex].quantity = newValue;
                      } else {
                        updatedItems = [
                          ...addReqItem,
                          { id, quantity: newValue },
                        ];
                      }

                      setAddRequestItem(updatedItems);
                      console.log("Updated addReqItem on input change:", updatedItems);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size={"sm"}
            variant="secondary"
            className="cursor-pointer hover:bg-indigo-200"
          >
            <Send />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddNumberOfItems;
