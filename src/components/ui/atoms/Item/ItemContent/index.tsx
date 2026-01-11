import { ItemContent as PrimitiveItemContent } from "@/components/primitives/item";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveItemContent>;

export const ItemContent = (props: Props) => {
  return <PrimitiveItemContent {...props} />;
};
