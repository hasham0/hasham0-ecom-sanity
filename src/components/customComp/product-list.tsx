import React, { FC } from "react";
import { CategoryTS, ProductTS } from "@/types";
import Categories from "@/components/customComp/categories";
import ProductGrid from "@/components/customComp/product-grid";

type Props = { products: ProductTS; title?: boolean; categories: CategoryTS };

const ProductList: FC<Props> = ({ products, title = false, categories }) => {
  return (
    <div>
      {/* <!-- categories --> */}
      <Categories categories={categories} />
      {/* <!-- products --> */}
      {title && (
        <div className="pb-5">
          <h2 className="text-2xl font-semibold text-gray-600">
            Day of the <span className="text-lightBlue">Deal</span>{" "}
          </h2>
          <p className="text-sm font-thin text-gray-500">
            {"Don't"} wait. The time will never be just right.
          </p>
        </div>
      )}
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductList;
