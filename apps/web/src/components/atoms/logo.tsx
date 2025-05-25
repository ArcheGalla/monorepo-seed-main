import React from "react";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";

import LogoSvg from "../../assets/provider-logos/logo.svg";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  href?: string;
  src?: string;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "flex items-center gap-1",
  imageClassName = "object-cover w-[90px] h-[45px] ml-4 rounded-none",
  href = "/",
  src = LogoSvg.src,
  alt = "VegasBonanza Logo",
}) => {
  return (
    <Link className={className} href={href}>
      <Image alt={alt} className={imageClassName} src={src} />
    </Link>
  );
};
