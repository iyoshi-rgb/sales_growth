import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  users: {
    id: number;
    person: string;
  }[];
}

type List = {
  name: string;
};

const AddList = ({ id, users }: Props) => {
  const router = useRouter();

  const defaultValues = {
    name: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<List>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (values: List) => {
    console.log(values);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("sales")
      .update({
        accept: true,
        list: values.name,
      })
      .eq("id", id)
      .select();

    if (data) {
      console.log(data);
    }
    router.push("/list");
    router.refresh();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex flex-col w-full justify-center text-foreground"
      >
        <select
          {...register("name", { required: true })}
          className="rounded-md px-4 py-2 bg-inherit border"
        >
          {users?.map((user) => (
            <option value={user.person} key={user.id}>
              {user.person}
            </option>
          ))}
        </select>
        <Button variant={"outline"} type="submit">
          追加
        </Button>
      </form>
    </div>
  );
};

export default AddList;
