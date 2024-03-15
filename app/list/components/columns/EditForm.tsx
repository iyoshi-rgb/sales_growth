import { Sales } from "@/app/list/components/columns"
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"


interface Props {
    editInfo: Sales | null;
    users: {
      id: number
      person: string
    }[] 
}


type editValues = {
    created_at: Date
    client: string
    phone: string
    person: string
    status: string
  }
  


  const EditForm = ({editInfo, users} : Props) => {
    const today = new Date();
    const router = useRouter();
    
    const defaultValues = {
        created_at: today,
        client: editInfo?.client,
        phone: editInfo?.phone,
        person: editInfo?.person,
        status: editInfo?.status,
      }

   

      const {
        register,
        handleSubmit,
        setValue,
        formState: { isDirty, isValid },
      } = useForm<editValues>({
        mode: 'onChange',
        defaultValues,
      })
      const onSubmit = async (values: editValues) => {
        const supabase = createClient();
        const { data, error } = await supabase.from('sales')
        .update({
          'created_at' : values.created_at,
          'client' : values.client,
          'phone': values.phone,
          'person': values.person,
          'status': values.status})
        .eq('id', editInfo?.id)
        .select()
        router.push('/list');
        router.refresh();
        
      }

    return (
      <div>
       
         <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col w-full justify-center text-foreground">
              <label className="text-md">
              client
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border"
                {...register('client', { required: '入力してください' })} 
                placeholder="●●株式会社" 
              />
            <label className="text-md">
              phone
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border"
                {...register('phone', { required: false })} 
                placeholder="***-***-***" 
              />
        <label className="text-md">
          担当者
        </label>  
        <select {...register('person', { required: false })}
        className="rounded-md px-4 py-2 bg-inherit border">
          {users?.map((user) => (
            <option value={user.person} key={user.id}>
              {user.person}
            </option>
          ))}
        </select>
        <label className="text-md">
          状況
        </label>
        <select {...register('status', { required: false })}
         className="rounded-md px-4 py-2 bg-inherit border">
          <option value="再架電">再架電</option>
          <option value="アポ取得">アポ取得</option>
          <option value="不在">不在</option>
        </select>
        
    
          <Button type="submit" variant='outline' disabled={!isDirty || !isValid} className="text-center">
            保存
          </Button>
    
      </form>
          
        
      </div>
    )
  }
  
  export default EditForm
  