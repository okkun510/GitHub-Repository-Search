import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaginationPrevious, Props } from "./index";

const PaginationPreviousMeta: Meta<typeof PaginationPrevious> = {
  title: "atoms/Pagination/PaginationPrevious",
  component: PaginationPrevious,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default PaginationPreviousMeta;

const Template = (args: Props) => {
  return <PaginationPrevious {...args} />;
};

export const Default: StoryObj<typeof PaginationPrevious> = {
  render: (args) => <Template {...args} />,
  args: {
    href: "#",
  },
};
