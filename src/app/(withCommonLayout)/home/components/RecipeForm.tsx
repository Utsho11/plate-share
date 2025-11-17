import PSForm from "@/src/components/Form/PSForm";
import PSInput from "@/src/components/Form/PSInput";
import PSSelect from "@/src/components/Form/PSSelect";
import PSTextArea from "@/src/components/Form/PSTextArea";
import { Button } from "@/src/components/ui/button";
import {
  AlignLeft,
  ChefHat,
  ListFilter,
  Plus,
  Tags,
  Timer,
  TrashIcon,
  Type,
} from "lucide-react";
import React from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  type FieldValues,
} from "react-hook-form";

export const RECIPE_TYPE = ["VEG", "NON_VEG", "VEGAN"];

export const RECIPE_CATEGORY = [
  "BREAKFAST",
  "LUNCH",
  "DINNER",
  "SNACKS",
  "DESSERT",
];

export const RECIPE_STATUS = ["REGULAR", "PREMIUM"];

const RecipeForm = () => {
  const methods = useForm();

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = (values: FieldValues) => {
    console.log(values);
  };

  const handleFieldAppend = () => {
    append({ name: "", quantity: "" });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-white border rounded-2xl shadow-sm space-y-6">
            {/* Header */}
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <ChefHat className="w-6 h-6" />
              Post a New Recipe
            </h1>

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <Type className="w-4 h-4 text-muted-foreground" />
                Title
              </label>
              <PSInput name="title" type="text" />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <AlignLeft className="w-4 h-4 text-muted-foreground" />
                Description
              </label>
              <PSTextArea name="description" />
            </div>

            {/* 2 Selects – Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                  <ListFilter className="w-4 h-4 text-muted-foreground" />
                  Category
                </label>
                <PSSelect
                  name="category"
                  placeholder="Select a category"
                  options={RECIPE_CATEGORY}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                  <Tags className="w-4 h-4 text-muted-foreground" />
                  Recipe Type
                </label>
                <PSSelect
                  name="recipeType"
                  placeholder="Select a type"
                  options={RECIPE_TYPE}
                />
              </div>
            </div>

            {/* Cooking Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                  <ListFilter className="w-4 h-4 text-muted-foreground" />
                  Status
                </label>
                <PSSelect
                  name="recipeStatus"
                  placeholder="Select a status"
                  options={RECIPE_STATUS}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                  <Timer className="w-4 h-4 text-muted-foreground" />
                  Cooking Time
                </label>
                <PSInput name="cookingTime" type="text" />
              </div>
            </div>

            {/* ingredients */}

            <div className="flex justify-between items-center mb-5">
              <h1 className="text-xl">Add Recipe Ingredients</h1>
              <Button
                type="button"
                onClick={() => handleFieldAppend()}
                size={"icon-sm"}
              >
                <Plus />
              </Button>
            </div>

            <div className="space-y-5">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <PSInput
                    name={`ingredients.${index}.name`}
                    placeholder="Ingredients name"
                  />
                  <PSInput
                    name={`ingredients.${index}.quantity`}
                    placeholder="quantity"
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    size={"icon-sm"}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full md:w-auto">
              Post Recipe
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RecipeForm;
