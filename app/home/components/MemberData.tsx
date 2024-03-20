import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CircleUser } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Sales {
  created_at: string;
  person: string;
}

interface Props {
  current: boolean;
  org: string | undefined;
}

const groupByMonth = (records: Sales[]) => {
  return records.reduce((acc, record) => {
    const date = new Date(record.created_at);
    const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }
    acc[yearMonth].push(record);
    return acc;
  }, {} as Record<string, Sales[]>);
};

const countPersonByMonth = (groupedRecords: Record<string, Sales[]>) => {
  return Object.entries(groupedRecords).reduce((acc, [month, records]) => {
    acc[month] = records.reduce((countAcc, { person }) => {
      countAcc[person] = (countAcc[person] || 0) + 1;
      return countAcc;
    }, {} as Record<string, number>);
    return acc;
  }, {} as Record<string, Record<string, number>>);
};

const MemberData = async ({ current, org }: Props) => {
  const supabase = createClient();

  const { data: sales, error } = await supabase
    .from("sales")
    .select("created_at,person")
    .eq("email", org)
    .eq("status", "アポ取得");

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

  const groupedByMonth = groupByMonth(Sales);

  const personCountByMonth = countPersonByMonth(groupedByMonth);

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  const preMonth = now.getMonth();

  const thisYearMonth = `${thisYear}-${thisMonth}`;
  const preYearMonth = `${thisYear}-${preMonth}`;

  const thisMonthData = personCountByMonth[thisYearMonth];

  const preMonthData = personCountByMonth[preYearMonth];

  const preMembersData = Object.entries(preMonthData || {}).map(
    ([person, count]) => ({
      person,
      count,
    })
  );

  const thisMembersData = Object.entries(thisMonthData || {}).map(
    ([person, count]) => ({
      person,
      count,
    })
  );

  const preData = member?.map((user) => {
    const memberEntry = preMembersData.find(
      (entry) => entry.person === user.person
    );
    return {
      ...user,
      count: memberEntry ? memberEntry.count : 0,
    };
  });

  const thisData = member?.map((user) => {
    const memberEntry = thisMembersData.find(
      (entry) => entry.person === user.person
    );
    return {
      ...user,
      count: memberEntry ? memberEntry.count : 0,
    };
  });

  return (
    <Card className="w-[280px]">
      <CardHeader>
        <CardTitle>
          <span>{current ? `${thisYearMonth}` : `${preYearMonth}`}</span>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {(current ? thisData : preData)?.map((dataItem) => (
            <div
              key={dataItem.id}
              className="flex items-center justify-center mb-3"
            >
              <CircleUser className="flex-shrink-0" />
              <div className="flex flex-grow ">
                <div className="pl-2">{dataItem.person}</div>
              </div>
              <div className="flex flex-grow">
                <div className="">{dataItem.count}件</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberData;
