import { CartStateTS, CartTS } from "@/types";
import { persist, devtools } from "zustand/middleware";
import { createStore } from "zustand";
import toast from "react-hot-toast";

export const initalCartState: CartStateTS = {
  items: [],
};

const createCartStore = () => {
  return createStore<CartTS>()(
    devtools(
      persist(
        (set, get) => ({
          items: [],
          addItem(product) {
            return set((state) => {
              const isItemExist = state.items.find(
                (item) => item.product._id === product._id,
              );
              if (isItemExist) {
                return {
                  items: state.items.map((item) =>
                    item.product._id === product._id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item,
                  ),
                };
              } else {
                toast.success(
                  `${product.name?.substring(0, 12)}... added successfully`,
                );
                return {
                  items: [...state.items, { product, quantity: 1 }],
                };
              }
            });
          },
          removeItem(productID) {
            return set((state) => {
              const isItemExist = state.items.find(
                (item) => item.product._id === productID,
              );

              if (isItemExist) {
                if (isItemExist.quantity > 1) {
                  return {
                    items: state.items.map((item) =>
                      item.product._id === productID
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                    ),
                  };
                } else {
                  toast.success(
                    `${isItemExist.product.name?.slice(0, 12)}... Product removed`,
                  );
                  return {
                    items: state.items.filter(
                      (item) => item.product._id !== productID,
                    ),
                  };
                }
              }
              return {
                items: [...state.items],
              };
            });
          },
          deleteCartProduct(productID) {
            return set((state) => {
              const isItemExist = state.items.find(
                (item) => item.product._id === productID,
              );
              if (isItemExist) {
                toast.success(
                  `${isItemExist.product.name} delete successfully`,
                );
              }
              return {
                items: state.items.filter(
                  (item) => item.product._id !== productID,
                ),
              };
            });
          },
          resetCart() {
            toast.success(`your cart is reset`);
            return set({ items: [] });
          },
          getTotalPrice() {
            return get().items.reduce(
              (total, items) =>
                total + (items.product.price ?? 0) * items.quantity,
              0,
            );
          },
          getSubTotalPrice() {
            return get().items.reduce((total, item) => {
              const price = item.product.price ?? 0;
              const discount = ((item.product.discount ?? 0) * price) / 100;
              const discountedPrice = price + discount;
              return total + discountedPrice * item.quantity;
            }, 0);
          },
          getItemCount(productID) {
            const item = get().items.find(
              (item) => item.product._id === productID,
            );
            return item ? item.quantity : 0;
          },
          getGroupedItems() {
            return get().items;
          },
        }),
        { name: "cart-store" },
      ),
    ),
  );
};
export { createCartStore };
