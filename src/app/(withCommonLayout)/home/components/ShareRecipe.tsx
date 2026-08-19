"use client";
import { Button } from "@/src/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { ChefHat } from "lucide-react";
import RecipeForm from "./RecipeForm";

const ShareRecipe = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full h-fit justify-start rounded-2xl bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 shadow-sm border dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 py-2.5 px-3.5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-xs shrink-0">
                <ChefHat size={20} />
              </div>
              <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                Share your recipe with the world...
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
          <div className="h-[425px]">
            <RecipeForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareRecipe;
