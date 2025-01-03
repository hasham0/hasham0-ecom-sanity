import Link from "next/link";
import React, { FC } from "react";
import { LayoutDashboard } from "lucide-react";

type Props = {};

const SanityStudio: FC<Props> = ({}) => {
  return (
    <Link
      href={"/studio"}
      target="_blank"
      className="hoverEffect flex items-center rounded-md border border-gray-200 p-3 py-1 text-sm shadow-md hover:shadow-none"
    >
      <LayoutDashboard className="size-6 text-darkBlue" />
      <div className="hidden flex-col p-2 md:flex">
        <p className="font-semibold">Studio</p>
      </div>
    </Link>
  );
};

export default SanityStudio;
