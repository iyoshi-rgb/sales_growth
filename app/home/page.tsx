import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Nav from "../../components/Nav";
import Header from "@/components/Header";
import DateSelect from "./components/DateSelect";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const { data: sales, error } = await supabase
    .from("sales")
    .select("created_at,person,status")
    .eq("email", user.email);

  const section = [
    { title: "List", url: "list" },
    { title: "Data", url: "home" },
    { title: "Note", url: "workspace" },
  ];

  return (
    <>
      <div className="flex min-h-screen">
        {/*<Nav org={user.email} />*/}
        <div className="flex-1">
          <Header sections={section} title="Data" />

          <div className="container  py-5 w-auto flex flex-col">
            <DateSelect data={sales} />
          </div>
        </div>
      </div>
    </>
  );
}
