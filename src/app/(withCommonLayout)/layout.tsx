import { Navbar } from "@/src/components/Shared/Navbar/Navbar";
import Footer from "@/src/components/Shared/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        <main className="">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
