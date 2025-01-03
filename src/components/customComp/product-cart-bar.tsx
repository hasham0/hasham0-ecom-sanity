import React, { FC } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { TbArrowsRightLeft } from "react-icons/tb";
import { RiShoppingBag4Fill } from "react-icons/ri";

type Props = {};

const ProductCartBar: FC<Props> = ({}) => {
  return (
    <div className="flex items-center justify-center gap-2.5 text-lg text-gray-500">
      <div className="hoveEffect rounded-xl border bg-white p-2 shadow-md hover:bg-darkBlue hover:text-white">
        <MdFavoriteBorder />
      </div>
      <div className="hoveEffect rounded-xl border bg-white p-2 shadow-md hover:bg-darkBlue hover:text-white">
        <FaRegEye />
      </div>
      <div className="hoveEffect rounded-xl border bg-white p-2 shadow-md hover:bg-darkBlue hover:text-white">
        <TbArrowsRightLeft />
      </div>
      <div className="hoveEffect rounded-xl border bg-white p-2 shadow-md hover:bg-darkBlue hover:text-white">
        <RiShoppingBag4Fill />
      </div>
    </div>
  );
};

export default ProductCartBar;
