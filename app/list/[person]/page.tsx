import { createClient } from "@/utils/supabase/server";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import React from "react";

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
      <div className="container mx-auto py-5 w-auto">
        <DataTable columns={columns} data={sales} />
      </div>
    </div>
  );
};

export default page;
