import { CartTS } from "@/types";
import { useContext } from "react";
import { CartStoreContext } from "@/zustand/providers/provider";
import { useStore } from "zustand";

export const useCartStore = <T>(selector: (store: CartTS) => T): T => {
  const store = useContext(CartStoreContext);

  if (!store) {
    throw new Error(`useCartStore must be used within ZustandProvider`);
  }

  return useStore(store, selector);
};
