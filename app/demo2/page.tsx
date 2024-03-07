import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/server';
import { PlusSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

async function getData(): Promise<Payment[]> {
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
    //const [add,setAdd] = useState<boolean>(false);


  const data = await getData()

  /*const handleSubmit = () => {
    setAdd(true);
    console.log(add);
  }*/


  return (
    <div>

    <PlusSquare className="mt-5 cursor-pointer" />

    <Button key={1} variant="outline" >Add</Button>
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    
    </div>
  )
}