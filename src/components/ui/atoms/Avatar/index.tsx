import { Avatar as PrimitiveAvatar } from "@/components/primitives/avatar";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveAvatar>;

export const Avatar = (props: Props) => {
  return <PrimitiveAvatar {...props} />;
};
