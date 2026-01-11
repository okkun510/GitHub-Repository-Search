import {
  StarIcon,
  GitForkIcon,
  EyeIcon,
  CircleDotIcon,
  ScaleIcon,
  CalendarIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { Avatar } from "@/components/ui/molecules/Avatar";
import { Button } from "@/components/ui/atoms/Button";
import { Badge } from "@/components/ui/atoms/Badge";
import { getLanguageColor } from "@/components/utils/languageColors";

export type Props = {
  repository: {
    id: number;
    fullName: string;
    description: string | null;
    ownerAvatarUrl: string;
    stargazersCount: string;
    watchersCount: string;
    forksCount: string;
    openIssuesCount: string;
    language: string | null;
    license: string | null;
    createdAt: string;
    updatedAt: string;
    htmlUrl: string;
  };
};

export const Repository = ({ repository }: Props) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <Avatar
          src={repository.ownerAvatarUrl}
          alt={repository.fullName}
          className="w-16 h-16"
        />
        <h1 className="text-2xl font-bold">{repository.fullName}</h1>
      </div>

      {repository.description && (
        <p className="text-muted-foreground">{repository.description}</p>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant="secondary">
          <StarIcon className="size-3 fill-yellow-400 stroke-yellow-400 mr-1" />
          {repository.stargazersCount} stars
        </Badge>
        <Badge variant="secondary">
          <EyeIcon className="size-3 mr-1" />
          {repository.watchersCount} watching
        </Badge>
        <Badge variant="secondary">
          <GitForkIcon className="size-3 mr-1" />
          {repository.forksCount} forks
        </Badge>
        <Badge variant="secondary">
          <CircleDotIcon className="size-3 mr-1" />
          {repository.openIssuesCount} issues
        </Badge>
        {repository.language && (
          <Badge variant="secondary">
            <span
              className={`w-2 h-2 rounded-full ${getLanguageColor(repository.language)} mr-1`}
            />
            {repository.language}
          </Badge>
        )}
        {repository.license && (
          <Badge variant="secondary">
            <ScaleIcon className="size-3 mr-1" />
            {repository.license}
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4" />
          <span>作成日: {repository.createdAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4" />
          <span>更新日: {repository.updatedAt}</span>
        </div>
      </div>

      <Button asChild className="w-fit">
        <a href={repository.htmlUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLinkIcon className="size-4" />
          GitHubで開く
        </a>
      </Button>
    </div>
  );
};
