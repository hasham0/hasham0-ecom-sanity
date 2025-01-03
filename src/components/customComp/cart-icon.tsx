"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { useCartStore } from "@/zustand/hook/useCartStore";

type Props = {};

const CartIcon: FC<Props> = ({}) => {
  const groupItems = useCartStore((state) => state.getGroupedItems());

  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <Link
      href={"/cart"}
      className="hoverEffect flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none"
    >
      <ShoppingBagIcon className="size-6 text-darkBlue" />
      <div className="hidden flex-col md:flex">
        <p className="flex gap-x-2 text-xs">
          <span className="font-semibold">{groupItems.length}</span>{" "}
          <span>items</span>
        </p>
        <p className="font-semibold">Cart</p>
      </div>
    </Link>
  );
};

export default CartIcon;
