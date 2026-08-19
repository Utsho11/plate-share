import { UtensilsCrossed } from "lucide-react";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
});

const sizeConfig = {
  lg: { icon: 44, wrapper: "w-16 h-16 sm:w-20 sm:h-20", text: "text-4xl sm:text-5xl" },
  md: { icon: 28, wrapper: "w-12 h-12 sm:w-14 sm:h-14", text: "text-2xl sm:text-3xl" },
  sm: { icon: 18, wrapper: "w-8 h-8 sm:w-10 sm:h-10", text: "text-lg sm:text-xl" },
} as const;

const Logo = ({ size }: { size: "lg" | "md" | "sm" }) => {
  const { icon, wrapper, text } = sizeConfig[size];

  return (
    <div className="flex justify-center items-center gap-2.5 select-none">
      <div
        className={`flex justify-center items-center bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-full shadow-md ${wrapper}`}
      >
        <UtensilsCrossed size={icon} className="stroke-[2.2]" />
      </div>
      <p className={`${lobster.className} ${text} text-gray-900 dark:text-white tracking-wide`}>
        PlateShare
      </p>
    </div>
  );
};

export default Logo;
