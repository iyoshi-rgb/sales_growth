import { SubmitButton } from '@/components/submit-button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

import React from 'react'

interface Props{
    email: string | any,
}

const Form : React.FC<Props> = async ({email}) => {

    const signOrg = async (formData: FormData) => {
        "use server";
    
        const org = formData.get("org") as string;
        const supabase = createClient();

        console.log(org,email);
    
        const { data, error } = await supabase.from('org').
        insert([{ org: org, email: email },]).select()
        
    
        //if (error) {
          //return redirect("/login?message=Could not authenticate user");
        //}
    
       return redirect("/list");
      };


  return (
    <div>
    <div>
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
    <label className="text-md" htmlFor="email">
      組織/会社名
    </label>
    <input
      className="rounded-md px-4 py-2 bg-inherit border mb-6"
      name="org"
      placeholder="///株式会社"
      required
    />
     <SubmitButton
          formAction={signOrg}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          登録
        </SubmitButton>
    </form>
    </div>
    </div>
 
  )
}

export default Form;

