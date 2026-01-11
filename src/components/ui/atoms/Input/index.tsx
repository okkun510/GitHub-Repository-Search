import { Input as PrimitiveInput } from "@/components/primitives/input";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveInput>;

export const Input = (props: Props) => {
  return <PrimitiveInput {...props} />;
};
