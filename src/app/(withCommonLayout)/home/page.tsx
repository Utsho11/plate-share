import React from "react";
import ShareRecipe from "./components/ShareRecipe";
import RecipeFeed from "./components/RecipeFeed";

const HomePage = () => {
  return (
    <div>
      <div>
        <ShareRecipe />
        <RecipeFeed />
      </div>
    </div>
  );
};

export default HomePage;
