import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaginationNext, Props } from "./index";

const PaginationNextMeta: Meta<typeof PaginationNext> = {
  title: "atoms/Pagination/PaginationNext",
  component: PaginationNext,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default PaginationNextMeta;

const Template = (args: Props) => {
  return <PaginationNext {...args} />;
};

export const Default: StoryObj<typeof PaginationNext> = {
  render: (args) => <Template {...args} />,
  args: {
    href: "#",
  },
};
