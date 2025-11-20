"use client";

import RecipePreviewCard from "@/src/components/Recipe/RecipePreviewCard";
import { useGetAllRecipeQuery } from "@/src/redux/api/recipeApi";

const RecipeFeed = () => {
  const { data } = useGetAllRecipeQuery({});

  // console.log({ data });

  return (
    <div>
      {data?.recipies.map((recipe: any) => (
        <RecipePreviewCard key={recipe._id} data={recipe} />
      ))}
      {/* <RecipePreviewCard data={data}/> */}
    </div>
  );
};

export default RecipeFeed;
