import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface iconLinkProps {
  href: string;
  icon: IconProp;
  text: string;
}
export function IconLink({ href, icon, text }: iconLinkProps) {
  return (
    <Link href={href} className="flex items-center h-8 w-full hover:bg-slate-800 pl-2">
      <span className="flex justify-center items-center p-1 w-5 h-5 text-xs bg-slate-600 rounded-md ">
        <FontAwesomeIcon icon={icon} />
      </span>
      <span className="ml-2">{text}</span>
    </Link>
  );
}
