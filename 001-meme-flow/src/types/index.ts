export type MediaType = "image" | "video" | "gif"

export interface MediaSource {
  url: string
  type?: MediaType
  width?: number
  height?: number
}
