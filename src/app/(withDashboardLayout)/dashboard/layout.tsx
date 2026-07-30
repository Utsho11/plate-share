"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/src/components/logo/Logo";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Home,
  LogOut,
  Menu,
  X,
  ChefHat,
  ShieldAlert,
  UserCircle,
  BookOpen,
  ScrollText,
  Settings,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { getUserInfo } from "@/src/services/auth.services";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const info = getUserInfo();
    setUserRole(info?.role?.toUpperCase() ?? null);
  }, []);

  const isAdmin = userRole === "ADMIN";

  const allNavLinks = [
    // Overview — always visible
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["ADMIN", "USER"],
      exact: true,
    },
    // Admin-only section
    {
      label: "Admin: All Users",
      href: "/dashboard/admin",
      icon: ShieldAlert,
      roles: ["ADMIN"],
      exact: false,
    },
    // Recipe management
    {
      label: "My Recipes",
      href: "/dashboard/user/recipes",
      icon: UtensilsCrossed,
      roles: ["ADMIN", "USER"],
      exact: false,
    },
    // Blog management
    {
      label: "My Blog Posts",
      href: "/dashboard/user/blogs",
      icon: ScrollText,
      roles: ["ADMIN", "USER"],
      exact: false,
    },
    // Profile
    {
      label: "My Profile",
      href: "/dashboard/user/profile",
      icon: UserCircle,
      roles: ["ADMIN", "USER"],
      exact: false,
    },
    // User workspace overview
    {
      label: "User Workspace",
      href: "/dashboard/user",
      icon: ChefHat,
      roles: ["ADMIN", "USER"],
      exact: true,
    },
    // Admin-only: manage all blogs
    {
      label: "Manage All Blogs",
      href: "/dashboard/admin/blogs",
      icon: BookOpen,
      roles: ["ADMIN"],
      exact: false,
    },
    // Settings shortcut
    {
      label: "Account Settings",
      href: "/dashboard/user/profile",
      icon: Settings,
      roles: ["ADMIN", "USER"],
      exact: false,
    },
  ];

  // Remove duplicate profile entry — deduplicate by href
  const seenHrefs = new Set<string>();
  const navLinks = allNavLinks.filter((link) => {
    if (!link.roles.includes(userRole || "USER")) return false;
    if (seenHrefs.has(link.href)) return false;
    seenHrefs.add(link.href);
    return true;
  });

  const isActive = (link: { href: string; exact: boolean }) => {
    if (link.exact) return pathname === link.href;
    return pathname.startsWith(link.href);
  };

  return (
    <div className="min-h-screen flex bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo + close */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-slate-800">
            <Logo size="md" />
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Role Badge */}
          {userRole && (
            <div className="px-4 py-3 border-b">
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  isAdmin
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isAdmin ? <ShieldAlert size={11} /> : <ChefHat size={11} />}
                {isAdmin ? "Administrator" : "Member"}
              </span>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
            {/* Section labels */}
            <p className="text-[10px] font-bold uppercase text-gray-400 px-3 pt-2 pb-1">
              Dashboard
            </p>

            {navLinks
              .filter(
                (l) =>
                  l.href === "/dashboard" || l.href === "/dashboard/user"
              )
              .map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive(link)
                        ? "bg-orange-50 dark:bg-orange-950/40 text-[#f77f00] font-semibold"
                        : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#f77f00]"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={17} />
                    {link.label}
                  </Link>
                );
              })}

            <p className="text-[10px] font-bold uppercase text-gray-400 px-3 pt-3 pb-1">
              Content
            </p>
            {navLinks
              .filter(
                (l) =>
                  l.href === "/dashboard/user/recipes" ||
                  l.href === "/dashboard/user/blogs"
              )
              .map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive(link)
                        ? "bg-orange-50 dark:bg-orange-950/40 text-[#f77f00] font-semibold"
                        : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#f77f00]"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={17} />
                    {link.label}
                  </Link>
                );
              })}

            {isAdmin && (
              <>
                <p className="text-[10px] font-bold uppercase text-gray-400 px-3 pt-3 pb-1">
                  Admin Controls
                </p>
                {navLinks
                  .filter(
                    (l) =>
                      l.href === "/dashboard/admin" ||
                      l.href === "/dashboard/admin/blogs"
                  )
                  .map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                          isActive(link)
                            ? "bg-red-50 text-red-700 font-semibold"
                            : "text-gray-700 hover:bg-red-50 hover:text-red-700"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon size={17} />
                        {link.label}
                      </Link>
                    );
                  })}
              </>
            )}

            <p className="text-[10px] font-bold uppercase text-gray-400 px-3 pt-3 pb-1">
              Account
            </p>
            {navLinks
              .filter((l) => l.href === "/dashboard/user/profile")
              .map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive(link)
                        ? "bg-orange-50 text-[#f77f00] font-semibold"
                        : "text-gray-700 hover:bg-orange-50 hover:text-[#f77f00]"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={17} />
                    {link.label}
                  </Link>
                );
              })}
          </nav>

          {/* Bottom actions */}
          <div className="border-t p-3 space-y-1">
            <Link
              href="/home"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
            >
              <Home size={17} />
              Back to App
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={17} />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-600 p-1 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              PlateShare Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/home">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                View App
              </Button>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
