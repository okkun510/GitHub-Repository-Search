import { PaginationItem as PrimitivePaginationItem } from "@/components/primitives/pagination";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitivePaginationItem>;

export const PaginationItem = (props: Props) => {
  return <PrimitivePaginationItem {...props} />;
};
