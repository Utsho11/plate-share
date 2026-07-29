"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Trash2,
  Loader2,
  RefreshCw,
  Search,
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
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { toast } from "sonner";
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "@/src/redux/api/blogApi";

interface AdminBlog {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  authorName: string;
  authorEmail: string;
  authorPhoto: string;
}

export default function AdminBlogsPage() {
  const [search, setSearch] = useState("");

  const { data: blogsData, isLoading, refetch } = useGetAllBlogsQuery({});
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawBlogs = Array.isArray(blogsData) ? blogsData : (Array.isArray(blogsData?.data) ? blogsData.data : []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allBlogs: AdminBlog[] = rawBlogs.map((b: Record<string, any>) => ({
    id: b._id || b.id,
    title: b.title || "Untitled",
    content: b.content || "",
    category: b.category || "GENERAL",
    tags: b.tags || [],
    coverImage: b.coverImage || "",
    authorName:
      b.author?.firstName
        ? `${b.author.firstName} ${b.author.lastName || ""}`.trim()
        : "Unknown",
    authorEmail: b.author?.email || "",
    authorPhoto: b.author?.profilePhoto || "",
  }));

  const filteredBlogs = allBlogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.authorName.toLowerCase().includes(search.toLowerCase()) ||
      b.authorEmail.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete blog: "${title}"? This cannot be undone.`)) return;
    try {
      await deleteBlog(id).unwrap();
      toast.success(`"${title}" has been removed from the platform.`);
      refetch();
    } catch {
      toast.error("Failed to delete blog. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-purple-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-100">
              Admin Control
            </span>
          </div>
          <h1 className="text-2xl font-extrabold">Blog Content Moderation</h1>
          <p className="text-sm text-purple-100 mt-1">
            Review and moderate all blog posts published on the platform.
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-extrabold">{allBlogs.length}</p>
          <p className="text-xs text-purple-200">Total Posts</p>
        </div>
      </div>

      <Card className="rounded-2xl border shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" /> All Blog Posts
            </CardTitle>
            <CardDescription>
              Moderate community blog posts — search by title, author, or email
            </CardDescription>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-xs rounded-xl"
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => refetch()}
              className="rounded-xl"
            >
              <RefreshCw size={14} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-sm">Loading blog posts...</span>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <BookOpen size={32} className="mx-auto text-gray-200" />
              <p className="text-sm text-gray-400">
                {search ? "No blogs found matching your search." : "No blog posts on platform yet."}
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-bold uppercase border-y">
                <tr>
                  <th className="p-4">Blog Post</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Tags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBlogs.map((blog: AdminBlog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition"
                  >
                    <td className="p-4 max-w-xs">
                      <div className="flex items-start gap-3">
                        {blog.coverImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border"
                          />
                        )}
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white line-clamp-1">
                            {blog.title}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">
                            {blog.content.slice(0, 80)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarImage src={blog.authorPhoto} />
                          <AvatarFallback className="text-[10px]">
                            {blog.authorName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {blog.authorName}
                          </p>
                          <p className="text-[10px] text-gray-400">{blog.authorEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-[10px]">
                        {blog.category.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[9px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isDeleting}
                        onClick={() => handleDelete(blog.id, blog.title)}
                        className="text-[11px] h-8 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        {isDeleting ? (
                          <Loader2 size={12} className="animate-spin mr-1" />
                        ) : (
                          <Trash2 size={13} className="mr-1" />
                        )}
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
