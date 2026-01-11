import { Select as PrimitiveSelect } from "@/components/primitives/select";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitiveSelect>;

export const Select = (props: Props) => {
  return <PrimitiveSelect {...props} />;
};
