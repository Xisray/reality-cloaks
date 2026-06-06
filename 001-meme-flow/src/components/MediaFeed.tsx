import MEDIA_URLS from "@/consts/media"
import TITLES from "@/consts/titles"
import type { MediaSource } from "@/types"
import MediaCard from "./MediaCard"
import { useInfiniteQuery } from "@tanstack/react-query"
import React from "react"

interface MemeItem {
  id: string
  title: string
  likes: number
  comments: number
  media: MediaSource
}

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const pickRandom = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]

const PAGE_SIZE = 8

function generatePage(page: number): MemeItem[] {
  return Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `meme-${page}-${i}-${Math.random().toString(36).slice(2)}`,
    title: pickRandom(TITLES),
    likes: randInt(10, 9999),
    comments: randInt(0, 500),
    media: { url: pickRandom(MEDIA_URLS) },
  }))
}

async function fetchMemePage(
  page: number
): Promise<{ items: MemeItem[]; nextPage: number }> {
  await new Promise((r) => setTimeout(r, 600))
  return {
    items: generatePage(page),
    nextPage: page + 1,
    // nextPage: page < 50 ? page + 1 : null,
  }
}

interface MemeFeedProps {
  activeCategory: string
}

function MediaFeed({ activeCategory }: MemeFeedProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["memes", activeCategory],
      queryFn: ({ pageParam }) => fetchMemePage(pageParam as number),
      initialPageParam: 0,
      // getNextPageParam: (last) => last.nextPage ?? undefined,
      getNextPageParam: (last) => last.nextPage,
    })

  const sentinelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: "300px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const allItems = data?.pages.flatMap((p) => p.items) ?? []

  return (
    <div>
      {status === "error" && (
        <p className="py-10 text-center text-destructive">
          Не удалось загрузить мемы 😢
        </p>
      )}

      <div className="columns-1 gap-4 space-y-0 sm:columns-2 lg:columns-3 xl:columns-4">
        {allItems.map((item) => (
          <div key={item.id} className="mb-4 break-inside-avoid">
            <MediaCard
              title={item.title}
              likes={item.likes}
              comments={item.comments}
              media={item.media}
            />
          </div>
        ))}
      </div>

      <div ref={sentinelRef} className="h-1" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
          </div>
        </div>
      )}

      {!hasNextPage && allItems.length > 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Это всё, интернет кончился 🐸
        </p>
      )}
    </div>
  )
}

export default MediaFeed
