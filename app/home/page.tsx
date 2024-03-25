import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Nav from "../../components/Nav";
import { DataCard } from "./components/DataCard";
import MemberData from "./components/MemberData";

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
      <div className="flex min-h-screen">
        <Nav org={user.email} />
        <div className="flex-1 flex flex-col ">
          <div className="">
            <p className="font-bold text-4xl py-4 pl-6">Home</p>
          </div>
          <div className="flex flex-1">
            {/*<div className="w-1/2 flex justify-center items-center">
              <div className="mx-5 my-3">
                <Member org={user.email} />
              </div>
  </div>*/}

            <div className="flex flex-1 justify-center items-center">
              {/* コンテンツコンテナ */}
              <div className="w-full max-w-4xl flex flex-col items-center justify-center">
                {/* MemberDataとDataCardのセクション */}
                <div className="flex w-full justify-around mb-8">
                  <MemberData current={false} org={user.email} />
                  <MemberData current={true} org={user.email} />
                </div>
                <div className="flex w-full justify-around">
                  <DataCard current={false} org={user.email} />
                  <DataCard current={true} org={user.email} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
