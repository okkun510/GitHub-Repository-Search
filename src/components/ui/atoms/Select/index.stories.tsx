import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, Props } from ".";

const SelectMeta: Meta<typeof Select> = {
  title: "atoms/Select",
  component: Select,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default SelectMeta;

const Template = (args: Props) => {
  return <Select {...args} />;
};

export const Dafault: StoryObj<typeof Select> = {
  render: (args) => <Template {...args} />,
  args: {
    defaultValue: "",
    value: "",
    onValueChange: () => {},
    defaultOpen: false,
    open: false,
    onOpenChange: () => {},
    name: "",
    disabled: false,
    required: false,
  },
};
