"use client";

import React, { createContext, ReactNode, useRef } from "react";
import { createCartStore } from "@/zustand/store";

export type CartStoreApi = ReturnType<typeof createCartStore>;
export const CartStoreContext = createContext<CartStoreApi | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export default function ZustandProvider({ children }: Props) {
  const storeRef = useRef<CartStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
}
