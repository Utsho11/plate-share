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

const RecipePreviewCard = ({ data }) => {
  const router = useRouter();

  const handleClick = (id) => {
    // console.log(id);
    router.push(`recipe/${id}`);
  };

  return (
    <Card
      className="w-full max-w-xl mx-auto rounded-xl border shadow-sm my-4"
      onClick={() => handleClick(data._id)}
    >
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
        <Button variant={"outline"}>
          <ThumbsUp className="w-4 h-4" /> Like
        </Button>

        <Button variant={"outline"}>
          <ThumbsDown className="w-4 h-4" /> DisLike
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
