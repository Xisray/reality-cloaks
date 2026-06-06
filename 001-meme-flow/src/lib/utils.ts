import type { MediaType } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function detectType(url: string): MediaType {
  const lower = url.toLowerCase().split("?")[0]
  if (lower.endsWith(".gif")) return "gif"
  if (
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".ogg")
  )
    return "video"
  return "image"
}

export function preloadImage(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = url
  })
}

export function preloadVideo(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.onloadedmetadata = () =>
      resolve({ width: video.videoWidth || 16, height: video.videoHeight || 9 })
    video.onerror = () => reject(new Error("Failed to load video"))
    video.src = url
    video.load()
  })
}

