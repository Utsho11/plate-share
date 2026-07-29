"use client";

import React, { useState } from "react";
import { X, Camera, Star, UploadCloud, CheckCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";

interface PhotoReviewModalProps {
  recipeTitle: string;
  onClose: () => void;
  onSuccess?: (review: { rating: number; comment: string; photoUrl: string }) => void;
}

export default function PhotoReviewModal({
  recipeTitle,
  onClose,
  onSuccess,
}: PhotoReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your 'I Made This!' photo review has been posted!");
      if (onSuccess) {
        onSuccess({
          rating,
          comment: comment.trim() || "Turned out delicious!",
          photoUrl: photoUrl.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        });
      }
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-orange-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500 text-white rounded-xl">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">"I Made This!" Photo Review</h3>
              <p className="text-xs text-gray-500 truncate max-w-[240px]">{recipeTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Star Rating */}
          <div className="space-y-1.5">
            <label className="font-semibold text-gray-700 block">Your Rating:</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-gray-700">{rating}/5 Stars</span>
            </div>
          </div>

          {/* Photo URL / Upload simulated */}
          <div className="space-y-1.5">
            <label className="font-semibold text-gray-700 block">Photo Image URL:</label>
            <div className="relative">
              <UploadCloud className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="Paste image URL (e.g. https://...)"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Cooking Notes / Comments */}
          <div className="space-y-1.5">
            <label className="font-semibold text-gray-700 block">Cooking Notes & Feedback:</label>
            <textarea
              rows={3}
              placeholder="How did your dish turn out? Any special tweaks or substitutions?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
            >
              {isSubmitting ? "Submitting..." : "Post Photo Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
