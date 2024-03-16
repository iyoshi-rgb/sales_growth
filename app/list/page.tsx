import { Sales, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { createClient } from "@/utils/supabase/server";
import Nav from "../../components/Nav";
import { redirect } from "next/navigation";

async function getData(): Promise<Sales[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  let { data: sales, error }: any = await supabase
    .from("sales")
    .select("*")
    .eq("email", user.email);

  if (error) {
    console.log(error);
  }

  return sales;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      <div className="w-full">
        <Nav />
      </div>
      <p className="font-bold text-4xl pt-4 pl-6 font-mono">List</p>
      <div className="container mx-auto py-5 w-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
