import { Badge as PrimitiveBadge } from "@/components/primitives/badge";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveBadge>;

export const Badge = (props: Props) => {
  return <PrimitiveBadge {...props} />;
};
