import Form from "next/form";
import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import dynamic from "next/dynamic";
import { User as UserIcon } from "lucide-react";
import Container from "@/components/customComp/container";
import { currentUser, User } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import SanityStudio from "@/components/customComp/sanity-studio";
import { checkRole } from "@/lib/services/check-role";
import { Roles } from "@/types";
import { getMyOrders } from "@/sanity/helpers";

const CartIcon = dynamic(() => import("@/components/customComp/cart-icon"), {
  ssr: true,
});
const OrdersIcon = dynamic(
  () => import("@/components/customComp/orders-icon"),
  {
    ssr: true,
  },
);

type Props = {};

const Header: FC<Props> = async ({}) => {
  const user: User | null = await currentUser();
  const orderLength = await getMyOrders(user?.id!);

  //TODO: set user role base access
  const isAdmin = await checkRole(Roles.ADMIN);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-b-gray-400 bg-white py-4">
      <Container className="flex items-center justify-between gap-5">
        {/* <!-- logo --> */}
        <Link href={"/"} className="flex min-w-fit items-center sm:items-start">
          <Image
            src={"/assets/logo.png"}
            alt="logo"
            width={150}
            height={100}
            className="w-24"
            priority
          />
        </Link>
        {/* <!-- search bar --> */}
        <Form action={"/search"} className="hidden flex-1 lg:flex">
          <input
            type="text"
            name="query"
            placeholder="Search for products..."
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 outline-none focus-visible:border-darkBlue"
          />
        </Form>
        {/* <!-- tabs --> */}
        <div className="flex w-3/4 items-center justify-end gap-5 sm:justify-evenly lg:w-fit">
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <OrdersIcon ordersLength={orderLength?.length!} />
            </SignedIn>
            {isAdmin && <SanityStudio />}
            {user ? (
              <div className="flex w-full max-w-fit gap-2 rounded-md border border-gray-200 px-2 py-2.5 outline-none">
                <UserButton />
                <div className="hidden flex-col md:flex">
                  <p className="mt-1 text-sm font-semibold lg:text-base">
                    {user?.fullName?.split(" ")[0]}
                  </p>
                </div>
              </div>
            ) : (
              <SignInButton>
                <div className="hoverEffect flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none">
                  <UserIcon className="size-6 text-darkBlue" />
                  <div className="flex flex-col">
                    <p className="text-xs">Account</p>
                    <p className="font-semibold">Login</p>
                  </div>
                </div>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
