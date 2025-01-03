import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import logo from "/public/assets/logo.png";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
type Props = {};

const NoAccessToCart: FC<Props> = ({}) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 py-12 md:py-32">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Image
              src={logo}
              alt="logo"
              width={80}
              height={80}
              className="mb-4"
            />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center text-muted-foreground">
            Log in to view your cart items and checkout. {"Don't"} miss out on
            your favorite products!
          </p>
          <SignInButton mode="modal" forceRedirectUrl={"/cart"}>
            <Button className="w-full" size={"lg"}>
              Sign In
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            {"Don't"} have an account?
          </div>
          <SignUpButton mode="modal" forceRedirectUrl={"/cart"}>
            <Button variant={"outline"} className="w-full" size={"lg"}>
              Create an account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccessToCart;
