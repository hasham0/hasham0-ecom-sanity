import AddToCartButton from "@/components/customComp/add-to-cart";
import Container from "@/components/customComp/container";
import PriceView from "@/components/customComp/price-view";
import { getSanitySingleProductBySlug } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import { SingleProductTS } from "@/types";
import Image from "next/image";
import React from "react";
import { LuStar } from "react-icons/lu";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const capitilizeTitle = slug
    .split("-")
    .map((letter) => letter.slice(0, 1).toUpperCase() + letter.slice(1))
    .join(" ");

  return {
    title: capitilizeTitle,
  };
}

export default async function SingleProductPage({ params }: Props) {
  const { slug } = await params;
  const fetchProduct: SingleProductTS =
    await getSanitySingleProductBySlug(slug);
  return (
    <Container className="flex flex-col gap-10 py-10 lg:flex-row">
      {/* <!-- product image --> */}
      {fetchProduct?.image && (
        <div className="group h-fit w-full overflow-hidden rounded-md border border-darkBlue/20 shadow-md lg:w-1/2">
          <Image
            src={urlFor(fetchProduct.image).url()}
            alt={fetchProduct?.name as string}
            width={700}
            height={700}
            className="hoverEffect max-h-[500px] w-full rounded-md object-contain group-hover:scale-110"
          />
        </div>
      )}

      <div className="flex w-full flex-col gap-5 lg:w-1/2">
        {/* <!-- product label star and reviews --> */}
        <div>
          <p className="text-4xl font-bold">{fetchProduct?.name}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              {Array.from({ length: 5 }).map((_, index) => {
                const isLastStar = index === 4;
                return (
                  <LuStar
                    key={index}
                    fill={!isLastStar ? "#fca99b" : "transparent"}
                    className={`${isLastStar ? "text-gray-500" : "text-lightOrange"}`}
                  />
                );
              })}
            </div>
            <p className="text-sm font-medium text-gray-500">{`25 reviews`}</p>
          </div>
        </div>

        {/* <!-- product price and volume --> */}
        <PriceView
          price={fetchProduct?.price}
          discount={fetchProduct?.discount}
          label={fetchProduct?.label}
          className="text-lg font-bold"
        />

        {/* <!-- product stocks --> */}
        {fetchProduct?.stock && (
          <p className="w-24 rounded-lg bg-green-100 py-2.5 text-center text-sm font-semibold text-green-600">
            In Stock
          </p>
        )}

        {/* <!-- product live  viewing --> */}
        <p className="text-base text-gray-800">
          <span className="mr-2 rounded-md bg-black px-3 py-1 text-sm font-semibold text-white">
            20
          </span>{" "}
          <span>People are viewing rightnow</span>
        </p>

        {/* <!-- product description --> */}
        <p className="text-sm tracking-wide text-gray-600">
          {fetchProduct?.description}
        </p>

        {/* <!-- add to cart button  --> */}
        {fetchProduct && <AddToCartButton product={fetchProduct} />}
        <div className="-mt-2 flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5">
          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <RxBorderSplit className="textlg" />
            <p>Compare color</p>
          </div>{" "}
          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <FaRegQuestionCircle className="textlg" />
            <p>Ask a question</p>
          </div>{" "}
          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <TbTruckDelivery className="textlg" />
            <p>Delivery and return</p>
          </div>{" "}
          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <FiShare2 className="textlg" />
            <p>Share</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-4">
          <div className="hoverEffect rounded-md border border-darkBlue/20 p-5 text-center hover:border-darkBlue">
            <p className="text-base font-semibold text-black">Free Shipping</p>
            <p className="text-sm font-semibold text-gray-500">
              Free Shipping over order $120
            </p>
          </div>
          <div className="hoverEffect rounded-md border border-darkBlue/20 p-5 text-center hover:border-darkBlue">
            <p className="text-base font-semibold text-black">
              Flexible Payment
            </p>
            <p className="text-sm font-semibold text-gray-500">
              Pay with Multiple Credit Cards
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
