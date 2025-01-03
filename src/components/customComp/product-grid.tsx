import { ProductTS } from "@/types";
import React, { FC } from "react";
import ProductCard from "@/components/customComp/product-card";

type Props = {
  products: ProductTS;
};

const ProductGrid: FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
