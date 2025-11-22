import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
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
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  useDownVoteMutation,
  useUpVoteMutation,
} from "@/src/redux/api/voteApi";
import { toast } from "sonner";
import type { IRecipe } from "@/src/types";

const RecipePreviewCard = ({ data }: { data: IRecipe }) => {
  const [upVote] = useUpVoteMutation();
  const [downVote] = useDownVoteMutation();
  const router = useRouter();

  const handleClick = (id: string) => {
    // console.log(id);
    router.push(`recipe/${id}`);
  };

  const handleUpVote = (id: string) => {
    upVote(id);
    toast.success("Your vote has been recorded.");
  };

  const handleDownVote = (id: string) => {
    downVote(id);
    toast.success("Your vote has been recorded.");
  };

  return (
    <Card className="w-full max-w-xl mx-auto rounded-xl border shadow-sm my-4">
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
            <h2 className="font-semibold text-sm">{data?.author?.email}</h2>
            <p className="text-xs text-muted-foreground">
              {new Date(data?.createdAt).toDateString()}
            </p>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
      </CardHeader>

      {/* Text Content */}
      <CardContent className="p-4 pt-0 space-y-2">
        <h1 className="font-semibold text-lg">{data?.title}</h1>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {data?.description}
        </p>

        <p
          className="font-semibold hover:text-blue-400 hover:underline hover:cursor-pointer text-sm"
          onClick={() => handleClick(data._id)}
        >
          See more...
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-4 h-4" /> {data?.cookingTime}
          <span>•</span>
          {data?.category}
        </div>
      </CardContent>

      {/* Image */}
      {data?.images?.length > 0 && (
        <Image
          src={data?.images[0]}
          alt="Recipe"
          width={100}
          height={100}
          className="w-full h-64 object-cover"
        />
      )}

      {/* Footer Actions Like Facebook */}
      <CardFooter className="flex items-center justify-between px-4 py-3 border-t mt-2">
        <Button
          variant={"outline"}
          className="p-2"
          onClick={() => handleUpVote(data._id)}
        >
          <ThumbsUp className="w-4 h-4" /> | {data.upvoteCount}
        </Button>

        <Button
          variant={"outline"}
          className="p-2"
          onClick={() => handleDownVote(data._id)}
        >
          <ThumbsDown className="w-4 h-4" />| {data.downvoteCount}
        </Button>

        <Button variant={"outline"}>
          <MessageCircle className="w-4 h-4" /> Comment
        </Button>

        <Button variant={"outline"}>
          <Share2 className="w-4 h-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipePreviewCard;
