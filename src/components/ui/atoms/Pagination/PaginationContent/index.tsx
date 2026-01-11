import { PaginationContent as PrimitivePaginationContent } from "@/components/primitives/pagination";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitivePaginationContent>;

export const PaginationContent = (props: Props) => {
  return <PrimitivePaginationContent {...props} />;
};
