"use client";

import { ChevronRightIcon, StarIcon } from "lucide-react";
import { Input } from "@/components/ui/atoms/Input";
import { Button } from "@/components/ui/atoms/Button";
import { Item } from "@/components/ui/molecules/Item";
import { Avatar } from "@/components/ui/molecules/Avatar";
import { ItemContent } from "@/components/ui/atoms/Item/ItemContent";
import { Pagination } from "@/components/ui/molecules/Pagination";
import { Select } from "@/components/ui/molecules/Select";

export type Repository = {
  id: number;
  fullName: string;
  description: string | null;
  ownerAvatarUrl: string;
  stargazersCount: string;
  htmlUrl: string;
};

const RepositoryItem = ({ repository }: { repository: Repository }) => (
  <Item asChild>
    <a href={`/${repository.fullName}`}>
      <Avatar
        src={repository.ownerAvatarUrl}
        alt={repository.fullName}
        className="w-10 h-10"
      />
      <ItemContent>
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate">{repository.fullName}</h3>
          <div className="flex items-center gap-1 text-sm shrink-0 ml-4">
            <StarIcon className="size-4 fill-yellow-400 stroke-yellow-400" aria-hidden="true" />
            <span aria-label={`スター数 ${repository.stargazersCount}`}>
              {repository.stargazersCount}
            </span>
          </div>
        </div>
        {repository.description && (
          <p className="text-muted-foreground text-sm line-clamp-2">
            {repository.description}
          </p>
        )}
      </ItemContent>
      <ChevronRightIcon className="size-4" />
    </a>
  </Item>
);

const sortOptions = [
  { value: "best-match", label: "デフォルト順" },
  { value: "stars", label: "スター数順" },
  { value: "forks", label: "フォーク数順" },
  { value: "help-wanted-issues", label: "help-wantedイシュー数順" },
  { value: "updated", label: "更新日順" },
];

export type Props = {
  repositories: Repository[];
  totalPage: number;
  currentHref: string;
  defaultValue?: string;
  defaultSort?: string;
  hasSearched?: boolean;
};

export const RepositoryList = ({
  repositories,
  totalPage,
  currentHref,
  defaultValue,
  defaultSort,
  hasSearched = false,
}: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <form className="flex flex-col sm:flex-row sm:justify-center gap-2">
        <label htmlFor="search" className="sr-only">検索キーワード</label>
        <Input
          id="search"
          type="text"
          name="q"
          placeholder="キーワードを入力"
          className="w-full sm:flex-1 sm:w-64"
          defaultValue={defaultValue}
        />
        <Select
          name="sort"
          options={sortOptions}
          defaultValue={defaultSort}
          className="w-full sm:w-40"
        />
        <Button type="submit" className="w-full sm:w-auto">検索</Button>
      </form>

      <div className="flex flex-col gap-2">
        {!hasSearched ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              キーワードを入力して検索してください
            </p>
          </div>
        ) : repositories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">検索結果がありません</p>
            <p className="text-sm text-muted-foreground mt-1">
              別のキーワードで検索してみてください
            </p>
          </div>
        ) : (
          repositories.map((repo) => (
            <RepositoryItem key={repo.id} repository={repo} />
          ))
        )}
      </div>

      {totalPage > 1 && <Pagination totalPage={totalPage} href={currentHref} />}
    </div>
  );
};
