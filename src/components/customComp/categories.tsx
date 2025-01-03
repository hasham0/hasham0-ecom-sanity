import { CategoryTS } from "@/types";
import React, { FC } from "react";
import CategorySelector from "@/components/customComp/category-selector";

type Props = { categories: CategoryTS };

const Categories: FC<Props> = ({ categories }) => {
  return (
    <div className="py-5">
      <CategorySelector categories={categories} />
    </div>
  );
};

export default Categories;
