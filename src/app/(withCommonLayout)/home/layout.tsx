import LeftSidebar from "@/src/components/Shared/Sidebar/LeftSideBar";
import RightSidebar from "@/src/components/Shared/Sidebar/RightSideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Central Main Content */}
        <main className="col-span-1 lg:col-span-6 space-y-6">
          {children}
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default Layout;
