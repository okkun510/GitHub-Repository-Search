import { SelectContent as PrimitiveSelectContent } from "@/components/primitives/select";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveSelectContent>;

export const SelectContent = (props: Props) => {
  return <PrimitiveSelectContent {...props} />;
};
