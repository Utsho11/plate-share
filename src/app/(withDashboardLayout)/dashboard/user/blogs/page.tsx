"use client";

import React, { useState } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  Loader2,
  X,
  Save,
  ScrollText,
  Plus,
  ImageIcon,
  Tag,
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
import {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/src/redux/api/blogApi";
import { useGetMeQuery } from "@/src/redux/api/userApi";

const BLOG_CATEGORIES = [
  "FOOD_SCIENCE",
  "KITCHEN_TIPS",
  "NUTRITION",
  "SUSTAINABILITY",
  "CULTURE",
  "TRAVEL",
  "GENERAL",
];

interface BlogFormState {
  title: string;
  content: string;
  category: string;
  coverImage: string;
  tags: string;
}

const defaultForm = (): BlogFormState => ({
  title: "",
  content: "",
  category: "GENERAL",
  coverImage: "",
  tags: "",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function blogToForm(b: Record<string, any>): BlogFormState {
  return {
    title: b.title || "",
    content: b.content || "",
    category: b.category || "GENERAL",
    coverImage: b.coverImage || "",
    tags: (b.tags || []).join(", "),
  };
}

export default function UserBlogsPage() {
  const { data: meData } = useGetMeQuery(undefined);
  const user = meData?.data;
  const userId = user?._id || user?.id;

  const { data: blogsData, isLoading, refetch } = useGetAllBlogsQuery(
    userId ? { author: userId } : {},
    { skip: !userId }
  );

  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawBlogs = Array.isArray(blogsData) ? blogsData : (Array.isArray(blogsData?.data) ? blogsData.data : []);
  const blogs = rawBlogs as Record<string, any>[];

  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormState>(defaultForm());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const openCreate = () => {
    setForm(defaultForm());
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setMode("create");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEdit = (blog: Record<string, any>) => {
    setForm(blogToForm(blog));
    setEditingId(blog._id || blog.id);
    setImageFile(null);
    setImagePreview(blog.coverImage || null);
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

  const setField = <K extends keyof BlogFormState>(
    key: K,
    value: BlogFormState[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
      category: form.category,
      coverImage: form.coverImage.trim() || undefined,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      if (mode === "create") {
        await createBlog(formData).unwrap();
        toast.success("Blog post published!");
      } else if (mode === "edit" && editingId) {
        await updateBlog({ id: editingId, data: formData }).unwrap();
        toast.success("Blog post updated!");
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
      await deleteBlog(id).unwrap();
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              {mode === "create" ? "Write New Blog Post" : "Edit Blog Post"}
            </h1>
            <p className="text-xs text-purple-200 mt-1">
              {mode === "create"
                ? "Share your culinary knowledge with the community"
                : "Update your blog post content"}
            </p>
          </div>
          <button onClick={closeForm} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <Card className="rounded-2xl border shadow-sm">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Blog Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="e.g. 10 Essential Kitchen Knife Skills"
                  required
                  className="rounded-xl"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setField("category", e.target.value)}
                  className="w-full h-10 px-3 border rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cloudinary Cover Image Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                  <ImageIcon size={12} className="text-purple-500" /> Cover Image (Cloudinary Upload or URL)
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
                    <div>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 bg-gray-50/50 hover:bg-purple-50/30 transition">
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
                    </div>
                    <div>
                      <Input
                        value={form.coverImage}
                        onChange={(e) => setField("coverImage", e.target.value)}
                        placeholder="Or paste Image URL (https://...)"
                        className="rounded-xl h-20 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                  <Tag size={12} className="text-purple-500" /> Tags (comma-separated)
                </label>
                <Input
                  value={form.tags}
                  onChange={(e) => setField("tags", e.target.value)}
                  placeholder="e.g. cooking tips, beginner, healthy"
                  className="rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Blog Content *
                </label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setField("content", e.target.value)}
                  placeholder="Write your article here... Share tips, techniques, recipes, stories..."
                  required
                  className="rounded-xl min-h-[240px]"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 py-5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg"
                >
                  {isCreating || isUpdating ? (
                    <Loader2 size={16} className="animate-spin mr-2" />
                  ) : (
                    <Save size={16} className="mr-2" />
                  )}
                  {mode === "create" ? "Publish Blog Post" : "Save Changes"}
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
            <ScrollText className="text-purple-600" size={24} /> My Blog Posts
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Write, edit, and manage your published blog articles
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold"
        >
          <PlusCircle size={16} className="mr-2" /> New Blog Post
        </Button>
      </div>

      <Card className="rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ScrollText size={16} className="text-purple-500" /> Published Blog Posts
            <Badge variant="outline" className="text-xs ml-1">
              {blogs.length}
            </Badge>
          </CardTitle>
          <CardDescription>Your own blog articles — create, edit, delete</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-sm">Loading blog posts...</span>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ScrollText size={36} className="mx-auto text-gray-200" />
              <p className="text-sm text-gray-400">
                You haven&apos;t written any blog posts yet.
              </p>
              <Button
                onClick={openCreate}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm"
              >
                <PlusCircle size={14} className="mr-1.5" /> Write Your First Blog
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex items-start sm:items-center justify-between p-4 gap-4 hover:bg-gray-50/50 transition"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {blog.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {blog.content?.slice(0, 100)}...
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <Badge variant="outline" className="text-[10px]">
                          {blog.category?.replace("_", " ")}
                        </Badge>
                        {(blog.tags || []).slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(blog)}
                      className="text-xs h-8"
                    >
                      <Edit size={13} className="mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isDeleting}
                      onClick={() => handleDelete(blog._id, blog.title)}
                      className="text-xs h-8 text-red-600 border-red-200 hover:bg-red-50"
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

// prevent lint warning on unused import
const _Plus = Plus;
void _Plus;
