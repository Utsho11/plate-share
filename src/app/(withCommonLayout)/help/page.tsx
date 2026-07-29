"use client";

import React, { useState } from "react";
import { HelpCircle, Search, Mail, Send, ChevronDown } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { toast } from "sonner";

const FAQS = [
  {
    q: "How do I create and publish my own recipe?",
    a: "Click on 'Share a Recipe' or navigate to the Recipe Creation page from your navbar. Fill in the recipe details, ingredients, cooking steps, and photo URL, then click Publish!",
  },
  {
    q: "What is PlateShare Pro and how do I subscribe?",
    a: "PlateShare Pro gives you unlimited access to secret chef recipes, hands-free cook mode, 7-day meal planners, and grocery list export. You can subscribe via the 'Pro Planner' button.",
  },
  {
    q: "How does the 'What's in Your Fridge?' AI Matcher work?",
    a: "Select ingredients you currently have in your pantry or fridge. Our AI algorithm calculates real-time recipe match percentages and suggests substitutions for missing items.",
  },
  {
    q: "Can I export my 7-day meal plan to a grocery list?",
    a: "Yes! Open the Meal Planner page and click 'Grocery List'. You can check off items, copy the list to your clipboard, or download it as a .TXT file for shopping.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      toast.error("Please provide both subject and message");
      return;
    }
    toast.success("Support ticket submitted! Our team will get back to you within 24 hours.");
    setTicketSubject("");
    setTicketMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mx-auto">
          <HelpCircle className="w-4 h-4 text-amber-200" />
          Help &amp; Support Center
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">How Can We Help You Today?</h1>

        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search FAQs, features, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-5 rounded-2xl bg-white text-gray-900 shadow-md border-0 focus-visible:ring-2 focus-visible:ring-amber-300"
          />
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card
                key={idx}
                className="rounded-2xl border shadow-xs transition overflow-hidden cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <span className="font-semibold text-sm text-gray-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isOpen ? "rotate-180 text-orange-500" : ""
                    }`}
                  />
                </CardContent>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-gray-600 border-t border-gray-100 leading-relaxed bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Support Contact Ticket Form */}
      <Card className="rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="w-5 h-5 text-orange-500" />
            Contact Support Team
          </CardTitle>
          <CardDescription>Need personalized assistance? Send us a ticket</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Subject</label>
              <Input
                placeholder="e.g. Question about PlateShare Pro subscription"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Message</label>
              <Textarea
                placeholder="Describe your issue or question in detail..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                required
                className="rounded-xl min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md"
            >
              <Send className="w-4 h-4 mr-2" /> Submit Support Ticket
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
