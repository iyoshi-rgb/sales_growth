import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Nav from "../../components/Nav";
import { DataCard } from "./components/DataCard";
import MemberData from "./components/MemberData";
import HotList from "./components/HotList";
import Member from "./components/Member";
import Footer from "@/components/Footer";

interface Sales {
  created_at: string;
  person: string;
}

const groupByMonth = (records: Sales[]) => {
  return records.reduce((acc, record) => {
    const date = new Date(record.created_at);
    const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`; // 月は0から始まるため+1する

    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }
    acc[yearMonth].push(record);
    return acc;
  }, {} as Record<string, Sales[]>);
};

// 月ごとに分類したデータで、personの出現回数を数える関数
const countPersonByMonth = (groupedRecords: Record<string, Sales[]>) => {
  return Object.entries(groupedRecords).reduce((acc, [month, records]) => {
    acc[month] = records.reduce((countAcc, { person }) => {
      countAcc[person] = (countAcc[person] || 0) + 1;
      return countAcc;
    }, {} as Record<string, number>);
    return acc;
  }, {} as Record<string, Record<string, number>>);
};


const getThisMonthRecords = (records: Sales[]): Sales[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  return records.filter(record => {
    const recordDate = new Date(record.created_at);
    return recordDate.getFullYear() === currentYear && recordDate.getMonth() === currentMonth;
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

  return records.filter(record => {
    const recordDate = new Date(record.created_at);
    return recordDate.getFullYear() === currentYear && recordDate.getMonth() === preMonth;
  });
};

const getMember = (records: Sales[]): string[] => {
  const memberSet = new Set(records.map(record => record.person))
  return Array.from(memberSet)
};

export default async function Home() {

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }


  let { data: sales, error } = await supabase
    .from('sales')
    .select('created_at,person').eq('email', user.email);


  if (error) {
    console.log(error);
  }

  let { data: member } = await supabase.from('members').select('id, name').eq('org', user.email);

  if (error) {
    console.log(error)
  }

  const Sales = sales || [];

  const ThisMonthSales = getThisMonthRecords(Sales);
  const PreMonthSales = getPreMonthRecords(Sales);

  const data = Sales.length;
  const ThisMonthData = ThisMonthSales.length;
  const PreMonthData = PreMonthSales.length;

  const difference = ThisMonthData - PreMonthData

  const groupedByMonth = groupByMonth(Sales);
  const personCountByMonth = countPersonByMonth(groupedByMonth);



  let description = '';
  if (difference > 0) {
    description = '対前月比: +' + difference;
  } else if (difference === 0) {
    description = '対前月比: ±' + difference;
  } else {
    description = '対前月比: ' + difference;
  }

  const members = getMember(Sales);



  return (
    <>
      <Nav />
      <p className="font-bold text-4xl py-4 px-4">Dashboard</p>
      <div className="flex items-center">
        <div className="w-1/2 gap-4 flex items-center mx-3 my-3">
          <DataCard title='Total Appoint' description="Our Team Total" data={data} />
          <DataCard title='This Month' description={description} data={ThisMonthData} />
        </div>
        <div className="w-1/3 mx-5 my-3">
          <Member members={member} org={user.email}/>
        </div>
      </div>
      <div className="flex mt-8">
        <div className="w-3/5 mx-2">
          <HotList/>
        </div>
        <div className="w-2/5 mx-4">
          <MemberData members={personCountByMonth} />
        </div>
      </div>
      <Footer />

    </>


  );

}