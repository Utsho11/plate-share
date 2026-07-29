import {
  Home,
  ChefHat,
  UtensilsCrossed,
  Heart,
  Users,
  PlusCircle,
  BookOpen,
  Leaf,
  Flame,
  MessageCircle,
  Phone,
  Info,
  Calendar,
} from "lucide-react";

export const menu = [
  {
    title: "Home",
    url: "/",
    icon: <Home className="w-4 h-4 shrink-0 text-orange-500" />,
  },
  {
    title: "Recipes",
    url: "/recipes",
    icon: <UtensilsCrossed className="w-4 h-4 shrink-0 text-orange-500" />,
    items: [
      {
        title: "All Recipes",
        description: "Browse all recipes shared by our community",
        icon: <UtensilsCrossed className="w-4 h-4 shrink-0 text-orange-500" />,
        url: "/recipes",
      },
      {
        title: "Categories",
        description: "Explore recipes by cuisine, meal type, or diet",
        icon: <Leaf className="w-4 h-4 shrink-0 text-emerald-500" />,
        url: "/recipes/categories",
      },
      {
        title: "Popular",
        description: "Most loved and trending recipes this week",
        icon: <Flame className="w-4 h-4 shrink-0 text-amber-500" />,
        url: "/recipes/popular",
      },
      {
        title: "Quick & Easy",
        description: "Simple and fast recipes for busy days",
        icon: <BookOpen className="w-4 h-4 shrink-0 text-blue-500" />,
        url: "/recipes/quick-and-easy",
      },
    ],
  },
  {
    title: "Community",
    url: "/community",
    icon: <Users className="w-4 h-4 shrink-0 text-orange-500" />,
    items: [
      {
        title: "All Community",
        description: "Join the conversation with food lovers",
        icon: <MessageCircle className="w-4 h-4 shrink-0 text-indigo-500" />,
        url: "/community",
      },
      {
        title: "Share a Recipe",
        description: "Submit your own recipe and inspire others",
        icon: <PlusCircle className="w-4 h-4 shrink-0 text-rose-500" />,
        url: "/recipes/create",
      },
      {
        title: "Top Chefs",
        description: "Meet our most active and talented creators",
        icon: <ChefHat className="w-4 h-4 shrink-0 text-amber-500" />,
        url: "/community/chefs",
      },
      {
        title: "Saved Recipes",
        description: "View your bookmarked recipes",
        icon: <Heart className="w-4 h-4 shrink-0 text-pink-500" />,
        url: "/saved",
      },
    ],
  },
  {
    title: "Meal Planner",
    url: "/meal-planner",
    icon: <Calendar className="w-4 h-4 shrink-0 text-orange-500" />,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: <BookOpen className="w-4 h-4 shrink-0 text-orange-500" />,
  },
  {
    title: "About",
    url: "/about",
    icon: <Info className="w-4 h-4 shrink-0 text-orange-500" />,
  },
  {
    title: "Help",
    url: "/help",
    icon: <Phone className="w-4 h-4 shrink-0 text-orange-500" />,
  },
];
