import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Nav from "../../components/Nav";
import { DataCard } from "./components/DataCard";
import MemberData from "./components/MemberData";
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

const getMember = (records: Sales[]): string[] => {
  const memberSet = new Set(records.map((record) => record.person));
  return Array.from(memberSet);
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
    .from("sales")
    .select("created_at,person")
    .eq("email", user.email)
    .eq("status", "アポ取得");

  if (error) {
    console.log(error);
  }

  let { data: member } = await supabase
    .from("members")
    .select("id, person")
    .eq("org", user.email);

  if (error) {
    console.log(error);
  }

  const Sales = sales || [];

  const ThisMonthSales = getThisMonthRecords(Sales);
  const PreMonthSales = getPreMonthRecords(Sales);

  const data = Sales.length;
  const ThisMonthData = ThisMonthSales.length;
  const PreMonthData = PreMonthSales.length;

  const difference = ThisMonthData - PreMonthData;

  const groupedByMonth = groupByMonth(Sales);

  const personCountByMonth = countPersonByMonth(groupedByMonth);

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  const thisYearMonth = `${thisYear}-${thisMonth}`;
  const preMonth = now.getMonth();
  const preYearMonth = `${thisYear}-${preMonth}`;

  const thisMonthDate = personCountByMonth[thisYearMonth];

  const preMonthDate = personCountByMonth[preYearMonth];

  let description = "";
  if (difference > 0) {
    description = "対前月比: +" + difference;
  } else if (difference === 0) {
    description = "対前月比: ±" + difference;
  } else {
    description = "対前月比: " + difference;
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col min-h-screen">
        <p className="font-bold text-4xl py-4 pl-6 ">Dashboard</p>

        <div className="flex flex-1">
          <div className="w-1/2 flex justify-center items-center">
            <div className="mx-5 my-3">
              <Member org={user.email} />
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center justify-between mx-3 my-3 gap-4">
                <DataCard title="合計" description="累積合計" data={data} />
                <DataCard
                  title="今月の合計"
                  description={description}
                  data={ThisMonthData}
                />
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="flex items-center justify-center mx-3 my-3 gap-3">
                <MemberData
                  users={member}
                  members={preMonthDate}
                  title={preYearMonth}
                  boolean={false}
                />
                <MemberData
                  users={member}
                  members={thisMonthDate}
                  title={thisYearMonth}
                  boolean={true}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
