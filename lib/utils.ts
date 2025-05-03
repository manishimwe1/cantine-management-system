import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatted = (creationTime:number) => {
  return format(new Date(Math.floor(creationTime)), "yyyy-MM-dd HH:mm:ss");
};
