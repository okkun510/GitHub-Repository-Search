import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from ".";

const meta: Meta<typeof Badge> = {
  title: "atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: {
        type: "radio",
      },
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};
