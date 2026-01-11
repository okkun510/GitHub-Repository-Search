import { PaginationPrevious as PrimitivePaginationPrevious } from "@/components/primitives/pagination";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitivePaginationPrevious>;

export const PaginationPrevious = (props: Props) => {
  return <PrimitivePaginationPrevious {...props} />;
};
