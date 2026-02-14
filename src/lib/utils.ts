import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBedrag(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDatum(dateStr: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function formatDatumKort(dateStr: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

export const statusKleuren: Record<string, string> = {
  gepland: "bg-blue-100 text-blue-800",
  bezig: "bg-yellow-100 text-yellow-800",
  afgerond: "bg-green-100 text-green-800",
  uitgesteld: "bg-gray-100 text-gray-800",
  open: "bg-blue-100 text-blue-800",
  in_behandeling: "bg-yellow-100 text-yellow-800",
  afgewezen: "bg-red-100 text-red-800",
  stemmen: "bg-purple-100 text-purple-800",
  aangenomen: "bg-green-100 text-green-800",
};

export const prioriteitKleuren: Record<string, string> = {
  laag: "bg-gray-100 text-gray-700",
  normaal: "bg-blue-100 text-blue-700",
  hoog: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

export const maandNamen = [
  "Jan",
  "Feb",
  "Mrt",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];
