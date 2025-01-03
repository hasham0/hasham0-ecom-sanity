import { Order, Product } from "@/sanity/sanity.types";
import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ProductTS } from "@/types";
import Link from "next/link";
import PriceFormatter from "./price-formatter";

type Props = {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
};

const OrderDetailDialog: FC<Props> = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
          </DialogHeader>
          <div className="">
            <p>
              <strong>Customer&nbsp;:</strong>&nbsp;{order.customerName}
            </p>
            <p>
              <strong>Email&nbsp;:</strong>&nbsp;{order.email}
            </p>
            <p>
              <strong>Date&nbsp;:</strong>&nbsp;
              {order.orderDate &&
                new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Status&nbsp;:</strong>&nbsp;
              {order.status && (
                <span
                  className={`rounded-lg px-2 py-1 text-xs font-semibold capitalize ${order.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {order.status}
                </span>
              )}
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.products?.map((product, index) => {
                const prod = product.product as unknown as Product;
                return (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2">
                      {prod.image && (
                        <Link href={`/product/${prod.slug?.current}`}>
                          <Image
                            src={urlFor(prod.image).url()}
                            alt={""}
                            width={50}
                            height={50}
                            className="rounded-sm border hover:scale-105"
                          />
                        </Link>
                      )}
                      {prod.name}
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <PriceFormatter
                        amount={prod.price}
                        className="font-medium text-black"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex justify-end gap-1">
            <strong>Total&nbsp;:</strong>
            <PriceFormatter
              amount={order.totalPrice}
              className="font-bold text-black"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderDetailDialog;
