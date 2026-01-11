import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from ".";
import { Circle, Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: {
        type: "radio",
      },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: {
        type: "radio",
      },
      options: ["default", "sm", "lg", "icon"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const TextButton: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
    onClick: () => alert("clicked"),
  },
};

export const IconButton: Story = {
  args: {
    children: <Circle />,
    variant: "default",
    size: "icon",
    disabled: false,
    onClick: () => alert("clicked"),
  },
};

export const AsATag: Story = {
  args: {
    asChild: true,
    variant: "default",
    size: "default",
    children: (
      <a href="#" className="no-underline">
        <Plus /> You can use as a tag
      </a>
    ),
  },
};
