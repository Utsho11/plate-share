"use client";

import React, { useState } from "react";
import { X, Crown, CheckCircle2, ShieldCheck, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";

interface SubscriptionModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SubscriptionModal({
  isOpen = true,
  onClose,
  onSuccess,
}: SubscriptionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Welcome to PlateShare Pro! Premium recipes unlocked.");
      localStorage.setItem("isProMember", "true");
      if (onSuccess) onSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border">
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <Crown className="w-7 h-7 text-amber-200 fill-amber-200" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                PlateShare Pro
              </span>
              <h2 className="text-2xl font-bold mt-0.5">Unlock Culinary Mastery</h2>
            </div>
          </div>
          <p className="text-xs text-orange-100 max-w-md">
            Get unlimited access to secret chef recipes, 7-day meal planners, &amp; ad-free cooking mode.
          </p>
        </div>

        {/* Plan Picker & Form */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedPlan("yearly")}
              className={`p-3.5 rounded-2xl border-2 text-left transition relative ${
                selectedPlan === "yearly"
                  ? "border-orange-500 bg-orange-50/50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Save 40%
              </span>
              <p className="text-xs font-semibold text-gray-500">Yearly Pass</p>
              <p className="text-lg font-extrabold text-gray-900 mt-0.5">
                $5.99<span className="text-xs text-gray-500 font-normal">/mo</span>
              </p>
              <p className="text-[11px] text-gray-500 mt-1">$71.88 billed annually</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlan("monthly")}
              className={`p-3.5 rounded-2xl border-2 text-left transition ${
                selectedPlan === "monthly"
                  ? "border-orange-500 bg-orange-50/50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <p className="text-xs font-semibold text-gray-500">Monthly Plan</p>
              <p className="text-lg font-extrabold text-gray-900 mt-0.5">
                $9.99<span className="text-xs text-gray-500 font-normal">/mo</span>
              </p>
              <p className="text-[11px] text-gray-500 mt-1">Billed monthly. Cancel anytime.</p>
            </button>
          </div>

          {/* Perks list */}
          <div className="space-y-2 pt-1">
            {[
              "Unlimited Access to Premium & Michelin-Star Recipes",
              "Interactive 7-Day Meal Planner & Grocery Exporter",
              "Screen Wake Lock Cook Mode (Hands-Free)",
              "Priority AI Pantry Matcher & Ingredient Substitutions",
            ].map((perk, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          {/* Checkout Button */}
          <form onSubmit={handleSubscribe} className="pt-2 space-y-3">
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full py-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Subscribe Now — {selectedPlan === "yearly" ? "$71.88/yr" : "$9.99/mo"}
                </>
              )}
            </Button>
            <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
              Secured by Stripe 256-bit SSL Encryption
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
