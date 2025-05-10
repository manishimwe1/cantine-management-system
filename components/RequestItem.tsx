'use client";'


import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { useAddRequestItemStore } from '@/lib/store';
import { toast } from "sonner"


const RequestItem = () => {
     const { addRequestItem } =
        useAddRequestItemStore();

        const addReqItem = ()=>{
          if(addRequestItem.length === 0){
            return (
              toast.error("Please add items to the request.", {
              position: "top-right",
              description: "",
              richColors: true,
              duration: 2000,
              })
            )
          }
            console.log('addRequestItem',addRequestItem);
        }

        
  return (
    <Button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors cursor-pointer" onClick={()=>addReqItem()}>
          
          <Plus size={18} className="mr-2" />
          Request Item
        </Button>
  )
}

export default RequestItem