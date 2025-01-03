import { ShoppingCart } from "lucide-react";
import React, { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import emptyCart from "/public/assets/emptyCart.png";
import Link from "next/link";
type Props = {};

const EmptyCart: FC<Props> = ({}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 py-20">
      <motion.div
        className="inline-block"
        animate={{ scale: [1, 1.5, 1, 1.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ShoppingCart size={64} className="mx-auto text-gray-400" />
      </motion.div>
      <Image
        src={emptyCart}
        alt="shopping cart"
        width={200}
        height={200}
        className="mx-auto rounded-lg shadow-md"
      />
      <h2 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h2>
      <p className="mx-auto max-w-md text-gray-600">
        Looks like you {"haven't"} added anything to your cart yet. Explore our
        products and find something you love!
      </p>
      <Link
        href={"/"}
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white ring transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
