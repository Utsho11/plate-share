import { Navbar } from "@/src/components/Shared/NavBar/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
