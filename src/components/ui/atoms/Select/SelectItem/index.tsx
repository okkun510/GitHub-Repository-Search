import { SelectItem as PrimitiveSelectItem } from "@/components/primitives/select";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveSelectItem>;

export const SelectItem = (props: Props) => {
  return <PrimitiveSelectItem {...props} />;
};
