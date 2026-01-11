import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectTrigger, Props } from "./index";
import { Select } from "@/components/ui/atoms/Select";

const SelectTriggerMeta: Meta<typeof SelectTrigger> = {
  title: "atoms/Select/SelectTrigger",
  component: SelectTrigger,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default SelectTriggerMeta;

const Template = (args: Props) => {
  return (
    <Select>
      <SelectTrigger {...args} />
    </Select>
  );
};

export const Default: StoryObj<typeof SelectTrigger> = {
  render: (args) => <Template {...args} />,
  args: {
    asChild: false,
  },
};
