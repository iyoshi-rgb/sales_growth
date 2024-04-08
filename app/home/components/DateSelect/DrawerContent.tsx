import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const DrawerContent = ({ year, month, data }: any) => {
  const people = Object.keys(data);
  const appointment = people.map((person) => data[person]["アポ取得"]);
  const notAppointment = people.map(
    (person) => data[person]["total"] - data[person]["アポ取得"]
  );
  const totalData = people.map((person) => data[person]["total"]);

  const pieData = Object.keys(data).map((person, index) => ({
    id: index,
    value: data[person]["アポ取得"],
    label: person,
  }));

  const hasAppointments = pieData.some((item) => item.value > 0);

  const isDataEmpty = !people.length;

  return (
    <>
      <span className="text-2xl">
        {year} {month}月
      </span>

      <div className="flex flex-row items-center justify-center space-x-4 w-full">
        {isDataEmpty ? (
          <div className="text-center text-5xl font-bold w-full py-10 my-10">
            No Data
          </div>
        ) : (
          <>
            {hasAppointments && (
              <PieChart
                series={[
                  {
                    data: pieData,
                  },
                ]}
                width={400}
                height={200}
              />
            )}

            <BarChart
              xAxis={[{ scaleType: "band", data: people }]}
              series={[
                { data: appointment, label: "アポ取得" },
                { data: notAppointment, label: "不在/未荷電/NG" },
                { data: totalData, label: "荷電数" },
              ]}
              width={500}
              height={300}
            />
          </>
        )}
      </div>
    </>
  );
};

export default DrawerContent;
