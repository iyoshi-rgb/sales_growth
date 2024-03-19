import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type editValues = {
  created_at: Date;
  client: string;
  phone: string;
  person: string;
  status: string;
};

const EditModal = ({ saleInfo, users }: any) => {
  const today = new Date();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const defaultValues = {
    created_at: today,
    client: saleInfo?.client,
    phone: saleInfo?.phone,
    person: saleInfo?.person,
    status: saleInfo?.status,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<editValues>({
    mode: "onChange",
    defaultValues,
  });
  const onSubmit = async (values: editValues) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("sales")
      .update({
        created_at: values.created_at,
        client: values.client,
        phone: values.phone,
        person: values.person,
        status: values.status,
      })
      .eq("id", saleInfo?.id)
      .select();
    if (error) {
      console.log(error);
    } else {
      router.refresh();
      setIsModalOpen(false);
    }
  };

  const Modal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <Button onClick={() => Modal()} className="relative group">
        <FilePenLine />
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 bg-white text-xs  px-2">
          編集
        </span>
      </Button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end"
          onClick={Modal}
        >
          <div
            className="w-1/4 h-full bg-white overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold">編集</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex-1 flex flex-col w-full justify-center text-foreground"
              >
                <label className="text-md">client</label>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border"
                  {...register("client", { required: "入力してください" })}
                  placeholder="●●株式会社"
                />
                <label className="text-md">phone</label>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border"
                  {...register("phone", { required: false })}
                  placeholder="***-***-***"
                />
                <label className="text-md">担当者</label>
                <select
                  {...register("person", { required: false })}
                  className="rounded-md px-4 py-2 bg-inherit border"
                >
                  {users?.map((users: any) => (
                    <option value={users.person} key={users.id}>
                      {users.person}
                    </option>
                  ))}
                </select>
                <label className="text-md">状況</label>
                <select
                  {...register("status", { required: false })}
                  className="rounded-md px-4 py-2 bg-inherit border"
                >
                  <option value="再架電">再架電</option>
                  <option value="アポ取得">アポ取得</option>
                  <option value="不在">不在</option>
                </select>

                <Button
                  type="submit"
                  variant="outline"
                  disabled={!isDirty || !isValid}
                  className="text-center"
                >
                  保存
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
