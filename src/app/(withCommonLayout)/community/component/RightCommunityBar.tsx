"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Globe, Newspaper, PlusCircle } from "lucide-react";
import Link from "next/link";
import CreateCommunity from "./CreateCommunity";
import { useGetAllCommunitiesQuery } from "@/src/redux/api/communityApi";

const RightCommunityBar = () => {
  const { data, isLoading } = useGetAllCommunitiesQuery({});

  // console.log(data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader className="">
        <div className="mb-4 space-y-2">
          <Link href="/community" className="text-start w-full">
            <Button
              variant="outline"
              className="w-full justify-start"
              style={{ textDecoration: "none", padding: "0 4px" }}
            >
              <Newspaper /> My Feed
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger className="flex items-center text-sm font-semibold py-2 px-1 hover:bg-accent mt-2 border rounded-lg gap-2 w-full">
              <PlusCircle size={16} /> Create Community
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create Your Community</DialogTitle>
              <CreateCommunity />
            </DialogContent>
          </Dialog>
          <Link href="/community" className="text-start w-full">
            <Button
              variant="outline"
              className="w-full justify-start"
              style={{ textDecoration: "none", padding: "0 4px" }}
            >
              <Globe /> Explore Communities
            </Button>
          </Link>
        </div>
        <CardTitle>My Communities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((c: any) => (
            <div
              key={c._id}
              className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            >
              <div>
                <h2 className="font-medium">{c.name}</h2>
                {/* <p className="text-sm text-gray-500">{c.} members</p> */}
              </div>
              <Button variant={"destructive"}>Leave</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RightCommunityBar;
