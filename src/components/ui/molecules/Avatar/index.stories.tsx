import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./index";

const meta: Meta<typeof Avatar> = {
  title: "molecules/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
    className: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "/github-mark.svg",
    alt: "Avatar Logo",
    className: "w-12 h-12",
  },
};
