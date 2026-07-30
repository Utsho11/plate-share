/* eslint-disable @typescript-eslint/no-explicit-any */
import PSInput from "@/src/components/Form/PSInput";
import PSSelect from "@/src/components/Form/PSSelect";
import PSTextArea from "@/src/components/Form/PSTextArea";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useCreateRecipeMutation } from "@/src/redux/api/recipeApi";
import {
  AlignLeft,
  ChefHat,
  Image as ImageIcon,
  ListFilter,
  Plus,
  Tags,
  Timer,
  TrashIcon,
  Type,
  Upload,
  X,
} from "lucide-react";
import React, { useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  type FieldValues,
} from "react-hook-form";
import { toast } from "sonner";

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
  const { control, handleSubmit, reset } = methods;

  const [createRecipe, { isLoading }] = useCreateRecipeMutation();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeSelectedFile = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (values: FieldValues) => {
    if (!values.title || !values.description) {
      toast.error("Please provide title and description.");
      return;
    }

    try {
      const payload: Record<string, any> = {
        ...values,
        images: values.imageUrl
          ? [values.imageUrl]
          : ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"],
      };
      delete payload.imageUrl;

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (imageFile) {
        formData.append("files", imageFile);
      }

      await createRecipe(formData).unwrap();
      toast.success("Recipe posted successfully!");
      reset();
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to post recipe.");
    }
  };

  const handleFieldAppend = () => {
    append({ name: "", quantity: "" });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-[400px] overflow-y-scroll"
        >
          <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-white border rounded-2xl shadow-sm space-y-6">
            {/* Header */}
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-500" />
              Post a New Recipe
            </h1>

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <Type className="w-4 h-4 text-muted-foreground" />
                Title
              </label>
              <PSInput name="title" type="text" placeholder="e.g. Creamy Mushroom Pasta" />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-medium">
                <AlignLeft className="w-4 h-4 text-muted-foreground" />
                Description
              </label>
              <PSTextArea name="description" placeholder="Share your secret tips and flavor profile..." />
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

            {/* Cooking Time & Status */}
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
                  Cooking Time (mins)
                </label>
                <PSInput name="cookingTime" type="text" placeholder="e.g. 30" />
              </div>
            </div>

            {/* Cloudinary Image Upload & URL input */}
            <div className="space-y-2 pt-2 border-t">
              <label className="flex items-center gap-2 text-sm font-medium">
                <ImageIcon className="w-4 h-4 text-orange-500" />
                Dish Image (Cloudinary Upload or URL)
              </label>

              {imagePreview ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeSelectedFile}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-400 bg-gray-50/50 hover:bg-orange-50/30 transition">
                    <Upload size={18} className="text-gray-400 mb-1" />
                    <span className="text-xs font-semibold text-gray-600">Upload to Cloudinary</span>
                    <span className="text-[10px] text-gray-400">PNG, JPG up to 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <div>
                    <PSInput name="imageUrl" type="text" placeholder="Or paste Image URL..." />
                  </div>
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Add Recipe Ingredients</h1>
                <Button
                  type="button"
                  onClick={() => handleFieldAppend()}
                  size={"icon-sm"}
                >
                  <Plus />
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <PSInput
                      name={`ingredients.${index}.name`}
                      placeholder="Ingredient name"
                    />
                    <PSInput
                      name={`ingredients.${index}.quantity`}
                      placeholder="Quantity (e.g. 200g)"
                    />
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      size={"icon-sm"}
                      variant={"destructive"}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Instructions */}
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Add Cooking Instructions</h1>
                <Button
                  type="button"
                  onClick={() => appendInstruction({ step: "" })}
                  size="icon-sm"
                >
                  <Plus />
                </Button>
              </div>

              <div className="space-y-3">
                {instructionFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-center">
                    <PSInput
                      name={`instructions.${index}.step`}
                      placeholder={`Step ${index + 1}`}
                    />
                    <Button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      size="icon-sm"
                      variant={"destructive"}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full bg-orange-500 hover:bg-orange-600 font-bold">
              {isLoading ? "Posting..." : "Post Recipe"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RecipeForm;
