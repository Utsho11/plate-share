// "use client";
import PSForm from "@/src/components/Form/PSForm";
import PSTextArea from "@/src/components/Form/PSTextArea";
import { Button } from "@/src/components/ui/button";
import { useCreateCommentMutation } from "@/src/redux/api/commentApi";
import React from "react";

import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CommentForm = ({ recipeId }: { recipeId: string }) => {
  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (values: FieldValues) => {
    const { comment } = values;

    const payload = {
      recipeId,
      comment,
    };

    try {
      const res = await createComment(payload).unwrap();
      if (res._id) {
        toast.success("Comment posted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PSForm onSubmit={onSubmit}>
      <PSTextArea name="comment" />
      <Button type="submit" variant={"outline"} className="my-4">
        Post Comment
      </Button>
    </PSForm>
  );
};

export default CommentForm;
