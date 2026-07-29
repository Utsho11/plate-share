"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/src/components/logo/Logo";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  Home,
  LogOut,
  Menu,
  X,
  ChefHat,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Admin Panel", href: "/dashboard/admin", icon: ShieldAlert },
    { label: "User Workspace", href: "/dashboard/user", icon: ChefHat },
    { label: "Manage Recipes", href: "/home", icon: UtensilsCrossed },
    { label: "Community", href: "/community", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <Logo />
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-[#f77f00] transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t pt-4 space-y-2">
          <Link
            href="/home"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            <Home size={18} />
            Back to App
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-600 p-1 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              PlateShare Management Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/home">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                View Feed
              </Button>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
