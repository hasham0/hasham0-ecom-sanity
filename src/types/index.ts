import { Sale, Product, Category, Order } from "@/sanity/sanity.types";

// export sanity types
type SaleTS = Sale[] | null;
type ProductTS = Product[] | null;
type SingleProductTS = Product | null;
type CategoryTS = Category[] | null;
type OrderTS = Order[] | null;

export type { SaleTS, ProductTS, CategoryTS, SingleProductTS, OrderTS };

// cart item type
export type CartItem = {
  product: Product;
  quantity: number;
};

// cart state type
interface CartStateTS {
  items: CartItem[];
}

// cart action type
interface CartActionTS {
  addItem: (product: Product) => void;
  removeItem: (productID: string) => void;
  deleteCartProduct: (productID: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productID: string) => number;
  getGroupedItems: () => CartItem[];
}

// cart type
type CartTS = CartStateTS & CartActionTS;

export type { CartTS, CartStateTS, CartActionTS };

// roles
export enum Roles {
  ADMIN = "admin",
  USER = "user",
}

// metadataTs
type MetadataTS = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type { MetadataTS };
