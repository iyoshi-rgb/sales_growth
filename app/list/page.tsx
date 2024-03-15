import { Sales, columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { createClient } from '@/utils/supabase/server';
import Nav from "../../components/Nav";

async function getData(): Promise<Sales[]> {
  // Fetch data from your API here.
  const supabase = createClient();
  
let { data: sales, error } : any = await supabase
.from('sales')
.select('*')

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
      <Nav/>
    </div>
    <div className="container mx-auto py-5 w-auto">
      <DataTable columns={columns} data={data} />
    </div>
   
    </>
  )
}