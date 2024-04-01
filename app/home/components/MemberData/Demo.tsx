import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { DataCard } from "../DataCard";
import MemberData from "../MemberData";

interface Props {
  at: string;
  org: string | undefined;
}

export default function Demo({ at, org }: Props) {
  const [state, setState] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center">
      <Button
        className="bg-cyan-700 hover:bg-cyan-900 text-white w-15"
        onClick={() => setState(!state)}
      >
        {at}
      </Button>
      {state && <MemberData org={org} />}
    </div>
  );
}
