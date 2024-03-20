import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createClient } from "@/utils/supabase/client";

interface Props {
  org: string | undefined;
}

interface Sales {
  created_at: string;
  person: string;
}

const getThisMonthRecords = (records: Sales[]): Sales[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  return records.filter((record) => {
    const recordDate = new Date(record.created_at);
    return (
      recordDate.getFullYear() === currentYear &&
      recordDate.getMonth() === currentMonth
    );
  });
};

const getPreMonthRecords = (records: Sales[]): Sales[] => {
  const now = new Date();
  let currentYear = now.getFullYear();
  let preMonth = now.getMonth() - 1;

  if (preMonth < 0) {
    preMonth = 11;
    currentYear--;
  }

  return records.filter((record) => {
    const recordDate = new Date(record.created_at);
    return (
      recordDate.getFullYear() === currentYear &&
      recordDate.getMonth() === preMonth
    );
  });
};

export async function DataCard({ org }: Props) {
  const supabase = createClient();

  const { data: sales, error } = await supabase
    .from("sales")
    .select("created_at,person")
    .eq("email", org)
    .eq("status", "アポ取得");

  if (error) {
    console.log(error);
  }

  const Sales = sales || [];

  const ThisMonthSales = getThisMonthRecords(Sales);
  const ThisMonthData = ThisMonthSales.length;
  const PreMonthSales = getPreMonthRecords(Sales);
  const PreMonthData = PreMonthSales.length;
  const difference = ThisMonthData - PreMonthData;
  let description = "";
  if (difference > 0) {
    description = "対前月比: +" + difference;
  } else if (difference === 0) {
    description = "対前月比: ±" + difference;
  } else {
    description = "対前月比: " + difference;
  }

  return (
    <Card className="w-[280px]">
      <CardHeader>
        <div className="flex items-center">
          <CardTitle>今月の合計</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="font-bold text-4xl ">
        <div className="text-center">{ThisMonthData}件</div>
      </CardContent>
      <CardDescription className="text-gray-400 pl-3 pb-3">
        {description}
      </CardDescription>
    </Card>
  );
}
