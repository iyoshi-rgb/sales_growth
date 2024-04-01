"use client";
import { Button } from "@/components/ui/button";
import { BarChart } from "@mui/x-charts/BarChart";
import React, { useState } from "react";
import Demo from "./Demo";

interface Sales {
  id: number;
  person: string;
  count: number;
}

interface Props {
  at: string;
  org: string | undefined;
  data?: Sales[];
}

const BarData = ({ at, data, org }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{at}</span>
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
      </div>
    </>
  );
};

export default BarData;
