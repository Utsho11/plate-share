"use client";

import React, { useState } from "react";
import { Plus, Image as ImageIcon, Clock, ChefHat, Sparkles, Upload, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateRecipeMutation } from "@/src/redux/api/recipeApi";

export default function CreateRecipePage() {
  const router = useRouter();
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("30");
  const [category, setCategory] = useState("DINNER");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);

  const addIngredientField = () => setIngredients([...ingredients, ""]);
  const addInstructionField = () => setInstructions([...instructions, ""]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in recipe title and description");
      return;
    }

    try {
      const payload = {
        title,
        description,
        cookingTime: Number(cookingTime) || 30,
        category,
        images: imageUrl ? [imageUrl] : ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"],
        ingredients: ingredients.filter((i) => i.trim()).map((name) => ({ name, quantity: "1 unit" })),
        instructions: instructions.filter((i) => i.trim()).map((step) => ({ step })),
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (imageFile) {
        formData.append("files", imageFile);
      }

      await createRecipe(formData).unwrap();
      toast.success("Recipe published successfully!");
      router.push("/recipes");
    } catch {
      toast.error("Something went wrong while publishing recipe.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-0.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Share Your Recipe
          </div>
          <h1 className="text-2xl font-bold">Create New Culinary Post</h1>
        </div>
        <ChefHat className="w-10 h-10 text-orange-200" />
      </div>

      <Card className="rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recipe Details</CardTitle>
          <CardDescription>Share your unique ingredients and step-by-step instructions</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Recipe Title</label>
              <Input
                placeholder="e.g. Creamy Tuscan Garlic Chicken"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Short Description</label>
              <Textarea
                placeholder="Describe your dish, flavors, and secret tips..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-500" /> Cooking Time (mins)
                </label>
                <Input
                  type="number"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 border rounded-xl bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                >
                  <option value="BREAKFAST">Breakfast</option>
                  <option value="LUNCH">Lunch</option>
                  <option value="DINNER">Dinner</option>
                  <option value="SNACK">Snack</option>
                  <option value="DESSERT">Dessert</option>
                  <option value="VEGAN">Vegan</option>
                </select>
              </div>
            </div>

            {/* Cloudinary Image Upload / URL Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-orange-500" /> Dish Photo (Cloudinary Upload or URL)
              </label>

              {imagePreview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border">
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
                  <div>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-400 bg-gray-50/50 hover:bg-orange-50/30 transition">
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs font-semibold text-gray-600">Upload to Cloudinary</span>
                      <span className="text-[10px] text-gray-400">PNG, JPG, WEBP up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <Input
                      placeholder="Or paste Image URL (https://...)"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="rounded-xl h-24 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700">Ingredients</label>
                <Button type="button" variant="outline" size="sm" onClick={addIngredientField} className="text-xs">
                  <Plus className="w-3 h-3 mr-1" /> Add Ingredient
                </Button>
              </div>
              {ingredients.map((ing, i) => (
                <Input
                  key={i}
                  placeholder={`Ingredient ${i + 1}`}
                  value={ing}
                  onChange={(e) => {
                    const copy = [...ingredients];
                    copy[i] = e.target.value;
                    setIngredients(copy);
                  }}
                  className="rounded-xl"
                />
              ))}
            </div>

            {/* Instructions */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700">Cooking Steps</label>
                <Button type="button" variant="outline" size="sm" onClick={addInstructionField} className="text-xs">
                  <Plus className="w-3 h-3 mr-1" /> Add Step
                </Button>
              </div>
              {instructions.map((step, i) => (
                <Textarea
                  key={i}
                  placeholder={`Step ${i + 1} instructions...`}
                  value={step}
                  onChange={(e) => {
                    const copy = [...instructions];
                    copy[i] = e.target.value;
                    setInstructions(copy);
                  }}
                  className="rounded-xl"
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/20"
            >
              {isLoading ? "Publishing..." : "Publish Recipe"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
