"use client";
import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Button,
  Card,
  CardActionArea,
  Typography,
  Drawer,
} from "@mui/material";
import MemberData from "./DateSelect/MemberData";

const DateSelect = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleYearChange = (event: any) => {
    setYear(event.target.value);
  };

  const handleMonthClick = (month: string) => {
    setSelectedMonth(month);
    setIsDrawerOpen(true); // Drawerを開く
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="my-4">
        <Select
          value={year}
          onChange={handleYearChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
            (yearOption) => (
              <MenuItem key={yearOption} value={yearOption}>
                {yearOption}
              </MenuItem>
            )
          )}
        </Select>
      </div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-4">
          {months.map((month, index) => (
            <Card
              key={index}
              className="cursor-pointer"
              onClick={() => handleMonthClick(month)}
            >
              <CardActionArea>
                <Typography className="p-2 text-center">{month}</Typography>
                <MemberData />
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
            <Typography variant="h6">{`Selected: ${year} ${selectedMonth}`}</Typography>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default DateSelect;
