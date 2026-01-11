import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectItem, Props } from "./index";
import { Select } from "@/components/ui/atoms/Select";
import { SelectContent } from "@/components/ui/atoms/Select/SelectContent";

const SelectItemMeta: Meta<typeof SelectItem> = {
  title: "atoms/Select/SelectItem",
  component: SelectItem,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Select>
          <SelectContent>
            <Story />
          </SelectContent>
        </Select>
      </div>
    ),
  ],
};

export default SelectItemMeta;

const Template = (args: Props) => {
  return <SelectItem {...args} />;
};

export const Default: StoryObj<typeof SelectItem> = {
  render: (args) => <Template {...args} />,
  args: {
    value: "1",
    disabled: false,
  },
};
