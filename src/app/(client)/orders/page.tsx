import Container from "@/components/customComp/container";
import OrdersDisplay from "@/components/customComp/orders-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyOrders } from "@/sanity/helpers";
import { auth } from "@clerk/nextjs/server";
import { FileXIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: {
    default: "Order",
    template: "%s | Ecommerce Website",
  },
};

export default async function OrdersPage({}: Props) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);

  return (
    <div>
      <Container className="py-10">
        {orders?.length ? (
          <Card className="w-full">
            <CardHeader>Order List</CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] md:w-auto">
                        Order Number
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Email
                      </TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <OrdersDisplay orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6">
            <FileXIcon className="mb-4 size-24 text-gray-400" />
            <h3 className="text-2xl font-semibold text-gray-900">
              No orders found
            </h3>
            <p className="mt-2 max-w-md text-center text-sm text-gray-600">
              It looks like your haven&apos;t places any orders yet. Start
              Shopping to see your orders here
            </p>
            <Button className="mt-6">
              <Link href={"/"}>Browse Products</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
