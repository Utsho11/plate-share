import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Card, CardContent } from "@/src/components/ui/card";
import type { IComment } from "@/src/types";
const CommentCard = ({ allComments }: { allComments: IComment[] }) => {
  return (
    <div>
      <div className="space-y-3">
        {allComments.map((c) => (
          <Card key={c._id} className="p-3 rounded-2xl shadow-sm">
            <CardContent className="flex gap-3 p-0">
              <Avatar>
                <AvatarImage src={c.userId.profilePhoto} alt="@shadcn" />
                <AvatarFallback>
                  {`${c.userId.firstName?.[0]?.toUpperCase() || ""}${
                    c.userId.lastName?.[0]?.toUpperCase() || ""
                  }`}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">
                  {c.userId.firstName} {c.userId.lastName}
                </p>
                <p className="text-sm">{c.comment}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommentCard;
