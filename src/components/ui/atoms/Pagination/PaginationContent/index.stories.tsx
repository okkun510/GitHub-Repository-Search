import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaginationContent, Props } from "./index";

const PaginationContentMeta: Meta<typeof PaginationContent> = {
  title: "atoms/Pagination/PaginationContent",
  component: PaginationContent,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default PaginationContentMeta;

const Template = (args: Props) => {
  return <PaginationContent {...args} />;
};

export const Default: StoryObj<typeof PaginationContent> = {
  render: (args) => <Template {...args} />,
  args: {},
};
