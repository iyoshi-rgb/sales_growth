"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  Typography,
  Drawer,
  Button,
  ButtonGroup,
} from "@mui/material";
import DrawerContent from "./DateSelect/DrawerContent";

interface DataItem {
  created_at: string;
  person: string | null;
  status: string | null;
}

interface FilteredData {
  [person: string]: {
    アポ取得: number;
    total: number;
  };
}

interface Props {
  data: DataItem[] | null;
}

const DateSelect = ({ data }: Props) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [year, setYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [countByMonth, setCountByMonth] = useState<Record<number, number>>({});
  const [filteredData, setFilteredData] = useState({});

  const uniqueYears = new Set<number>();

  data?.forEach((item) => {
    const year = new Date(item.created_at).getFullYear();
    uniqueYears.add(year);
  });

  const yearsArray: number[] = Array.from(uniqueYears);

  console.log(yearsArray);

  useEffect(() => {
    if (selectedMonth === null) return;

    const result: FilteredData = {};

    data?.forEach((item: DataItem) => {
      const dataYear = new Date(item.created_at).getFullYear();
      const month = new Date(item.created_at).getMonth() + 1;
      if (month === selectedMonth && dataYear === year) {
        const person = item.person;
        if (!person) return;

        if (!result[person]) {
          result[person] = { アポ取得: 0, total: 0 };
        }

        result[person].total += 1;
        if (item.status === "アポ取得") {
          result[person].アポ取得 += 1;
        }
      }
    });

    const sortedKeys = Object.keys(result).sort();
    const sortedData: FilteredData = {};

    sortedKeys.forEach((key) => {
      sortedData[key] = result[key];
    });

    setFilteredData(sortedData);
  }, [selectedMonth, year]);

  useEffect(() => {
    const monthCounts = Array.from({ length: 12 }, (_, i) => [i + 1, 0]).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
    const newCountByMonth: Record<number, number> = monthCounts;
    if (data) {
      for (const item of data) {
        const itemYear = new Date(item.created_at).getFullYear();
        const itemStatus = item.status;
        if (itemYear === year && itemStatus === "アポ取得") {
          const month = new Date(item.created_at).getMonth() + 1;
          newCountByMonth[month] = (newCountByMonth[month] || 0) + 1;
        }
      }
    }

    setCountByMonth(newCountByMonth);
  }, [data, year]);

  const handleYearChange = (value: any) => {
    setYear(value);
  };

  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
    setIsDrawerOpen(true);
  };

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const hasDataForMonth = (
    year: number,
    month: number
  ): boolean | undefined => {
    return data?.some((item) => {
      const date = new Date(item.created_at);
      return date.getFullYear() === year && date.getMonth() + 1 === month;
    });
  };

  return (
    <div className="flex flex-col items-center pl-10 ml-10">
      {/* ButtonGroup と年を表示する span を含む div */}
      <div className="flex justify-between w-full py-5 relative">
        <ButtonGroup aria-label="Basic button group" variant="text">
          {yearsArray.map((value) => (
            <Button
              key={value}
              value={value}
              onClick={() => handleYearChange(value)}
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
        <span className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">
          {year}年
        </span>
        {/* ダミー要素を削除 */}
      </div>

      {/* カードを表示するグリッド */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {months.map((month, index) => (
          <Card
            key={index}
            className={`cursor-pointer w-60 ${
              year === currentYear && month === currentMonth
                ? "border-2 border-blue-500"
                : ""
            } ${
              hasDataForMonth(year, month)
                ? "text-blue-500"
                : "cursor-not-allowed"
            }`}
            onClick={() => handleMonthClick(month)}
          >
            <CardActionArea>
              <Typography className="p-2 font-bold">{month}月</Typography>
              <Typography className="text-3xl text-center pb-3">
                {countByMonth[month]}件
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </div>

      <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          className="p-4"
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <DrawerContent
            year={year}
            month={selectedMonth}
            data={filteredData}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default DateSelect;
