import { Pagination as PrimitivePagination } from "@/components/primitives/pagination";
import { ComponentProps } from "react";

export type Props = ComponentProps<typeof PrimitivePagination>;

export const Pagination = (props: Props) => {
  return <PrimitivePagination {...props} />;
};
