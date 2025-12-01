"use client";
import PSForm from "@/src/components/Form/PSForm";
import PSInput from "@/src/components/Form/PSInput";
import { Button } from "@/src/components/ui/button";
import { useCreateCommunityMutation } from "@/src/redux/api/communityApi";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CreateCommunity = () => {
  const [createCommunity] = useCreateCommunityMutation();

  const handleSubmit = async (values: FieldValues) => {
    try {
      const res = await createCommunity(values).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Community created successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create community");
    }
  };
  
  return (
    <div>
      <PSForm onSubmit={handleSubmit}>
        <PSInput name="name" placeholder="Enter community name" required />
        <Button variant={"outline"} className="mt-4" type="submit">
          Create Community
        </Button>
      </PSForm>
    </div>
  );
};

export default CreateCommunity;
