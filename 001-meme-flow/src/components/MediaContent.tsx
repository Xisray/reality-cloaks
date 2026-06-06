import { detectType, preloadImage, preloadVideo } from "@/lib/utils"
import type { MediaSource } from "@/types"
import { Skeleton } from "./ui/skeleton"
import { AlertTriangle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import React from "react"

interface MediaContentProps {
  media: MediaSource
}

function MediaContent({ media }: MediaContentProps) {
  const type = media.type ?? detectType(media.url)

  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ["media-meta", media.url],
    queryFn: () =>
      type === "video" ? preloadVideo(media.url) : preloadImage(media.url),
    staleTime: Infinity,
    retry: 1,
  })

  const aspectRatio = data
    ? data.width / data.height
    : media.width && media.height
      ? media.width / media.height
      : 1

  const paddingTop = `${(1 / aspectRatio) * 100}%`

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm"
      style={{ paddingTop }}
    >
      {isLoading && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}

      {isError && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <span className="text-xs">Не удалось загрузить медиа</span>
        </div>
      )}

      {!isError && (
        <>
          {type === "video" ? (
            <video
              ref={videoRef}
              src={media.url}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: isLoading ? 0 : 1 }}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controls={false}
            />
          ) : (
            <img
              src={media.url}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: isLoading ? 0 : 1 }}
            />
          )}
        </>
      )}
    </div>
  )
}

export default MediaContent
