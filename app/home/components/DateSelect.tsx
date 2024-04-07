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

const DateSelect = ({ data }: any) => {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [countByMonth, setCountByMonth] = useState<Record<number, number>>({});
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    if (selectedMonth === null) return;

    const result: FilteredData = {};

    console.log(data);

    data.forEach((item: DataItem) => {
      const dataYear = new Date(item.created_at).getFullYear();
      const month = new Date(item.created_at).getMonth() + 1;
      if (month === selectedMonth && dataYear === year) {
        const person = item.person;
        if (!person) return; // personがnullまたはundefinedの場合はスキップ

        if (!result[person]) {
          result[person] = { アポ取得: 0, total: 0 };
        }

        result[person].total += 1;
        if (item.status === "アポ取得") {
          result[person].アポ取得 += 1;
        }
      }
    });

    setFilteredData(result);
  }, [selectedMonth, year]);

  console.log(filteredData);

  useEffect(() => {
    const monthCounts = Array.from({ length: 12 }, (_, i) => [i + 1, 0]).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
    const newCountByMonth: Record<number, number> = monthCounts;
    for (const item of data) {
      const itemYear = new Date(item.created_at).getFullYear();
      const itemStatus = item.status;
      if (itemYear === year && itemStatus === "アポ取得") {
        const month = new Date(item.created_at).getMonth() + 1;
        newCountByMonth[month] = (newCountByMonth[month] || 0) + 1;
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

  return (
    <div className="flex items-start ">
      <div className="my-4">
        <ButtonGroup
          orientation="vertical"
          aria-label="Vertical button group"
          variant="text"
        >
          {Array.from({ length: 3 }, (_, i) => currentYear - i).map(
            (yearOption) => (
              <Button
                key={yearOption}
                value={yearOption}
                onClick={() => handleYearChange(yearOption)}
              >
                {yearOption}
              </Button>
            )
          )}
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-center pl-10 ml-10">
        <div className="grid grid-cols-3 gap-4">
          {months.map((month, index) => (
            <Card
              key={index}
              className="cursor-pointer w-60"
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

        <Drawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <div
            className="p-4"
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <DrawerContent month={selectedMonth} data={filteredData} />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default DateSelect;
