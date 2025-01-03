import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Container: FC<Props> = ({ children, className }) => {
  return (
    <section className={cn(`mx-auto max-w-screen-xl px-4`, className)}>
      {children}
    </section>
  );
};

export default Container;
