import type { Meta, StoryObj } from "@storybook/react-vite";
import { RepositoryList, Props, Repository } from "./index";

const RepositoryListMeta: Meta<typeof RepositoryList> = {
  title: "organisms/RepositoryList",
  component: RepositoryList,
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};

export default RepositoryListMeta;

const mockRepositories: Repository[] = [
  {
    id: 1,
    fullName: "facebook/react",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    ownerAvatarUrl: "/github-mark.svg",
    stargazersCount: "230k",
    htmlUrl: "https://github.com/facebook/react",
  },
  {
    id: 2,
    fullName: "vuejs/vue",
    description:
      "Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
    ownerAvatarUrl: "/github-mark.svg",
    stargazersCount: "208k",
    htmlUrl: "https://github.com/vuejs/vue",
  },
  {
    id: 3,
    fullName: "angular/angular",
    description:
      "Deliver web apps with confidence. The modern web developer's platform.",
    ownerAvatarUrl: "/github-mark.svg",
    stargazersCount: "96.5k",
    htmlUrl: "https://github.com/angular/angular",
  },
  {
    id: 4,
    fullName: "sveltejs/svelte",
    description:
      "Cybernetically enhanced web apps. A radical new approach to building user interfaces.",
    ownerAvatarUrl: "/github-mark.svg",
    stargazersCount: "80.2k",
    htmlUrl: "https://github.com/sveltejs/svelte",
  },
  {
    id: 5,
    fullName: "vercel/next.js",
    description: "The React Framework for the Web",
    ownerAvatarUrl: "/github-mark.svg",
    stargazersCount: "128k",
    htmlUrl: "https://github.com/vercel/next.js",
  },
];

const Template = (args: Props) => {
  return <RepositoryList {...args} />;
};

export const Default: StoryObj<typeof RepositoryList> = {
  render: (args) => <Template {...args} />,
  args: {
    repositories: mockRepositories,
    totalPage: 10,
    currentHref: "/search?q=react",
    defaultSort: "best-match",
        hasSearched: true,
  },
};

export const SinglePage: StoryObj<typeof RepositoryList> = {
  render: (args) => <Template {...args} />,
  args: {
    repositories: mockRepositories.slice(0, 2),
    totalPage: 1,
    currentHref: "/search?q=react",
    defaultSort: "best-match",
        hasSearched: true,
  },
};

export const Empty: StoryObj<typeof RepositoryList> = {
  render: (args) => <Template {...args} />,
  args: {
    repositories: [],
    totalPage: 0,
    currentHref: "/search?q=nonexistent",
    defaultSort: "best-match",
        hasSearched: true,
  },
};

export const Initial: StoryObj<typeof RepositoryList> = {
  render: (args) => <Template {...args} />,
  args: {
    repositories: [],
    totalPage: 0,
    currentHref: "/search",
    defaultSort: "best-match",
        hasSearched: false,
  },
};
