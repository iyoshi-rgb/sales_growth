import Header from '@/components/Header';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import React from 'react'
import List from './components/List';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const page = async () => {
    const supabase = createClient();
    
    const { data: { user },} = await supabase.auth.getUser();

    if(!user){
        return redirect('/login');
    }
    
    const {data} : any = await supabase.from('org').select('*').eq('email', user?.email);

    const orgName = data[0]?.org;

  
  let { data: sales, error } = await supabase.from('sales').select('*')
        
    //console.log(sales)

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
    <Header />
    <Button>Click me</Button>
      list
      <br></br>
      {orgName}
      <div>
        {sales?.map((sale) => (
          <List key={sale.id} id={sale.id} created_at={sale.created_at} client={sale.client} phone={sale.phone} person={sale.person} status={sale.status} accept={sale.accept} hot={sale.hot}/> 
        ))}
      </div>
    <Footer/>
    </div>
  )
}

export default page