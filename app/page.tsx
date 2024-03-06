import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";


export default async function Index() {
  
    const supabase = createClient();
    const { data} : any  = await supabase.from("notes").select('*');
    const notes = data[0].title

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
          <h2 className="font-bold text-4xl mb-4">{JSON.stringify(notes, null, 2)}</h2>
        </main>
      </div>
      <Footer/>
    </div>
  );
  }