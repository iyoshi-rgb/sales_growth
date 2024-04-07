import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

{
  /*const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 200,
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));*/
}

const DrawerContent = ({ month, data }: any) => {
  const dataArray = Object.entries(data).map(([person, values]: any) => ({
    person,
    アポ取得: values["アポ取得"],
  }));

  console.log(dataArray);

  const isDataEmpty = dataArray.length === 0 || Object.keys(data).length === 0;

  return (
    <>
      <span className="text-2xl">{month}月</span>

      <div className="flex flex-row items-center">
        {/*<DemoPaper variant="elevation">
          担当者: アポイントメント数 / 荷電数 , 取得率(%)
          {Object.entries(data).map(([person, counts]: any) => {
            const rate =
              counts.total > 0
                ? ((counts.アポ取得 / counts.total) * 100).toFixed(2)
                : 0;
            return (
              <div key={person}>
                {person}: {counts.アポ取得}/{counts.total}, {rate}%
              </div>
            );
          })}
        </DemoPaper>*/}
        {isDataEmpty ? (
          <div className="text-center text-2xl">No results</div>
        ) : (
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: dataArray.map((item) => item.person),
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: dataArray.map((item) => item.アポ取得),
              },
            ]}
            width={500}
            height={300}
          />
        )}
      </div>
    </>
  );
};

export default DrawerContent;
