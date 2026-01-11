import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectContent, Props } from "./index";
import { Select } from "@/components/ui/atoms/Select";

const SelectContentMeta: Meta<typeof SelectContent> = {
  title: "atoms/Select/SelectContent",
  component: SelectContent,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default SelectContentMeta;

const Template = (args: Props) => {
  return (
    <Select>
      <SelectContent {...args} />
    </Select>
  );
};

export const Default: StoryObj<typeof SelectContent> = {
  render: (args) => <Template {...args} />,
  args: {
    className: "border-t",
  },
};
