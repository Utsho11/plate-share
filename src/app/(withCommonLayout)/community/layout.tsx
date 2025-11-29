import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const demoCommunities = [
  { id: 1, name: "Web Developers", members: 1200 },
  { id: 2, name: "Food Lovers", members: 850 },
  { id: 3, name: "Travel Explorers", members: 430 },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Main content */}
        <main className="col-span-12 md:col-span-9 space-y-4">{children}</main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>My Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {demoCommunities.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <h2 className="font-medium">{c.name}</h2>
                      <p className="text-sm text-gray-500">
                        {c.members} members
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
