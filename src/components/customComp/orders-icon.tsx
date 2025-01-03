"use client";

import Link from "next/link";
import React, { FC } from "react";
import { ShoppingBasket } from "lucide-react";

type Props = {
  ordersLength: number | undefined;
};

const OrdersIcon: FC<Props> = ({ ordersLength }) => {
  return (
    <Link
      href={"/orders"}
      className="hoverEffect flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none"
    >
      <ShoppingBasket className="size-6 text-darkBlue" />
      <div className="hidden flex-col md:flex">
        <p className="flex gap-x-2 text-xs">
          <span className="font-semibold">{ordersLength || 0}</span>
          <span>items</span>
        </p>
        <p className="font-semibold">Order</p>
      </div>
    </Link>
  );
};

export default OrdersIcon;
