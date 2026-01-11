import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRightIcon, StarIcon } from "lucide-react";
import { Item } from ".";
import { Avatar } from "@/components/ui/molecules/Avatar";
import { ItemContent } from "@/components/ui/atoms/Item/ItemContent";

const meta: Meta<typeof Item> = {
  title: "molecules/Item",
  component: Item,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => (
    <Item asChild>
      <a href="#">
        <Avatar src="/github-mark.svg" alt="GitHub" className="w-10 h-10" />
        <ItemContent>
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate">facebook/react</h3>
            <div className="flex items-center gap-1 text-sm shrink-0 ml-4">
              <StarIcon className="size-4 fill-yellow-400 stroke-yellow-400" />
              <span>230k</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">
            A declarative, efficient, and flexible JavaScript library for
            building user interfaces.
          </p>
        </ItemContent>
        <ChevronRightIcon className="size-4" />
      </a>
    </Item>
  ),
};
