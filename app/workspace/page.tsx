import React from "react";
import Header from "@/components/Header";

const page = () => {
  const section = [
    { title: "List", url: "list" },
    { title: "Data", url: "home" },
    { title: "Note", url: "workspace" },
  ];
  return (
    <div className="">
      <Header sections={section} title="workspace" />
    </div>
  );
};

export default page;
