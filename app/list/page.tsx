import { Sales, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { createClient } from "@/utils/supabase/server";
import Nav from "../../components/Nav";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

async function getData(): Promise<Sales[]> {
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
    .eq("email", user.email);

  if (error) {
    console.log(error);
  }

  return sales;
}

export default async function DemoPage() {
  const data = await getData();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="flex min-h-screen">
        <Nav org={user?.email} />

        <div className="flex-1 ml-3">
          <Header title="List" />
          <div className="container mx-auto py-5 w-auto flex flex-col">
            <DataTable columns={columns} data={data} user={user?.email} />
          </div>
        </div>
      </div>
    </>
  );
}
