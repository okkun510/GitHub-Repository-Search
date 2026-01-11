import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, type Props } from ".";
import { useState } from "react";

const meta: Meta<typeof Select> = {
  title: "molecules/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

type TemplateArgs = Omit<Props, "value" | "onValueChange"> & {
  wrapperClassName?: string;
};

const Template = (args: TemplateArgs, wrapperClassName = "w-[300px]") => {
  const [value, setValue] = useState<string | undefined>(args.defaultValue);

  return (
    <div className="flex flex-col gap-4">
      <div className={wrapperClassName}>
        <Select {...args} value={value} onValueChange={setValue} />
      </div>
      <div className="text-sm text-gray-600">
        選択された値:{" "}
        <span className="font-mono font-semibold">{value || "(未選択)"}</span>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => Template(args),
  args: {
    placeholder: "選択してください",
    options: [
      { value: "option1", label: "オプション1" },
      { value: "option2", label: "オプション2" },
      { value: "option3", label: "オプション3" },
    ],
  },
};

export const WithDefaultValue: Story = {
  render: (args) => Template(args),
  args: {
    defaultValue: "option2",
    options: [
      { value: "option1", label: "オプション1" },
      { value: "option2", label: "オプション2" },
      { value: "option3", label: "オプション3" },
    ],
  },
};

export const Disabled: Story = {
  render: (args) => Template(args),
  args: {
    placeholder: "選択してください",
    disabled: true,
    options: [
      { value: "option1", label: "オプション1" },
      { value: "option2", label: "オプション2" },
    ],
  },
};
