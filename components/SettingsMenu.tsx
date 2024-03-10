import {LogOut,Mail,MessageSquare,Settings,User,UserPlus,} from "lucide-react"
   
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
   
  export async function SettingsMenu() {

    const supabase = createClient();

    const {
    data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";

        console.log('signout')
    
        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/");
      };
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Settings className='text-gray-600 hover:text-black cursor-pointer ml-auto'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span className="hover: cursor-pointer">Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span className="hover: cursor-pointer">member</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span className="hover: cursor-pointer">Add</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span className="text-red-500 hover: cursor-pointer">Delete</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }