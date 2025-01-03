import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity/sanity.types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import ProductCartBar from "@/components/customComp/product-cart-bar";
import { LuStar } from "react-icons/lu";
import PriceView from "@/components/customComp/price-view";
import AddToCartButton from "@/components/customComp/add-to-cart";

type Props = {
  product: Product;
};

const ProductCard: FC<Props> = ({ product }) => {
  const isStock = product.stock !== 0;

  return (
    <div className="text-sm: group overflow-hidden rounded-lg border border-gray-300">
      {/* <!-- product image --> */}
      <div className="relative overflow-hidden border-b border-b-gray-300">
        {product.image && (
          <Link href={`/product/${product.slug?.current}`}>
            <Image
              src={urlFor(product.image).url()}
              alt={product.name || ""}
              loading="lazy"
              height={500}
              width={500}
              style={{
                width: "auto",
                height: "auto",
              }}
              className={`max-h-96 ${product?.stock !== 0 && "group-hover:scale-105"} w-full overflow-hidden object-cover transition-transform duration-500`}
            />
          </Link>
        )}

        {/* <!-- stock --> */}
        {product.stock === 0 && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <p className="w-full bg-black/60 text-center text-lg font-bold text-white">
              out of stocks
            </p>
          </div>
        )}
        {/* <!-- status --> */}
        {product.status && isStock && (
          <div className="absolute left-1 top-1 z-10 flex flex-col items-center space-y-1 transition-opacity duration-300 group-hover:opacity-0">
            {product.status.split("").map((char, index) => (
              <span className="font-semibold uppercase" key={index}>
                {char}
              </span>
            ))}
          </div>
        )}
        {/* stock options */}
        {isStock && (
          <div className="hoverEffect absolute bottom-0 left-0 w-full translate-y-12 group-hover:-translate-y-4">
            <ProductCartBar />
          </div>
        )}
      </div>
      {/* <!-- description --> */}
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-500">Snacks</p>
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
        </div>
        <p className="line-clamp-1 text-base font-semibold capitalize tracking-wide text-gray-600">
          {product.name}
        </p>
        <PriceView
          price={product?.price}
          discount={product.discount}
          label={product.label}
        />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
