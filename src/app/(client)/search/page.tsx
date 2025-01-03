import Container from "@/components/customComp/container";
import ProductGrid from "@/components/customComp/product-grid";
import { getSanityProductBySearch } from "@/sanity/helpers";
import { Metadata } from "next";
import React from "react";

type Props = {
  searchParams: Promise<{ query: string }>;
};
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { query } = await searchParams;
  let capitilizeTitle: string = query
    .split(" ")
    .map((letter) => letter.slice(0, 1).toUpperCase() + letter.slice(1))
    .join(" ");
  return {
    title: capitilizeTitle,
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { query } = await searchParams;
  const searchProducts = await getSanityProductBySearch(query);
  if (!searchProducts?.length) {
    return (
      <Container className="flex min-h-screen flex-col items-center bg-gray-100 pt-48">
        <div className="w-full space-y-2 rounded-lg bg-white p-8 text-center shadow-md md:max-w-4xl">
          <h2 className="mb-3 text-4xl font-semibold">
            No Product found of <span className="text-darkBlue">{query}</span>
          </h2>
          <p className="text-gray-500">Try seraching with different name</p>
        </div>
      </Container>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100">
      <Container className="mt-3 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-5 text-2xl font-semibold">
          Search result for <span className="text-darkBlue">{query}</span>
        </h2>
        <ProductGrid products={searchProducts} />
      </Container>
    </div>
  );
}
