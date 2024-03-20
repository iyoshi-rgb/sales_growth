import { createClient } from "@/utils/supabase/server";
import { columns } from "../[person]/components/colums";
import { DataTable } from "../[person]/components/data-table";
import React from "react";
import Nav from "@/components/Nav";
import { Sales } from "../components/columns";
import { redirect } from "next/navigation";

async function getData(name: string): Promise<Sales[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const { data: sales, error }: any = await supabase
    .from("sales")
    .select("*")
    .eq("email", user.email)
    .eq("list", name);

  if (error) {
    console.log(error);
  }

  return sales;
}

const page = async ({ params }: { params: { person: string } }) => {
  const name = decodeURIComponent(params.person);

  const data = await getData(name);

  return (
    <div>
      <Nav />
      <p className="font-bold text-2xl pt-6 pl-6 font-mono">{name}のList</p>
      <div className="container mx-auto py-5 w-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default page;
