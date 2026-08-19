"use client";

import React, { useState } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  Loader2,
  X,
  Save,
  Utensils,
  Clock,
  ImageIcon,
  Plus,
  Upload,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Badge } from "@/src/components/ui/badge";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import {
  useGetMyRecipesQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} from "@/src/redux/api/recipeApi";

const CATEGORIES = ["BREAKFAST", "LUNCH", "DINNER", "SNACKS", "DESSERT"];
const RECIPE_TYPES = ["VEG", "NON_VEG", "VEGAN"];
const RECIPE_STATUSES = ["REGULAR", "PREMIUM"];

interface RecipeFormState {
  title: string;
  description: string;
  cookingTime: string;
  category: string;
  recipeType: string;
  recipeStatus: string;
  imageUrl: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
}

const defaultForm = (): RecipeFormState => ({
  title: "",
  description: "",
  cookingTime: "30",
  category: "DINNER",
  recipeType: "NON_VEG",
  recipeStatus: "REGULAR",
  imageUrl: "",
  ingredients: [{ name: "", quantity: "" }],
  instructions: [""],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function recipeToForm(r: Record<string, any>): RecipeFormState {
  return {
    title: r.title || "",
    description: r.description || "",
    cookingTime: r.cookingTime || "30",
    category: r.category || "DINNER",
    recipeType: r.recipeType || "NON_VEG",
    recipeStatus: r.recipeStatus || "REGULAR",
    imageUrl: (r.images || [])[0] || "",
    ingredients: r.ingredients?.length
      ? r.ingredients
      : [{ name: "", quantity: "" }],
    instructions: r.instructions?.length
      ? r.instructions.map((i: { step: string }) => i.step)
      : [""],
  };
}

export default function UserRecipesPage() {
  const searchParams = useSearchParams();
  const editIdParam = searchParams.get("edit");

  const {
    data: recipesData,
    isLoading,
    refetch,
  } = useGetMyRecipesQuery(undefined);

  const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recipes = (recipesData?.recipies || []) as Record<string, any>[];

  // Form state
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RecipeFormState>(defaultForm());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Auto-open edit form if ?edit=id parameter is in URL
  React.useEffect(() => {
    if (editIdParam && recipes.length > 0 && mode === "list") {
      const target = recipes.find(
        (r) => r._id === editIdParam || r.id === editIdParam
      );
      if (target) {
        setForm(recipeToForm(target));
        setEditingId(target._id || target.id);
        setImagePreview(target.images?.[0] || null);
        setMode("edit");
      }
    }
  }, [editIdParam, recipes, mode]);

  const openCreate = () => {
    setForm(defaultForm());
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setMode("create");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEdit = (recipe: Record<string, any>) => {
    setForm(recipeToForm(recipe));
    setEditingId(recipe._id || recipe.id);
    setImageFile(null);
    setImagePreview(recipe.images?.[0] || null);
    setMode("edit");
  };

  const closeForm = () => {
    setMode("list");
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
  };

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

  const setField = <K extends keyof RecipeFormState>(
    key: K,
    value: RecipeFormState[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required.");
      return;
    }
    if (form.ingredients.some((i) => !i.name.trim())) {
      toast.error("All ingredient names must be filled.");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      cookingTime: form.cookingTime,
      category: form.category,
      recipeType: form.recipeType,
      recipeStatus: form.recipeStatus,
      images: form.imageUrl
        ? [form.imageUrl]
        : ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"],
      ingredients: form.ingredients.filter((i) => i.name.trim()),
      instructions: form.instructions
        .filter((s) => s.trim())
        .map((step) => ({ step })),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (imageFile) {
      formData.append("files", imageFile);
    }

    try {
      if (mode === "create") {
        await createRecipe(formData).unwrap();
        toast.success("Recipe published successfully!");
      } else if (mode === "edit" && editingId) {
        await updateRecipe({ id: editingId, data: formData }).unwrap();
        toast.success("Recipe updated successfully!");
      }
      refetch();
      closeForm();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteRecipe(id).unwrap();
      toast.success(`"${title}" deleted.`);
      refetch();
    } catch {
      toast.error("Failed to delete. Please try again.");
    }
  };

  // ── FORM VIEW ──────────────────────────────────────────────
  if (mode === "create" || mode === "edit") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              {mode === "create" ? "Create New Recipe" : "Edit Recipe"}
            </h1>
            <p className="text-xs text-orange-100 mt-1">
              {mode === "create"
                ? "Share your culinary creation with the community"
                : "Update your recipe details"}
            </p>
          </div>
          <button onClick={closeForm} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-200">Recipe Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="e.g. Creamy Tuscan Garlic Chicken"
                  required
                  className="rounded-xl"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-200">Description *</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="Describe your dish, flavors, and secret tips..."
                  required
                  className="rounded-xl min-h-[80px]"
                />
              </div>

              {/* Grid fields */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1">
                    <Clock size={12} className="text-orange-500" /> Cooking Time
                  </label>
                  <Input
                    value={form.cookingTime}
                    onChange={(e) => setField("cookingTime", e.target.value)}
                    placeholder="e.g. 30 mins"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-200">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setField("category", e.target.value)}
                    className="w-full h-10 px-3 border rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-200">Type</label>
                  <select
                    value={form.recipeType}
                    onChange={(e) => setField("recipeType", e.target.value)}
                    className="w-full h-10 px-3 border rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {RECIPE_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-200">Status</label>
                  <select
                    value={form.recipeStatus}
                    onChange={(e) => setField("recipeStatus", e.target.value)}
                    className="w-full h-10 px-3 border rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {RECIPE_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1">
                  <ImageIcon size={12} className="text-orange-500" /> Dish Photo (Cloudinary Upload or URL)
                </label>

                {imagePreview ? (
                  <div className="relative w-full h-44 rounded-xl overflow-hidden border dark:border-slate-700">
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
                      <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-orange-400 dark:hover:border-orange-400 bg-gray-50/50 dark:bg-slate-800/60 hover:bg-orange-50/30 transition">
                        <Upload size={18} className="text-gray-400 dark:text-gray-300 mb-1" />
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Upload to Cloudinary</span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-400">PNG, JPG, WEBP up to 5MB</span>
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
                        value={form.imageUrl}
                        onChange={(e) => setField("imageUrl", e.target.value)}
                        placeholder="Or paste Image URL (https://...)"
                        className="rounded-xl h-24 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700">Ingredients *</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() =>
                      setField("ingredients", [
                        ...form.ingredients,
                        { name: "", quantity: "" },
                      ])
                    }
                  >
                    <Plus size={12} className="mr-1" /> Add
                  </Button>
                </div>
                {form.ingredients.map((ing, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder="Name (e.g. Chicken)"
                      value={ing.name}
                      onChange={(e) => {
                        const copy = [...form.ingredients];
                        copy[i] = { ...copy[i], name: e.target.value };
                        setField("ingredients", copy);
                      }}
                      className="rounded-xl"
                    />
                    <Input
                      placeholder="Qty (e.g. 200g)"
                      value={ing.quantity}
                      onChange={(e) => {
                        const copy = [...form.ingredients];
                        copy[i] = { ...copy[i], quantity: e.target.value };
                        setField("ingredients", copy);
                      }}
                      className="rounded-xl w-32"
                    />
                    {form.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setField(
                            "ingredients",
                            form.ingredients.filter((_, idx) => idx !== i)
                          )
                        }
                        className="text-red-400 hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700">Cooking Steps</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => setField("instructions", [...form.instructions, ""])}
                  >
                    <Plus size={12} className="mr-1" /> Add Step
                  </Button>
                </div>
                {form.instructions.map((step, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="mt-2.5 text-xs font-bold text-gray-400 w-5 shrink-0">
                      {i + 1}.
                    </span>
                    <Textarea
                      placeholder={`Step ${i + 1}...`}
                      value={step}
                      onChange={(e) => {
                        const copy = [...form.instructions];
                        copy[i] = e.target.value;
                        setField("instructions", copy);
                      }}
                      className="rounded-xl min-h-[60px] flex-1"
                    />
                    {form.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setField(
                            "instructions",
                            form.instructions.filter((_, idx) => idx !== i)
                          )
                        }
                        className="mt-2 text-red-400 hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20"
                >
                  {isCreating || isUpdating ? (
                    <Loader2 size={16} className="animate-spin mr-2" />
                  ) : (
                    <Save size={16} className="mr-2" />
                  )}
                  {mode === "create" ? "Publish Recipe" : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                  className="rounded-2xl px-6"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── LIST VIEW ──────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Utensils className="text-orange-500" size={24} /> My Recipes
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, and manage your published recipes
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold"
        >
          <PlusCircle size={16} className="mr-2" /> New Recipe
        </Button>
      </div>

      {/* Recipes */}
      <Card className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-gray-900 dark:text-white">
            <Utensils size={16} className="text-orange-500" /> Published Recipes
            <Badge variant="outline" className="text-xs ml-1">
              {recipes.length}
            </Badge>
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">Only your own recipes — create, edit, delete</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-sm">Loading recipes...</span>
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Utensils size={36} className="mx-auto text-gray-200 dark:text-gray-700" />
              <p className="text-sm text-gray-400 dark:text-gray-500">
                You haven&apos;t published any recipes yet.
              </p>
              <Button
                onClick={openCreate}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm"
              >
                <PlusCircle size={14} className="mr-1.5" /> Create Your First Recipe
              </Button>
            </div>
          ) : (
            <div className="divide-y dark:divide-slate-800">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="flex items-start sm:items-center justify-between p-4 gap-4 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {recipe.images?.[0] && (
                      <img
                        src={recipe.images[0]}
                        alt={recipe.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border dark:border-slate-700"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                        {recipe.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5 line-clamp-1">
                        {recipe.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <Badge variant="outline" className="text-[10px]">
                          {recipe.category}
                        </Badge>
                        <Badge
                          variant={
                            recipe.recipeStatus === "PREMIUM"
                              ? "default"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {recipe.recipeStatus}
                        </Badge>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <Clock size={10} /> {recipe.cookingTime}
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          ↑ {recipe.upvoteCount || 0} upvotes
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(recipe)}
                      className="text-xs h-8 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                      <Edit size={13} className="mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isDeleting}
                      onClick={() =>
                        handleDelete(recipe._id, recipe.title)
                      }
                      className="text-xs h-8 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      {isDeleting ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Trash2 size={13} className="mr-1" />
                      )}
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
