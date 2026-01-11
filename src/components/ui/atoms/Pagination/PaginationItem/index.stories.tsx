import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaginationItem, Props } from "./index";
import {
  Pagination,
  PaginationContent,
} from "@/components/primitives/pagination";

const PaginationItemMeta: Meta<typeof PaginationItem> = {
  title: "atoms/Pagination/PaginationItem",
  component: PaginationItem,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default PaginationItemMeta;

const Template = (args: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem {...args} />
      </PaginationContent>
    </Pagination>
  );
};

export const Default: StoryObj<typeof PaginationItem> = {
  render: (args) => <Template {...args} />,
  args: {
    children: "",
  },
};
