import { UtensilsCrossed } from "lucide-react";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  weight: "400", // Lobster only has one weight
  subsets: ["latin"],
});
const NavBarLogo = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="flex justify-center items-center border-2 border-white text-white rounded-full w-12 h-12">
        <UtensilsCrossed size={24} />
      </div>
      <p className={`${lobster.className} text-xl text-white`}>PlatShare</p>
    </div>
  );
};

export default NavBarLogo;
