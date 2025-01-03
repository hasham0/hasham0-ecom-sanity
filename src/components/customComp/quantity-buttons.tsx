import { Product } from "@/sanity/sanity.types";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { useCartStore } from "@/zustand/hook/useCartStore";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  className?: string;
};

const QuantityButtons: FC<Props> = ({ product, className }) => {
  const { getItemCount, removeItem, addItem } = useCartStore((state) => state);
  const itmeCount = getItemCount(product._id);

  const handleQuantity = (type: "DEC" | "INC") => {
    switch (type) {
      case "INC":
        addItem(product);
        break;
      default:
        removeItem(product._id);
        break;
    }
  };

  return (
    <div className={cn("flex items-center gap-2 pb-1 text-base", className)}>
      <Button
        onClick={() => handleQuantity("DEC")}
        variant={"outline"}
        size={"icon"}
        className="size-6"
        disabled={product.stock === 0}
      >
        <HiMinus />
      </Button>
      <span className="w- text-center font-semibold text-darkBlue">
        {itmeCount}
      </span>
      <Button
        onClick={() => handleQuantity("INC")}
        variant={"outline"}
        size={"icon"}
        className="size-6"
      >
        <HiPlus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
