import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncatePublicKey = (address: string, chars = 4): string => {
  const start = address.slice(0, chars);
  const end = address.slice(-chars);
  return `${start}...${end}`;
};
