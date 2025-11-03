import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/src/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

import { Lobster } from "next/font/google";
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
  Menu,
} from "lucide-react";
import Link from "next/link";

export const menu = [
  {
    title: "Home",
    url: "/",
    icon: <Home className="size-5 shrink-0 text-black " />,
  },

  {
    title: "Recipes",
    url: "/recipes",
    icon: <UtensilsCrossed className="size-5 shrink-0 text-black" />,
    items: [
      {
        title: "All Recipes",
        description: "Browse all recipes shared by our community",
        icon: <UtensilsCrossed className="size-5 shrink-0 text-black" />,
        url: "/recipes",
      },
      {
        title: "Categories",
        description: "Explore recipes by cuisine, meal type, or diet",
        icon: <Leaf className="size-5 shrink-0 text-black" />,
        url: "/recipes/categories",
      },
      {
        title: "Popular",
        description: "Most loved and trending recipes this week",
        icon: <Flame className="size-5 shrink-0 text-black" />,
        url: "/recipes/popular",
      },
      {
        title: "Quick & Easy",
        description: "Simple and fast recipes for busy days",
        icon: <BookOpen className="size-5 shrink-0 text-black" />,
        url: "/recipes/quick-and-easy",
      },
    ],
  },

  {
    title: "Community",
    url: "/community",
    icon: <Users className="size-5 shrink-0 text-black" />,
    items: [
      {
        title: "Share a Recipe",
        description: "Submit your own recipe and inspire others",
        icon: <PlusCircle className="size-5 shrink-0 text-black" />,
        url: "/recipes/create",
      },
      {
        title: "Top Chefs",
        description: "Meet our most active and talented creators",
        icon: <ChefHat className="size-5 shrink-0 text-black" />,
        url: "/community/chefs",
      },
      {
        title: "Saved Recipes",
        description: "View your bookmarked recipes",
        icon: <Heart className="size-5 shrink-0 text-black" />,
        url: "/saved",
      },
      {
        title: "Discussions",
        description: "Join the conversation with food lovers",
        icon: <MessageCircle className="size-5 shrink-0 text-black" />,
        url: "/community/discussions",
      },
    ],
  },

  {
    title: "Blog",
    url: "/blog",
    icon: <BookOpen className="size-5 shrink-0 text-black" />,
  },

  {
    title: "About",
    url: "/about",
    icon: <Info className="size-5 shrink-0 text-black" />,
  },

  {
    title: "Help",
    url: "/help",
    icon: <Phone className="size-5 shrink-0 text-black" />,
  },
];
const lobster = Lobster({
  weight: "400", // Lobster only has one weight
  subsets: ["latin"],
});

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

const Navbar = () => {
  return (
    <section className="p-2">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/*Logo */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={"/"} className="flex items-center gap-2">
              <div className="flex justify-center items-center border-2 border-black  rounded-full w-8 h-8">
                <UtensilsCrossed size={16} />
              </div>
              <span
                className={`${lobster.className} text-lg font-semibold tracking-tighter`}
              >
                PlateShare
              </span>
            </Link>
          </div>
          {/* nav items */}
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* auth items */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={"/"} className="flex items-center gap-2">
              <div className="flex justify-center items-center border-2 border-black rounded-full w-12 h-12">
                <UtensilsCrossed />
              </div>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={"/"} className="flex items-center gap-2">
                      <div className="flex justify-center items-center border-2 border-black rounded-full w-12 h-12">
                        <UtensilsCrossed />
                      </div>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      Login
                    </Button>
                    <Button asChild>Sign up</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>
          <div className="flex items-center gap-2 ">
            {item.icon}
            <span>{item.title}</span>
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors
    bg-background hover:bg-muted hover:text-foreground"
      >
        <div className="flex items-center gap-2 ">
          {item.icon}
          <span>{item.title}</span>
        </div>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
