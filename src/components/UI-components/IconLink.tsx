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
    <Link href={href}>
      <span className="p-1 w-4 h-4 text-xs bg-slate-600 rounded-md ">
        <FontAwesomeIcon icon={icon} />
      </span>
      <span className="ml-2">{text}</span>
    </Link>
  );
}
