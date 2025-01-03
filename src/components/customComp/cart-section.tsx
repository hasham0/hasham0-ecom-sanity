"use client";

import React, { FC, useEffect, useState } from "react";
import Loader from "@/components/customComp/loader";
import Container from "@/components/customComp/container";
import { useAuth, useUser } from "@clerk/nextjs";
import NoAccessToCart from "@/components/customComp/no-access-to-cart";
import { useCartStore } from "@/zustand/hook/useCartStore";
import { ShoppingBag, Trash2 } from "lucide-react";
import PriceFormatter from "@/components/customComp/price-formatter";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import QuantityButtons from "@/components/customComp/quantity-buttons";
import EmptyCart from "@/components/customComp/empty-cart";
import { MetadataTS } from "@/types";
import createCheckoutSessionAction from "@/actions/create-checkout-session";

type Props = {};

const CartSection: FC<Props> = ({}) => {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const {
    deleteCartProduct,
    getTotalPrice,
    getSubTotalPrice,
    resetCart,
    getItemCount,
    getGroupedItems,
  } = useCartStore((state) => state);

  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) {
    return <Loader />;
  }

  // checkout handle
  const handleCheckOut = async (): Promise<void> => {
    setLoading(true);
    try {
      const metadata: MetadataTS = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
        clerkUserId: user?.id!,
      };
      const checkoutUrl = await createCheckoutSessionAction(
        getGroupedItems(),
        metadata,
      );
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("🚀 ~ handleCheckOut ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  // reset cart handle
  const handleResetCart = () => {
    const confirm = window.confirm("Are you sure to reset your Cart?");
    if (confirm) {
      resetCart();
    }
  };

  return (
    <div className="bg-gray-50 pb-10">
      {isSignedIn ? (
        <Container>
          {getGroupedItems().length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="size-6 text-primary" />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid md:gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="hidden w-full rounded-lg border bg-white p-6 md:inline-block">
                    <h2 className="mb-4 text-xl font-semibold">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span>Total Amount</span>
                        <PriceFormatter
                          className="text-black"
                          amount={getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex flex-col items-center justify-center gap-2 py-1">
                        <Button
                          onClick={handleCheckOut}
                          disabled={loading}
                          className="w-full"
                        >
                          {loading ? "Processing" : "Proceed to Checkout"}
                        </Button>
                        <Link
                          href={"/"}
                          className="hoverEffect text-sm duration-150 hover:text-darkBlue hover:underline"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-5 rounded-tl-lg rounded-tr-lg border bg-white p-2.5 text-sm font-semibold md:grid-cols-6 md:text-base">
                    <h2 className="col-span-2 ml-10 md:col-span-3">Product</h2>
                    <h2>Price</h2>
                    <h2>Quantity</h2>
                    <h2>Total</h2>
                  </div>
                  <div className="rounded-bl-lg rounded-br-lg border border-t-0 bg-white p-2">
                    {getGroupedItems().map(({ product }) => {
                      const itemCount = getItemCount(product._id);
                      return (
                        <div
                          key={product._id}
                          className="grid grid-cols-5 border-b p-2.5 last:border-b-0 md:grid-cols-6"
                        >
                          <div className="col-span-2 flex items-center gap-x-1 md:col-span-3">
                            <Trash2
                              onClick={() => deleteCartProduct(product._id)}
                              className="hoverEffect mr-1 size-4 text-gray-500 hover:text-red-600 md:size-5"
                            />
                            {product.image && (
                              <Link
                                href={`/product/${product.slug?.current}`}
                                className="group mr-2 overflow-hidden rounded-md border p-0.5 md:p-1"
                              >
                                <Image
                                  src={urlFor(product.image).url()}
                                  alt={product?.name || "product image"}
                                  width={300}
                                  height={300}
                                  className="hoverEffect size-10 overflow-hidden object-cover group-hover:scale-105 md:h-14 md:w-full"
                                />
                              </Link>
                            )}
                            <h2 className="text-sm">{product.name}</h2>
                          </div>
                          <div className="flex items-center">
                            <PriceFormatter amount={product.price} />
                          </div>
                          <QuantityButtons
                            product={product}
                            className="gap-3 text-sm md:gap-5"
                          />
                          <div className="flex items-center">
                            <PriceFormatter
                              amount={
                                product.price ? product.price * itemCount : 0
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex justify-end p-2">
                      <Button
                        onClick={handleResetCart}
                        variant={"destructive"}
                        className="m-2 font-semibold"
                      >
                        Reset Cart
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="fixed bottom-0 left-0 w-full bg-lightBg md:hidden">
                  <div className="w-full rounded-lg border bg-white p-6 md:inline-block">
                    <h2 className="mb-4 text-xl font-semibold">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span>Total Amount</span>
                        <PriceFormatter
                          className="text-black"
                          amount={getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex flex-col items-center justify-center gap-2 py-1">
                        <Button
                          disabled={loading}
                          onClick={handleCheckOut}
                          className="w-full"
                        >
                          {loading ? "Processing" : "Proceed to Checkout"}
                        </Button>
                        <Link
                          href={"/"}
                          className="hoverEffect text-sm duration-150 hover:text-darkBlue hover:underline"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartSection;
