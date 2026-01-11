import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaginationLink, Props } from "./index";

const PaginationLinkMeta: Meta<typeof PaginationLink> = {
  title: "atoms/Pagination/PaginationLink",
  component: PaginationLink,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default PaginationLinkMeta;

const Template = (args: Props) => {
  return <PaginationLink {...args} />;
};

export const Default: StoryObj<typeof PaginationLink> = {
  render: (args) => <Template {...args} />,
  args: {
    href: "#",
  },
};
