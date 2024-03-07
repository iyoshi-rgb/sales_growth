import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";


export default async function Index() {
  
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (user) {
      return redirect("/protected");
    }

  
 
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Header />

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          Top Page
        </main>
      </div>
      <Footer/>
    </div>
  );
  }