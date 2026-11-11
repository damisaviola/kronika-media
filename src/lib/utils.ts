import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const HARI_INDO = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const BULAN_INDO = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function formatTanggalIndo(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  const hari = HARI_INDO[date.getDay()];
  const tanggal = date.getDate();
  const bulan = BULAN_INDO[date.getMonth()];
  const tahun = date.getFullYear();

  return `${hari}, ${tanggal} ${bulan} ${tahun}`;
}

export function formatTanggalSingkat(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  const tanggal = date.getDate();
  const bulan = BULAN_INDO[date.getMonth()];
  const tahun = date.getFullYear();

  return `${tanggal} ${bulan} ${tahun}`;
}

export function formatJamWIB(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  // UTC+7 for WIB
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const wibDate = new Date(utc + 3600000 * 7);

  const jam = String(wibDate.getHours()).padStart(2, "0");
  const menit = String(wibDate.getMinutes()).padStart(2, "0");

  return `${jam}:${menit} WIB`;
}

export function calculateReadingTime(text: string): number {
  if (!text) return 1;
  const cleanText = text.replace(/<[^>]*>?/gm, "").trim();
  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words.length / wordsPerMinute);
  return Math.max(1, minutes);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
