import type { ComponentProps } from "react";
import InView from "./InView";

type RevealFadeProps = Omit<ComponentProps<typeof InView>, "variant">;

/** Fades its children in (opacity only) as they scroll into view. */
export default function RevealFade(props: RevealFadeProps) {
  return <InView variant="fade" {...props} />;
}
