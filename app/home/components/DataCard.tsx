import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createClient } from "@/utils/supabase/client";
import { CircleUser } from "lucide-react";

interface Props {
  org: string | undefined;
  current: boolean;
}

interface Sales {
  created_at: string;
  person: string;
  status: string;
}

interface Member {
  id: number;
  person: string;
}

function calculateAppointment(
  records: Sales[],
  members: Member[],
  year: number,
  month: number
) {
  // Initialize maps for counting
  const appointmentsCount: { [key: string]: number } = {};
  const totalCount: { [key: string]: number } = {};

  // Count total and appointments for each member
  records.forEach((record) => {
    const date = new Date(record.created_at);
    if (date.getFullYear() === year && date.getMonth() + 1 === month) {
      // Count total records for each member in the given month
      if (totalCount[record.person]) {
        totalCount[record.person]++;
      } else {
        totalCount[record.person] = 1;
      }

      // Count only "アポ取得" status
      if (record.status === "アポ取得") {
        if (appointmentsCount[record.person]) {
          appointmentsCount[record.person]++;
        } else {
          appointmentsCount[record.person] = 1;
        }
      }
    }
  });

  // Calculate percentages
  const results = members.map((member) => {
    const total = totalCount[member.person] || 0;
    const appointments = appointmentsCount[member.person] || 0;
    const percentage = total > 0 ? (appointments / total) * 100 : 0;
    return {
      ...member,
      totalRecords: total,
      appointments: appointments,
      percentage: percentage.toFixed(2) + "%",
    };
  });

  return results;
}

export async function DataCard({ org, current }: Props) {
  const supabase = createClient();

  const { data: sales, error } = await supabase
    .from("sales")
    .select("created_at,person,status")
    .eq("email", org)
    .neq("status", null);

  if (error) {
    console.log(error);
  }

  const { data: member } = await supabase
    .from("members")
    .select("id, person")
    .eq("org", org);

  if (error) {
    console.log(error);
  }

  const Sales = sales || [];
  const Member = member || [];

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const premonth = month - 1;

  const preReport = calculateAppointment(Sales, Member, year, premonth);
  const Report = calculateAppointment(Sales, Member, year, month);

  return (
    <Card className="w-[280px]  border-gray-400">
      <CardHeader>
        <div className="flex items-center">
          <CardTitle>
            {current ? (
              <span className="">
                {year}-{month}
              </span>
            ) : (
              <span>
                {year}-{premonth}
              </span>
            )}
            <span className="font-medium pl-10">記録</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="gap-4">
          {(current ? Report : preReport)?.map((data) => (
            <div
              key={data.id}
              className="flex items-center justify-center mb-2"
            >
              <CircleUser className="flex-shrink-0" />
              <div className="flex flex-grow ">
                <div className="pl-2">{data.person}</div>
              </div>
              <div className="flex flex-grow">
                <div className="">
                  {data.appointments}/{data.totalRecords}
                  <span className="pl-6">{data.percentage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardDescription className="text-gray-400 pl-3 pb-3"></CardDescription>
    </Card>
  );
}
