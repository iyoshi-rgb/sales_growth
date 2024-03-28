import React from "react";
import AuthButton from "./AuthButton";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-4xl py-4 pl-6">{title}</p>
        <div className="mr-5">
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
