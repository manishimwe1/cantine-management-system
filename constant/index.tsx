
import { 
    LayoutDashboard, 
    PackageOpen, 
    Boxes, 
    ChefHat, 
    DollarSign,
    Users,
    Settings,
    LogOut
  } from 'lucide-react';

export const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Inventory', icon: <PackageOpen size={20} />, path: '/inventory' },
    { name: 'Assets', icon: <Boxes size={20} />, path: '/assets' },
    { name: 'Kitchen', icon: <ChefHat size={20} />, path: '/kitchen' },
    { name: 'Finance', icon: <DollarSign size={20} />, path: '/finance' },
    { name: 'Clients', icon: <Users size={20} />, path: '/clients' },
  ];