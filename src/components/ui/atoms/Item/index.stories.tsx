import type { Meta, StoryObj } from "@storybook/react-vite";
import { Item } from ".";

const meta: Meta<typeof Item> = {
  title: "atoms/Item",
  component: Item,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "outline", "muted"],
    },
    size: {
      control: { type: "radio" },
      options: ["default", "sm"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    className: "w-64",
  },
};
