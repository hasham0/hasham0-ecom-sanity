import CartSection from "@/components/customComp/cart-section";
import { Metadata } from "next";
import React from "react";

type Props = {};
export const metadata: Metadata = {
  title: {
    default: "Cart",
    template: "%s | Ecommerce Website",
  },
};
export default function CartPage({}: Props) {
  return <CartSection />;
}
