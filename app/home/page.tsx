import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Form from "./components/Form";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }


  return  ( 
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
    Home
  </div>

  );
  
}