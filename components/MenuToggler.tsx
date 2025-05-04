"use client"

import { useSidebarStore } from '@/lib/store'
import { MenuIcon } from 'lucide-react'
import React from 'react'

const MenuToggler = () => {
    const { toggleSidebar,sidebarOpen } = useSidebarStore()  
    
    return (
        <button className='cursor-pointer z-50'  onClick={()=>{
        console.log(sidebarOpen,'sidebarOpen');
        toggleSidebar()
    }}><MenuIcon className='' size={24} /></button>
  )
}

export default MenuToggler