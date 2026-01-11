import type { Meta, StoryObj } from "@storybook/react-vite";
import { Repository, Props } from "./index";

const meta: Meta<typeof Repository> = {
  title: "organisms/Repository",
  component: Repository,
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const mockRepository: Props["repository"] = {
  id: 1,
  fullName: "vercel/next.js",
  description: "The React Framework for the Web",
  ownerAvatarUrl: "/github-mark.svg",
  stargazersCount: "128k",
  watchersCount: "128k",
  forksCount: "27.6k",
  openIssuesCount: "3.2k",
  language: "TypeScript",
  license: "MIT License",
  createdAt: "2016年10月25日",
  updatedAt: "2025年2月21日",
  htmlUrl: "https://github.com/vercel/next.js",
};

const Template = (args: Props) => {
  return <Repository {...args} />;
};

export const Default: StoryObj<typeof Repository> = {
  render: (args) => <Template {...args} />,
  args: {
    repository: mockRepository,
  },
};

export const NoDescription: StoryObj<typeof Repository> = {
  render: (args) => <Template {...args} />,
  args: {
    repository: {
      ...mockRepository,
      description: null,
    },
  },
};

export const NoLicense: StoryObj<typeof Repository> = {
  render: (args) => <Template {...args} />,
  args: {
    repository: {
      ...mockRepository,
      license: null,
    },
  },
};

export const NoLanguage: StoryObj<typeof Repository> = {
  render: (args) => <Template {...args} />,
  args: {
    repository: {
      ...mockRepository,
      language: null,
    },
  },
};
