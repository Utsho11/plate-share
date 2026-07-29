import { UtensilsCrossed } from "lucide-react";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
});

const sizeConfig = {
  lg: { icon: 48, wrapper: "w-20 h-20", text: "text-5xl" },
  md: { icon: 32, wrapper: "w-15 h-15", text: "text-3xl" },
  sm: { icon: 20, wrapper: "w-10 h-10", text: "text-xl" },
} as const;

const Logo = ({ size }: { size: "lg" | "md" | "sm" }) => {
  const { icon, wrapper, text } = sizeConfig[size];

  return (
    <div className="flex justify-center items-center gap-2">
      <div
        className={`flex justify-center items-center border-2 border-black rounded-full ${wrapper}`}
      >
        <UtensilsCrossed size={icon} />
      </div>
      <p className={`${lobster.className} ${text}`}>PlateShare</p>
    </div>
  );
};

export default Logo;
