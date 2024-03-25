import { createClient } from "@/utils/supabase/server";
import { columns } from "../[person]/components/colums";
import { DataTable } from "../[person]/components/data-table";
import React from "react";
import Nav from "@/components/Nav";
import { Sales } from "../components/columns";
import { redirect } from "next/navigation";

{
  /*async function getData(name: string): Promise<Sales[]> {
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
}*/
}

const page = async ({ params }: { params: { person: string } }) => {
  const name = decodeURIComponent(params.person);

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

  //const data = await getData(name);

  return (
    <div className="flex min-h-screen">
      <Nav org={user.email} />

      <div className="flex-1 ml-3">
        <p className="font-bold text-4xl pt-4 pl-6">{name}のList</p>
        <div className="container mx-auto py-5 w-auto flex flex-col">
          <DataTable columns={columns} data={sales} />
        </div>
      </div>
    </div>
  );
};

export default page;
