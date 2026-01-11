import { Item as PrimitiveItem } from "@/components/primitives/item";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveItem>;

export const Item = (props: Props) => {
  return <PrimitiveItem {...props} />;
};
