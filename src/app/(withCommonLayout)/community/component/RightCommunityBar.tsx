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
import { Newspaper, PlusCircle } from "lucide-react";
import Link from "next/link";
import CreateCommunity from "./CreateCommunity";
import { useGetAllCommunitiesQuery } from "@/src/redux/api/communityApi";

const RightCommunityBar = () => {
  const { data } = useGetAllCommunitiesQuery({});

  // console.log(data);

  return (
    <Card>
      <CardHeader>
        <div className="mb-4">
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
        </div>
        <CardTitle>My Communities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((c: any) => (
            <div
              key={c._id}
              className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <h2 className="font-medium">{c.name}</h2>
              {/* <p className="text-sm text-gray-500">{c.} members</p> */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RightCommunityBar;
