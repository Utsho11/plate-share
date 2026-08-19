"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Clock,
  MoreHorizontal,
  MessageCircle,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Crown,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  useDownVoteMutation,
  useUpVoteMutation,
} from "@/src/redux/api/voteApi";
import {
  useToggleBookmarkMutation,
  useGetUserBookmarkIdsQuery,
} from "@/src/redux/api/bookmarkApi";
import { toast } from "sonner";
import type { IRecipe } from "@/src/types";
import CommentForm from "@/src/app/(withCommonLayout)/recipe/[id]/component/CommentForm";
import { getFromLocalStorage } from "@/src/utils/local-storage";

const RecipePreviewCard = ({ data }: { data: IRecipe }) => {
  const [upVote] = useUpVoteMutation();
  const [downVote] = useDownVoteMutation();
  const [toggleBookmark] = useToggleBookmarkMutation();
  const router = useRouter();

  const token = typeof window !== "undefined" ? getFromLocalStorage("accessToken") : null;
  const { data: bookmarkedIds = [] } = useGetUserBookmarkIdsQuery(undefined, {
    skip: !token,
  });

  const recipeId = data?._id || (data as unknown as { id?: string })?.id || "";
  const isBookmarked = Array.isArray(bookmarkedIds) && bookmarkedIds.includes(recipeId);

  const handleClick = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  const handleUpVote = (id: string) => {
    upVote(id);
    toast.success("Your vote has been recorded.");
  };

  const handleDownVote = (id: string) => {
    downVote(id);
    toast.success("Your vote has been recorded.");
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/recipe/${recipeId}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: data.description,
          url,
        });
      } catch {
        // User cancelled or share aborted
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Recipe link copied to clipboard!");
    }
  };

  const handleBookmark = async () => {
    if (!token) {
      toast.error("Please log in to save recipes to your cookbook!");
      return;
    }

    try {
      const res = await toggleBookmark(recipeId).unwrap();
      if (res?.data?.isBookmarked) {
        toast.success("Recipe saved to your cookbook!");
      } else {
        toast.info("Recipe removed from saved cookbook.");
      }
    } catch {
      toast.error("Failed to bookmark recipe.");
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto rounded-xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm my-4">
      {/* Post Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={data?.author?.profilePhoto || ""} />
            <AvatarFallback>
              {data?.author?.email?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-sm text-gray-900 dark:text-white">{data?.author?.email}</h2>
            <p className="text-xs text-muted-foreground">
              {new Date(data?.createdAt).toDateString()}
            </p>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
      </CardHeader>

      {/* Text Content */}
      <CardContent className="p-4 pt-0 space-y-2">
        <h1 className="font-semibold text-lg text-gray-900 dark:text-white">{data?.title}</h1>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {data?.description}
        </p>

        <p
          className="font-semibold text-orange-600 dark:text-orange-400 hover:underline hover:cursor-pointer text-sm"
          onClick={() => handleClick(recipeId)}
        >
          See more...
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" /> {data?.cookingTime} mins
            <span>•</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{data?.category}</span>
          </div>

          {(data as { isPremium?: boolean })?.isPremium && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <Crown className="w-3 h-3 fill-white" /> PRO
            </span>
          )}
        </div>
      </CardContent>

      {/* Image */}
      {data?.images?.length > 0 && (
        <Image
          src={data?.images[0]}
          alt={data?.title || "Recipe"}
          width={600}
          height={350}
          className="w-full h-64 object-cover"
        />
      )}

      {/* Footer Actions */}
      <CardFooter className="flex items-center justify-between px-4 py-3 border-t dark:border-slate-800 mt-2 gap-1.5 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Button
            variant={"outline"}
            size={"sm"}
            className="px-2.5 text-xs dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={() => handleUpVote(recipeId)}
          >
            <ThumbsUp className="w-3.5 h-3.5 mr-1" /> {data.upvoteCount || 0}
          </Button>

          <Button
            variant={"outline"}
            size={"sm"}
            className="px-2.5 text-xs dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={() => handleDownVote(recipeId)}
          >
            <ThumbsDown className="w-3.5 h-3.5 mr-1" /> {data.downvoteCount || 0}
          </Button>
        </div>

        <div className="flex items-center gap-1.5">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="px-2.5 text-xs dark:border-slate-700 dark:hover:bg-slate-800">
                <MessageCircle className="w-3.5 h-3.5 mr-1" /> Comment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Leave a comment</DialogTitle>
              </DialogHeader>
              <CommentForm recipeId={recipeId} />
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            className="px-2.5 text-xs hover:text-orange-600 dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={handleShare}
          >
            <Share2 className="w-3.5 h-3.5 mr-1" /> Share
          </Button>

          <Button
            variant="outline"
            size="sm"
            className={`px-2.5 text-xs transition ${
              isBookmarked
                ? "bg-orange-50 dark:bg-orange-950/60 border-orange-300 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 font-bold"
                : "dark:border-slate-700 dark:hover:bg-slate-800 hover:text-orange-600"
            }`}
            onClick={handleBookmark}
          >
            <Bookmark
              className={`w-3.5 h-3.5 mr-1 ${
                isBookmarked ? "fill-orange-500 text-orange-500" : ""
              }`}
            />
            {isBookmarked ? "Saved" : "Save"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipePreviewCard;
