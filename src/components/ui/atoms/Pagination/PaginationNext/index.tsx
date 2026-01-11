import { PaginationNext as PrimitivePaginationNext } from "@/components/primitives/pagination";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitivePaginationNext>;

export const PaginationNext = (props: Props) => {
  return <PrimitivePaginationNext {...props} />;
};
