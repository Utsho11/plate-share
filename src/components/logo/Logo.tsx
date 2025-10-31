import { UtensilsCrossed } from 'lucide-react'
import { Lobster } from "next/font/google";

const lobster = Lobster({
  weight: "400", // Lobster only has one weight
  subsets: ["latin"],
});
const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-2">
    <div className="flex justify-center items-center border-2 border-black rounded-full w-20 h-20">
      <UtensilsCrossed size={48} />
    </div>
    <p className={`${lobster.className} text-5xl`}>PlatShare</p>
  </div>
  )
}

export default Logo