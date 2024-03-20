import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { ClipboardPlus } from "lucide-react";

interface Props {
  users: {
    id: number;
    person: string;
  }[];
  auth: string | null | undefined;
}

type addValues = {
  created_at: Date;
  client: string;
  phone: string;
  person: string;
  status: string;
};

const AddModal = ({ users, auth }: Props) => {
  const today = new Date();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const defaultValues = {
    created_at: today,
    client: "",
    phone: "",
    person: "",
    status: "",
  };

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<addValues>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (values: addValues) => {
    const supabase = createClient();
    const { data, error }: any = await supabase
      .from("sales")
      .insert([
        {
          created_at: today,
          client: values.client,
          phone: values.phone,
          person: values.person,
          status: values.status,
          email: auth,
        },
      ])
      .select();

    if (data) {
      console.log(data);
      router.refresh();
      setIsModalOpen(false);
    }
    if (error) {
      console.log(error);
    }
  };

  const Modal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <Button className="mx-5 relative group" onClick={() => Modal()}>
        <ClipboardPlus />
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 bg-white text-xs  px-2">
          顧客の追加
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
              <h2 className="text-lg font-semibold">追加</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex-1 flex flex-col w-full justify-center text-foreground gap-3"
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
                  {...register("phone", { required: true })}
                  placeholder="***-***-***"
                />
                <label className="text-md">担当者</label>
                <select
                  {...register("person", { required: false })}
                  defaultValue={defaultValues.person}
                  className="rounded-md px-4 py-2 bg-inherit border"
                >
                  {users?.map((user: any) => (
                    <option value={user.person} key={user.id}>
                      {user.person}
                    </option>
                  ))}
                </select>
                <label className="text-md">状況</label>
                <select
                  {...register("status", { required: false })}
                  defaultValue={defaultValues.status}
                  className="rounded-md px-4 py-2 bg-inherit border"
                >
                  <option value="再架電">再架電</option>
                  <option value="アポ取得">アポ取得</option>
                  <option value="不在">不在</option>
                </select>
                <Button variant={"outline"} type="submit">
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

export default AddModal;
