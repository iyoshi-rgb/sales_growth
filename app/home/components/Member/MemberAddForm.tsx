"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";

type AddUser = {
  memberName: string;
};

const MemberAddForm = ({ org }: any) => {
  const [addName, setAddName] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  console.log(org);

  const defaultValues = {
    memberName: "",
  };

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<AddUser>({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (!addName) return;

    const addUser = async () => {
      const { data, error } = await supabase
        .from("members")
        .insert([{ person: addName, org: org }])
        .select();
      if (data) {
        router.push("/home");
        router.refresh();
      } else {
        console.log(error);
      }
    };

    addUser();
  }, [addName]);

  const onSubmit = (values: AddUser) => {
    setAddName(values.memberName);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="mb-2">名前を入力してください。</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-3"
          {...register("memberName", { required: "入力してください" })}
        />
        <Button type="submit" className="text-white bg-black w-auto">
          <CircleUser className="mr-3" />
          追加
        </Button>
      </form>
    </div>
  );
};

export default MemberAddForm;
