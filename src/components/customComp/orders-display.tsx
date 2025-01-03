"use client";
import { OrderTS } from "@/types";
import React, { FC, useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PriceFormatter from "@/components/customComp/price-formatter";
import { Order } from "@/sanity/sanity.types";
import OrderDetailDialog from "@/components/customComp/order-detail-dialog";

type Props = { orders: OrderTS };

const OrdersDisplay: FC<Props> = ({ orders }) => {
  // console.log("🚀 ~ orders:", orders);
  const [selectedOrder, setSelectedorder] = useState<Order | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  const hanldeOrderClick = (order: Order) => {
    setSelectedorder(order);
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders?.map((order) => (
            <Tooltip key={order._id}>
              <TooltipTrigger asChild>
                <TableRow
                  onClick={() => hanldeOrderClick(order)}
                  className="h-12 cursor-pointer hover:bg-gray-100"
                >
                  <TableCell className="font-medium">
                    {order.orderNumber?.slice(-10) ?? "N/A"}...
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.orderDate &&
                      new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormatter amount={order.totalPrice} />
                  </TableCell>
                  <TableCell>
                    {order.status && (
                      <span
                        className={`rounded-lg px-2 py-1 text-xs font-semibold capitalize ${order.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {order.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedorder(null)}
      />
    </>
  );
};

export default OrdersDisplay;
