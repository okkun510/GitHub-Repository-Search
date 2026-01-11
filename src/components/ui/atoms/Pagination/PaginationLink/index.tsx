import { PaginationLink as PrimitivePaginationLink } from "@/components/primitives/pagination";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitivePaginationLink>;

export const PaginationLink = (props: Props) => {
  return <PrimitivePaginationLink {...props} />;
};
