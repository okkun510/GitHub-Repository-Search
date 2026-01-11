import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from ".";

const meta: Meta<typeof Pagination> = {
  title: "molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  args: {
    totalPage: 30,
    href: "/companies",
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Start: Story = {
  args: {
    href: "/companies?page=1",
  },
};

export const Half: Story = {
  args: {
    href: "/companies?page=15",
  },
};

export const End: Story = {
  args: {
    href: "/companies?page=30",
  },
};

export const WithSearch: Story = {
  args: {
    href: "/companies?search=テスト&page=5",
  },
};

export const WithMultipleParams: Story = {
  args: {
    href: "/companies?search=テスト&filter=active&sort=desc&page=5",
  },
};

export const FewPages: Story = {
  args: {
    totalPage: 3,
    href: "/companies?page=2",
  },
};
