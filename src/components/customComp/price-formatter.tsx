import { cn } from "@/lib/utils";
import React, { FC } from "react";

type Props = { amount: number | undefined; className?: string };

const PriceFormatter: FC<Props> = ({ amount, className }) => {
  const formattedPrice = new Number(amount).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });
  return (
    <div className={cn("text-sm font-semibold text-darkText", className)}>
      {formattedPrice}
    </div>
  );
};

export default PriceFormatter;
