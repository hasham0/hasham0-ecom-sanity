import Container from "@/components/customComp/container";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <Container className="flex items-center justify-center overflow-hidden py-52">
      {children}
    </Container>
  );
}
