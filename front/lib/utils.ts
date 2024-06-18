import { type ClassValue, clsx } from "clsx"
import { Palette_Mosaic, Recursive } from "next/font/google";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const recursive = Recursive({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-recursive"
});

export const palettemosaic = Palette_Mosaic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-palettemosaic"
});
