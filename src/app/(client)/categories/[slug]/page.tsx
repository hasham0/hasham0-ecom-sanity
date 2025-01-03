import Container from "@/components/customComp/container";
import ProductList from "@/components/customComp/product-list";
import {
  getSanityCategories,
  getSanityProductsByCateory,
} from "@/sanity/helpers";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const capitilizeTitle = slug.slice(0, 1).toUpperCase() + slug.slice(1);
  return {
    title: capitilizeTitle,
  };
}

export default async function CategoriesPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getSanityCategories();
  const fetchCategoryProducts = await getSanityProductsByCateory(slug);
  return (
    <div className="bg-gray-100">
      <Container className="mt-3 flex w-full flex-col items-center rounded-lg bg-white p-8 shadow-md">
        <h1 className="my-3 text-2xl font-bold capitalize md:text-3xl">
          Search result for <span className="text-darkBlue">{slug}</span>
        </h1>
        <ProductList products={fetchCategoryProducts} categories={categories} />
      </Container>
    </div>
  );
}
