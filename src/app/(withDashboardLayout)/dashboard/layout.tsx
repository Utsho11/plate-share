import { Navbar } from "@/src/components/Shared/NavBar/NavBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="relative mb-4">
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
