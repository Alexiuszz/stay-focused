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
                        <FontAwesomeIcon icon={icon} />
                        <span className="ml-2">{text}</span>
                </Link>
        );
}
