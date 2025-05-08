'use client";'


import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { useAddRequestItemStore } from '@/lib/store';

const RequestItem = () => {
     const { addRequestItem } =
        useAddRequestItemStore();

        const addReqItem = ()=>{

            console.log('addRequestItem',addRequestItem);
        }

        
  return (
    <Button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors cursor-pointer" onClick={()=>addRequestItem}>
          
          <Plus size={18} className="mr-2" />
          Request Item
        </Button>
  )
}

export default RequestItem