import React from "react";
import Image from "next/image";
import Logo from "@/app/logo.png";

const TopPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <Image src={Logo} alt="" width={300} height={300} className="ml-14" />
        <div className="mt-5">
          <p className="font-serif">
            営業組織における<br></br>
            データ、リスト、各メンバーのリストを閲覧・管理できます。
          </p>
        </div>
        <div className="mt-3">
          <p></p>
        </div>
        <div className="mt-3">
          <p className="font-bold">@2024 Sales Growth</p>
        </div>
      </div>
    </div>
  );
};

export default TopPage;
