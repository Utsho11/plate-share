import RightCommunityBar from "./component/RightCommunityBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Main content */}
        <main className="col-span-12 md:col-span-9 space-y-4">{children}</main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24">
            <RightCommunityBar />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
