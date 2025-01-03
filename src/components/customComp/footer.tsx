import Image from "next/image";
import React, { FC } from "react";
import { Copyright } from "lucide-react";
import Container from "@/components/customComp/container";

type Props = {};

const Footer: FC<Props> = ({}) => {
  return (
    <footer className="min-w-screen-2xl bg-lightBg text-xs sm:text-sm md:text-base">
      <Container className="flex min-w-full flex-col items-center justify-between gap-3 py-5 text-gray-500 lg:flex-row">
        <p className="flex items-center gap-3 capitalize text-gray-500">
          Copyright <Copyright /> 2024
          <span className="font-semibold text-darkBlue">reactBD</span> all right
          reserved
        </p>
        <Image
          src={"/assets/payment.png"}
          alt="payment"
          className="h-auto w-[200px] min-w-fit object-cover"
          width={400}
          height={400}
          priority
        />
      </Container>
    </footer>
  );
};

export default Footer;
