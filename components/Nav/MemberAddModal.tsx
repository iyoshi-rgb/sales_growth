"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import { CircleUser } from "lucide-react";

type AddUser = {
  memberName: string;
};

const MemberAddModal = ({ org }: any) => {
  const router = useRouter();
  const supabase = createClient();

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

  const onSubmit = async (value: AddUser) => {
    const { data, error } = await supabase
      .from("members")
      .insert([{ person: value.memberName, org: org }])
      .select();
    if (data) {
      alert(
        `${value.memberName}を追加しました!\n画面が止まってしまった場合はリロードしてください💦`
      );
      router.refresh();
    } else {
      console.log(error);
      alert("追加に失敗しました😢");
    }
  };

  return (
    <div>
      <div>
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label className="mb-2">名前を入力してください。</label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-3"
              {...register("memberName", { required: "入力してください" })}
            />
            <Button
              type="submit"
              className="text-white bg-cyan-700 hover:bg-cyan-900 w-auto mt-4"
              disabled={!isDirty || !isValid}
            >
              <CircleUser className="mr-3" />
              追加
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberAddModal;
