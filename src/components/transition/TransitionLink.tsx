"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent, Ref } from "react";
import { usePageTransition } from "./TransitionProvider";

type Props = ComponentProps<typeof Link> & { ref?: Ref<HTMLAnchorElement> };

/**
 * Drop-in replacement for `next/link`. Internal navigations are routed through
 * the page-transition curtain; external links, hashes, new-tab and modified
 * clicks fall through to native behaviour untouched.
 *
 * Adopt it anywhere by aliasing the import:
 *   import Link from "@/components/transition/TransitionLink";
 */
export default function TransitionLink({ href, onClick, ref, ...rest }: Props) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Respect new-tab / modifier / non-primary-button intent.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;

    const url = typeof href === "string" ? href : href.toString();

    // Only intercept same-origin path navigations.
    if (!url.startsWith("/") || url.startsWith("//")) return;

    // Same-page hash jumps: let the browser scroll natively.
    const path = url.split("#")[0];
    if (path === pathname) return;

    event.preventDefault();
    navigate(url);
  };

  return <Link ref={ref} href={href} onClick={handleClick} {...rest} />;
}
