import Link from "next/link";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/src/components/ui/navigation-menu";
interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export const renderMenuItem = (item: MenuItem) => {
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

export const renderMobileMenuItem = (item: MenuItem) => {
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

export const SubMenuLink = ({ item }: { item: MenuItem }) => {
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
