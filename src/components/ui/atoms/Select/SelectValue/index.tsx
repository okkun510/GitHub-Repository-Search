import { SelectValue as PrimitiveSelectValue } from "@/components/primitives/select";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveSelectValue>;

export const SelectValue = (props: Props) => {
  return <PrimitiveSelectValue {...props} />;
};
