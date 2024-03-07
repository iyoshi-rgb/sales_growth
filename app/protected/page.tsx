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
    return redirect("/login");
  }



  const {data} : any = await supabase.from('org').select('*').eq('email', user?.email)

  if(data.length > 0){
    return redirect('/list');
  }

  return  ( 
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
    <Header />

    <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
    <main className="flex-1 flex flex-col gap-6">
      <div>
        <Form key={user.id} email={user.email}/>
      </div>
    </main>
  
      </div>
    <Footer/>
  </div>

  );
  
}