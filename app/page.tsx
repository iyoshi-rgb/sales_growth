import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TopPage from "./components/TopPage";
import Login from "./components/Login";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/list");
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full flex justify-center items-center bg-gray-300 ">
        <TopPage />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <Login />
      </div>
    </div>
  );
}
