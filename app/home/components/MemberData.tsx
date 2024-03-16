"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CircleUser } from "lucide-react";

interface Member {
  id: number;
  person: string;
}

interface Props {
  members: Record<string, number>;
  title: string;
  users: Member[] | null;
  boolean: boolean;
}

const MemberData = ({ users, members, title, boolean }: Props) => {
  const membersData = Object.entries(members || {}).map(([person, count]) => ({
    person,
    count,
  }));

  const data = users?.map((user) => {
    const memberEntry = membersData.find(
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
          <span>{title}</span>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {data?.map((dataItem) => (
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
