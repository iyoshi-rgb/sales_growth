import * as React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Data from "./components/Data";
import Nav from "@/components/Nav";
import Header from "@/components/Header";

export default async function DataTable() {
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

  const { data: members, err }: any = await supabase
    .from("members")
    .select("person")
    .eq("org", user.email);

  const member = members.map((item: any) => item.person);

  return (
    <>
      <div className="flex min-h-screen">
        <Nav org={user?.email} />

        <div className="flex-1 ml-3">
          <Header title="List" />
          <div className="container mx-auto py-5 w-auto flex flex-col">
            <Data sales={sales} members={member} org={user.email} />
          </div>
        </div>
      </div>
    </>
  );
}
