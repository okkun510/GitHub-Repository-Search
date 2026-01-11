import { PaginationEllipsis as PrimitivePaginationEllipsis } from "@/components/primitives/pagination";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitivePaginationEllipsis>;

export const PaginationEllipsis = (props: Props) => {
  return <PrimitivePaginationEllipsis {...props} />;
};
