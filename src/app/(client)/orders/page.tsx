import Container from "@/components/customComp/container";
import { Button } from "@/components/ui/button";
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
      <Container>
        {!orders?.length ? (
          <div>orders</div>
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
