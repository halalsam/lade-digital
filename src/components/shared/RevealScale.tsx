import type { ComponentProps } from "react";
import InView from "./InView";

type RevealScaleProps = Omit<ComponentProps<typeof InView>, "variant">;

/** Scales + fades its children up from `scaleFrom` as they scroll into view. */
export default function RevealScale(props: RevealScaleProps) {
  return <InView variant="scale" {...props} />;
}
