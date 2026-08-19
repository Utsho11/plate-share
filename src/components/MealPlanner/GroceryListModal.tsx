"use client";

import React, { useState } from "react";
import { X, ShoppingBag, Copy, Download, CheckCircle2, Filter } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { toast } from "sonner";

interface GroceryItem {
  name: string;
  amount: string;
  category: "Produce" | "Meat & Protein" | "Dairy" | "Pantry & Spices" | "Bakery";
  checked?: boolean;
}

interface GroceryListModalProps {
  onClose: () => void;
  items?: GroceryItem[];
}

const DEFAULT_GROCERY_ITEMS: GroceryItem[] = [
  { name: "Boneless Chicken Breast", amount: "1.5 kg", category: "Meat & Protein" },
  { name: "Fresh Eggs", amount: "12 pcs", category: "Meat & Protein" },
  { name: "Roma Tomatoes", amount: "1 kg", category: "Produce" },
  { name: "Yellow Onions", amount: "500g", category: "Produce" },
  { name: "Garlic Cloves", amount: "1 head", category: "Produce" },
  { name: "Fresh Basil", amount: "1 bunch", category: "Produce" },
  { name: "Heavy Cream", amount: "250 ml", category: "Dairy" },
  { name: "Parmesan Cheese", amount: "200g", category: "Dairy" },
  { name: "Unsalted Butter", amount: "100g", category: "Dairy" },
  { name: "Olive Oil", amount: "1 bottle", category: "Pantry & Spices" },
  { name: "Garam Masala", amount: "50g", category: "Pantry & Spices" },
  { name: "Basmati Rice", amount: "1 kg", category: "Pantry & Spices" },
];

export default function GroceryListModal({
  onClose,
  items = DEFAULT_GROCERY_ITEMS,
}: GroceryListModalProps) {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(
    items.map((i) => ({ ...i, checked: false }))
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const toggleCheck = (index: number) => {
    setGroceryList((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const categories = ["ALL", "Produce", "Meat & Protein", "Dairy", "Pantry & Spices", "Bakery"];

  const filteredItems = groceryList.filter(
    (item) => selectedCategory === "ALL" || item.category === selectedCategory
  );

  const handleCopyList = () => {
    const text = groceryList
      .map((i) => `[${i.checked ? "x" : " "}] ${i.name} - ${i.amount} (${i.category})`)
      .join("\n");
    navigator.clipboard.writeText(text);
    toast.success("Grocery list copied to clipboard!");
  };

  const handleDownloadTxt = () => {
    const text = `--- PlateShare Meal Planner Grocery List ---\n\n` +
      groceryList
        .map((i) => `[${i.checked ? "x" : " "}] ${i.name} - ${i.amount} (${i.category})`)
        .join("\n");
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "plateshare-grocery-list.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Grocery list file downloaded!");
  };

  const completedCount = groceryList.filter((i) => i.checked).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border">
        {/* Header */}
        <div className="p-5 border-b bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Weekly Shopping List</h2>
              <p className="text-xs text-emerald-100">
                {completedCount} of {groceryList.length} items collected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="p-4 bg-gray-50 dark:bg-slate-900 border-b dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 ml-1 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 border dark:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist */}
        <div className="p-5 overflow-y-auto flex-1 space-y-2 bg-white dark:bg-slate-900">
          {filteredItems.length === 0 ? (
            <p className="text-center py-8 text-xs text-gray-500 dark:text-gray-400">
              No items in this category.
            </p>
          ) : (
            filteredItems.map((item, idx) => {
              const originalIndex = groceryList.findIndex(
                (i) => i.name === item.name && i.amount === item.amount
              );
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(originalIndex)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    item.checked
                      ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-gray-400 dark:text-gray-500 line-through"
                      : "bg-white dark:bg-slate-900 border dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 text-gray-800 dark:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                        item.checked
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      }`}
                    >
                      {item.checked && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{item.amount}</p>
                    </div>
                  </div>

                  <Badge variant="outline" className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 dark:border-slate-700">
                    {item.category}
                  </Badge>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyList}
            className="flex-1 rounded-xl text-xs font-bold"
          >
            <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy List
          </Button>

          <Button
            size="sm"
            onClick={handleDownloadTxt}
            className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" /> Download .TXT
          </Button>
        </div>
      </div>
    </div>
  );
}
