import { ComponentProps } from "react";
import { Item as AtomItem } from "@/components/ui/atoms/Item";

export type Props = ComponentProps<typeof AtomItem>;

export const Item = ({ variant = "outline", ...props }: Props) => {
  return <AtomItem variant={variant} {...props} />;
};
