import { Button as PrimitiveButton } from "@/components/primitives/button";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveButton>;

export const Button = (props: Props) => {
  return <PrimitiveButton {...props} />;
};
