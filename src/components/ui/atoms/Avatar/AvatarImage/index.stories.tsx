import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarImage, Props } from "./index";
import { Avatar } from "../../../../primitives/avatar";

const AvatarImageMeta: Meta<typeof AvatarImage> = {
  title: "atoms/Avatar/AvatarImage",
  component: AvatarImage,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default AvatarImageMeta;

const Template = (args: Props) => {
  return (
    <Avatar>
      <AvatarImage {...args} />
    </Avatar>
  );
};

export const Default: StoryObj<typeof AvatarImage> = {
  render: (args) => <Template {...args} />,
  args: {
    src: "/github-mark.svg",
  },
};
