import type { ComponentProps } from "react";
import InView from "./InView";

type RevealUpProps = Omit<ComponentProps<typeof InView>, "variant">;

/** Rises + fades its children up by `y`px as they scroll into view. */
export default function RevealUp(props: RevealUpProps) {
  return <InView variant="up" {...props} />;
}
