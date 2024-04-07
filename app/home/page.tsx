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

  return (
    <>
      <div className="flex min-h-screen">
        <Nav org={user.email} />
        <div className="flex-1 ml-3 ">
          <Header title={"Data"} />
          <div className="container mx-auto py-5 w-auto flex flex-col">
            <DateSelect data={sales} />
          </div>
        </div>
      </div>
    </>
  );
}
