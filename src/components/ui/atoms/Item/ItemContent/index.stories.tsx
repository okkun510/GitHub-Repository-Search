import type { Meta, StoryObj } from "@storybook/react-vite";
import { ItemContent, Props } from "./index";
import { Item } from "@/components/primitives/item";

const ItemContentMeta: Meta<typeof ItemContent> = {
  title: "atoms/Item/ItemContent",
  component: ItemContent,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default ItemContentMeta;

const Template = (args: Props) => {
  return (
    <Item>
      <ItemContent {...args} />
    </Item>
  );
};

export const Default: StoryObj<typeof ItemContent> = {
  render: (args) => <Template {...args} />,
  args: {
  },
};
