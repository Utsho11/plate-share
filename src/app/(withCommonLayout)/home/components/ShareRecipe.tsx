"use client";
import { Button } from "@/src/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { ChefHat } from "lucide-react";
import RecipeForm from "./RecipeForm";

const ShareRecipe = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full h-full justify-start rounded-2xl bg-white text-gray-700 shadow-sm border hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-500 text-white">
                <ChefHat size={20} />
              </div>
              <span className="text-gray-700 font-medium">
                Share your recipe...
              </span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Post Recipe</DialogTitle>
            <DialogDescription>
              Post your recipe and reach people through your recipe.
            </DialogDescription>
          </DialogHeader>
          <div>
            <RecipeForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareRecipe;
