import { SelectTrigger as PrimitiveSelectTrigger } from "@/components/primitives/select";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveSelectTrigger>;

export const SelectTrigger = (props: Props) => {
  return <PrimitiveSelectTrigger {...props} />;
};
