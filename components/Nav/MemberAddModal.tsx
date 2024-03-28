"use client";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import React from "react";
import { useState } from "react";
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
  const [isModal, setIsModal] = useState<boolean>(false);

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
      router.push("/home");
      router.refresh();
      setIsModal(!isModal);
    } else {
      console.log(error);
    }
  };

  const Modal = () => {
    setIsModal(!isModal);
    console.log(isModal);
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
              className="text-white bg-black w-auto mt-4"
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
