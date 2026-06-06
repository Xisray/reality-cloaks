import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import MediaContent from "./MediaContent"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import type { MediaSource } from "@/types"

interface Props {
  title: string
  likes: number
  comments: number
  media?: MediaSource
}


function MediaCard({ title, likes, comments, media }: Props) {
  const [liked, setLiked] = React.useState(false)
  const [stared, setStared] = React.useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-0">
        {/* Media area */}
        {media ? (
          <MediaContent media={media} />
        ) : (
          <Skeleton className="aspect-square w-full" />
        )}

        {/* Action bar */}
        <div className="flex justify-between px-2 pb-2">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => setLiked((prev) => !prev)}
              aria-label={liked ? "Unlike" : "Like"}
            >
              <Heart
                size={20}
                className="transition-colors duration-150"
                fill={liked ? "#ef4444" : "none"}
                stroke={liked ? "#ef4444" : "currentColor"}
              />
              <span className="ml-1">{likes + Number(liked)}</span>
            </Button>
            <Button variant="ghost" aria-label="Comments">
              <MessageCircle size={20} />
              <span className="ml-1">{comments}</span>
            </Button>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => setStared((prev) => !prev)}
              aria-label={stared ? "Unstar" : "Star"}
            >
              <Star
                size={20}
                className="transition-colors duration-150"
                fill={stared ? "#eab308" : "none"}
                stroke={stared ? "#eab308" : "currentColor"}
              />
            </Button>
            <Button variant="ghost" aria-label="Share">
              <Share2 size={20} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default MediaCard
