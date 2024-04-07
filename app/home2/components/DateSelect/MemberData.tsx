import { createClient } from "@/utils/supabase/client";
import React from "react";

const MemberData = async () => {
  const supabase = createClient();

  const { data: sales, error } = await supabase
    .from("sales")
    .select("created_at,person,status");

  console.log(sales);
  return <div>aaaaaaaaaaaaaaa</div>;
};

export default MemberData;
