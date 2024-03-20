import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Nav from "../../components/Nav";
import { DataCard } from "./components/DataCard";
import MemberData from "./components/MemberData";
import Member from "./components/Member";
import Footer from "@/components/Footer";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col min-h-screen">
        <p className="font-bold text-4xl py-4 pl-6 ">Home</p>

        <div className="flex flex-1">
          <div className="w-1/2 flex justify-center items-center">
            <div className="mx-5 my-3">
              <Member org={user.email} />
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center justify-between mx-3 my-3 gap-4">
                <MemberData current={false} org={user.email} />
                <MemberData current={true} org={user.email} />
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="flex items-center justify-center mx-3 my-3 gap-3">
                <DataCard current={false} org={user.email} />
                <DataCard current={true} org={user.email} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
