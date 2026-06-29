import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge configured to recognize this project's custom font-size
 * utilities (text-display, text-label-md, …). Without this, tailwind-merge
 * misreads them as text-*color* classes and strips real colors like
 * `text-white` when both appear on one element (e.g. button size + color).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "headline-lg",
            "headline-lg-mobile",
            "headline-md",
            "body-lg",
            "body-md",
            "label-md",
            "label-sm",
          ],
        },
      ],
    },
  },
});

/**
 * Merge Tailwind class names, resolving conflicts (last wins).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
