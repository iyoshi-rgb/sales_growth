import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  users: {
    id: number;
    person: string;
  }[];
}

type List = {
  name: string;
};

const SearchList = ({ users }: Props) => {
  const router = useRouter();

  const defaultValues = {
    name: "",
  };

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<List>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (values: List) => {
    let listName = values.name;

    router.push(`/list/${listName}`);
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
        <Button
          variant={"default"}
          type="submit"
          className="mt-4 bg-black text-white"
          disabled={!isDirty || !isValid}
        >
          選ぶ
        </Button>
      </form>
    </div>
  );
};

export default SearchList;
