import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination, Props } from ".";

const PaginationMeta: Meta<typeof Pagination> = {
  title: "atoms/Pagination",
  component: Pagination,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default PaginationMeta;

const Template = (args: Props) => {
  return <Pagination {...args} />;
};

export const Dafault: StoryObj<typeof Pagination> = {
  render: (args) => <Template {...args} />,
  args: {},
};
