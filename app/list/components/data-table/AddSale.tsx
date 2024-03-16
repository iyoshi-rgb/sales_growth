"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

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

const AddSale = ({ users, auth }: Props) => {
  console.log(users);

  const router = useRouter();

  const today = new Date();
  const [submitData, setSubmitData] = useState<any>();

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

  useEffect(() => {
    if (!submitData) return;

    const insertDB = async () => {
      const supabase = createClient();

      const { data, error }: any = await supabase
        .from("sales")
        .insert([
          {
            created_at: today,
            client: submitData.client,
            phone: submitData.phone,
            person: submitData.person,
            status: submitData.status,
            email: auth,
          },
        ])
        .select();

      if (data) {
        console.log(data);
      }
      if (error) {
        console.log(error);
      }
    };
    insertDB();
    setSubmitData(null);
    router.push("/list");
    router.refresh();
  }, [submitData]);

  const onSubmit = (values: addValues) => {
    setSubmitData(values);
  };

  return (
    <div>
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
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddSale;
