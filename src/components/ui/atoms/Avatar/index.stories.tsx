import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, Props } from ".";

const AvatarMeta: Meta<typeof Avatar> = {
  title: "atoms/Avatar",
  component: Avatar,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default AvatarMeta;

const Template = (args: Props) => {
  return <Avatar {...args} />;
};

export const Dafault: StoryObj<typeof Avatar> = {
  render: (args) => <Template {...args} />,
  args: {},
};
