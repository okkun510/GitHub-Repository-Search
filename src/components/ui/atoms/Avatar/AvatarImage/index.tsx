import { AvatarImage as PrimitiveAvatarImage } from "@/components/primitives/avatar";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveAvatarImage>;

export const AvatarImage = (props: Props) => {
  return <PrimitiveAvatarImage {...props} />;
};
