import LeftSidebar from "@/src/components/Shared/Sidebar/LeftSideBar";
import RightSidebar from "@/src/components/Shared/Sidebar/RightSideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        <aside className="hidden md:block md:col-span-3">
          <LeftSidebar />
        </aside>

        <main className="col-span-12 md:col-span-6">{children}</main>

        <aside className="hidden lg:block lg:col-span-3">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
};

export default Layout;
