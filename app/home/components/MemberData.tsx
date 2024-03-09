import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { CircleUser } from 'lucide-react';



interface Props{
    members: Record<string, Record<string, number>>;
}

const MemberData = ({members} : Props) => {
    const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1; // 月は0から始まるため+1
  const thisYearMonth = `${thisYear}-${thisMonth}`;

  // 今月のデータを取得
  const thisMonthData = members[thisYearMonth];

    //console.log(members);
  return (
    <Card >
    <CardHeader>
      <div className=''>
        <CardTitle>This Month</CardTitle>
      </div>
      <CardDescription className='text-gray-400 pl-3 pb-3'>
        {thisYearMonth}
      </CardDescription>
    </CardHeader>
      <CardContent className=''>
        {thisMonthData && Object.entries(thisMonthData).map(([person, count]) => (
          <div key={person} className='flex items-center justify-start mb-3 mx-5'>
            <CircleUser className='flex-shrink-0'/>
            <div className='flex justify-between flex-grow ml-4'>
                <div>
                    {person}
                </div>
                <div className=''>
                    {count}
                </div>
            </div>
          </div>
        ))}
      </CardContent>
  </Card>
  )
}

export default MemberData
