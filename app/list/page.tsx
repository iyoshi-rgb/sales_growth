import { Sales, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

async function getData(): Promise<Sales[]> {
  // Fetch data from your API here.
  const supabase = createClient();
  
let { data: sales, error } : any = await supabase
.from('sales')
.select('*')

//console.log(sales);
if(error){
    console.log(error);
}
        
  return sales;
    
}


export default async function DemoPage() {

  const data = await getData()

  return (
    <>
    <div className="w-full">
      <Header/>
    </div>
    <div className="container mx-auto py-5 w-auto">
      <DataTable columns={columns} data={data} />
    </div>
   
    <div className="w-full">
    <Footer/>
    </div>
    </>
  )
}