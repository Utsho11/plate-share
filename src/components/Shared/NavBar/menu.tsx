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
    icon: <Home className="w-5 h-5 shrink-0 text-black" />,
  },
  {
    title: "Recipes",
    url: "/recipes",
    icon: <UtensilsCrossed className="w-5 h-5 shrink-0 text-black" />,
    items: [
      {
        title: "All Recipes",
        description: "Browse all recipes shared by our community",
        icon: <UtensilsCrossed className="w-5 h-5 shrink-0 text-black" />,
        url: "/recipes",
      },
      {
        title: "Categories",
        description: "Explore recipes by cuisine, meal type, or diet",
        icon: <Leaf className="w-5 h-5 shrink-0 text-black" />,
        url: "/recipes/categories",
      },
      {
        title: "Popular",
        description: "Most loved and trending recipes this week",
        icon: <Flame className="w-5 h-5 shrink-0 text-black" />,
        url: "/recipes/popular",
      },
      {
        title: "Quick & Easy",
        description: "Simple and fast recipes for busy days",
        icon: <BookOpen className="w-5 h-5 shrink-0 text-black" />,
        url: "/recipes/quick-and-easy",
      },
    ],
  },
  {
    title: "Community",
    url: "/community",
    icon: <Users className="w-5 h-5 shrink-0 text-black" />,
    items: [
      {
        title: "All Community",
        description: "Join the conversation with food lovers",
        icon: <MessageCircle className="w-5 h-5 shrink-0 text-black" />,
        url: "/community",
      },
      {
        title: "Share a Recipe",
        description: "Submit your own recipe and inspire others",
        icon: <PlusCircle className="w-5 h-5 shrink-0 text-black" />,
        url: "/recipes/create",
      },
      {
        title: "Top Chefs",
        description: "Meet our most active and talented creators",
        icon: <ChefHat className="w-5 h-5 shrink-0 text-black" />,
        url: "/community/chefs",
      },
      {
        title: "Saved Recipes",
        description: "View your bookmarked recipes",
        icon: <Heart className="w-5 h-5 shrink-0 text-black" />,
        url: "/saved",
      },
    ],
  },
  {
    title: "Meal Planner",
    url: "/meal-planner",
    icon: <Calendar className="w-5 h-5 shrink-0 text-black" />,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: <BookOpen className="w-5 h-5 shrink-0 text-black" />,
  },
  {
    title: "About",
    url: "/about",
    icon: <Info className="w-5 h-5 shrink-0 text-black" />,
  },
  {
    title: "Help",
    url: "/help",
    icon: <Phone className="w-5 h-5 shrink-0 text-black" />,
  },
];
