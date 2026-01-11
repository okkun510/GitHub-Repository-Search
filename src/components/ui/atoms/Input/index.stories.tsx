import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: {
        type: "radio",
      },
      options: ["text", "number", "file", "email"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "placeholder",
    disabled: false,
    className: "bg-white",
  },
};
