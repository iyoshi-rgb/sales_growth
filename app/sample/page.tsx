import * as React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Data from "./components/Data";

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

  return (
    <>
      <Data sales={sales} />
    </>
  );
}
