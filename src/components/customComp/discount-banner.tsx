import { SaleTS } from "@/types";
import React, { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";

type Props = { sales: SaleTS };

const DiscountBanner: FC<Props> = ({ sales }) => {
  return (
    <Carousel className="mx-auto my-10 w-full max-w-screen-xl">
      <CarouselContent>
        {sales?.map((sale) => (
          <CarouselItem key={sale?._id}>
            <Card>
              <CardContent className="p-0 capitalize">
                <div className="flex flex-col-reverse items-center md:flex-row">
                  <div className="flex flex-1 flex-col gap-2 p-6 md:gap-4 md:px-12">
                    <Badge
                      variant={"secondary"}
                      className="w-fit text-darkBlue"
                    >
                      {sale?.bedge} {sale?.discountAmount}% off
                    </Badge>
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                      {sale?.title}
                    </h2>
                    <p className="text-muted-foreground">{sale?.description}</p>
                    <p>
                      Use code:&nbsp;
                      <span className="font-semibold uppercase text-primary">
                        {sale?.coupanCode}
                      </span>
                      &nbsp;for&nbsp;
                      <span className="font-semibold">
                        {sale?.discountAmount}
                      </span>
                      %&nbsp;OFF
                    </p>
                    <Button className="w-fit">Shop Now</Button>
                  </div>
                  {sale?.image && (
                    <div className="relative flex h-auto w-full items-center justify-center py-4 md:w-1/2">
                      <Image
                        src={urlFor(sale?.image).url()}
                        alt={sale?.title || `banner image`}
                        width={500}
                        height={500}
                        className="h-[550px] rounded-xl object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  );
};

export default DiscountBanner;
