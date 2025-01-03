import React, { FC } from "react";
import loaderImage from "/public/assets/loaderImage.png";
import Image from "next/image";

type Props = {};

const Loader: FC<Props> = ({}) => {
  return (
    <div className="fixed left-0 top-0 z-40 flex min-h-screen w-full items-center justify-center bg-white p-10">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-gray-800" />

        <Image
          src={loaderImage}
          className="object-covers h-14 w-14"
          alt="loading"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default Loader;
