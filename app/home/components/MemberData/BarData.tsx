"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";

interface Sales {
  id: number;
  person: string;
  count: number;
}

interface Props {
  time: string;
  data?: Sales[];
}

const BarData = ({ time, data }: Props) => {
  return (
    <>
      <>{time}</>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: data?.map((item) => item.person),
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: data?.map((item) => item.count),
          },
        ]}
        width={500}
        height={300}
      />
    </>
  );
};

export default BarData;
