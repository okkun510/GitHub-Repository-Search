import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectValue, Props } from "./index";
import { Select } from "@/components/ui/atoms/Select";

const SelectValueMeta: Meta<typeof SelectValue> = {
  title: "atoms/Select/SelectValue",
  component: SelectValue,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default SelectValueMeta;

const Template = (args: Props) => {
  return (
    <Select>
      <SelectValue {...args} />
    </Select>
  );
};

export const Default: StoryObj<typeof SelectValue> = {
  render: (args) => <Template {...args} />,
  args: {
    placeholder: "Select an option",
  },
};
