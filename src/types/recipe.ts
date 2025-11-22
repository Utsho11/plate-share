export interface IRecipe {
  _id: string;
  title: string;
  description: string;
  cookingTime: string;
  category: string;
  ingredients: IIngredient[];
  recipeStatus: string;
  recipeType: string;
  instructions: IInstruction[];
  author: IAuthor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  upvoteCount: number;
  downvoteCount: number;
}

export interface IIngredient {
  name: string;
  quantity: string;
}

export interface IInstruction {
  step: string;
}

export interface IAuthor {
  _id: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profilePhoto: any;
  id: string;
}
