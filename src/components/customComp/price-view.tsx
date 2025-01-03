import React, { FC } from "react";
import PriceFormatter from "@/components/customComp/price-formatter";
import { cn } from "@/lib/utils";

type Props = {
  price: number | undefined;
  discount: number | undefined;
  label?: string | undefined;
  className?: string;
};

const PriceView: FC<Props> = ({ price, discount, label, className }) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <PriceFormatter amount={price} className={className} />
        {price && discount && (
          <PriceFormatter
            amount={Number(price) + (Number(discount) * Number(price)) / 100}
            className={cn("text-xs font-medium line-through", className)}
          />
        )}
      </div>
      <p className="text-gray-500">{label}</p>
    </div>
  );
};

export default PriceView;
