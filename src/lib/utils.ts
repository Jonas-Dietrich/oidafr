import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Project: RssFrontend
 * Created by: eibmac20
 * Date: 3. 5. 2024
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
