import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaginationEllipsis, Props } from "./index";

const PaginationEllipsisMeta: Meta<typeof PaginationEllipsis> = {
  title: "atoms/Pagination/PaginationEllipsis",
  component: PaginationEllipsis,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default PaginationEllipsisMeta;

const Template = (args: Props) => {
  return <PaginationEllipsis {...args} />;
};

export const Default: StoryObj<typeof PaginationEllipsis> = {
  render: (args) => <Template {...args} />,
  args: {},
};
