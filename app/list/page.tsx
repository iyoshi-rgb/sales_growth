import Header from '@/components/Header';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const supabase = createClient();
    
    const { data: { user },} = await supabase.auth.getUser();

    if(!user){
        return redirect('/login');
    }
    
    const {data} : any = await supabase.from('org').select('*').eq('email', user?.email)

    const orgName = data[0]?.org;

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
    <Header />
      list
      <br></br>
      {orgName}
    </div>
  )
}

export default page