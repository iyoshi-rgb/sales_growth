"use client";
import { Button } from "@/components/ui/button";
import { BarChart } from "@mui/x-charts/BarChart";
import React, { useState } from "react";

interface Sales {
  id: number;
  person: string;
  count: number;
}

interface DemoProps {
  data?: Sales[]; // データがundefinedである可能性があることを示す
}

const Demo = ({ data }: DemoProps) => {
  const [count, setCount] = useState(1);

  console.log(data);

  return (
    <>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: data?.map((item) => item.person), // 先月のデータの人物名をラベルに設定
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: data?.map((item) => item.count), // 先月のデータのカウントをバーの高さに設定
          },
        ]}
        width={500}
        height={300}
      />
    </>
  );
};

export default Demo;
