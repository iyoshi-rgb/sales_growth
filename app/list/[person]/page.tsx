import { createClient } from "@/utils/supabase/server";
import { columns } from "../[person]/components/colums";
import { DataTable } from "../[person]/components/data-table";
import React from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const page = async ({ params }: { params: { person: string } }) => {
  const name = decodeURIComponent(params.person);

  const supabase = createClient();

  let { data: sales, error } = await supabase
    .from("sales")
    .select("*")
    .eq("list", name);
  if (error) {
    console.log(error);
    sales = [];
  }

  sales = sales || [];

  return (
    <div>
      <Nav />
      <p className="font-bold text-2xl pt-6 pl-6 font-mono">{name}のList</p>
      <div className="container mx-auto py-5 w-auto">
        <DataTable columns={columns} data={sales} />
      </div>
    </div>
  );
};

export default page;
