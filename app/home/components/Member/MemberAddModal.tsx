import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
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

  const Modal = () => setIsModal(!isModal);

  return (
    <div>
      <Button variant="outline" onClick={() => Modal()}>
        <UserPlus />
        <span className="pl-2 font-bold">追加</span>
      </Button>

      {isModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end"
          onClick={Modal}
        >
          <div
            className="w-1/4 h-full bg-white overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberAddModal;
