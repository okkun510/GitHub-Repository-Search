import { AvatarImage } from "../../atoms/Avatar/AvatarImage";
import { Avatar as AtomAvatar } from "../../atoms/Avatar";
import { cn } from "@/components/utils";

export type Props = {
  src: string;
  alt: string;
  className?: string;
};

export const Avatar = ({ src, alt, className }: Props) => {
  return (
    <AtomAvatar className={cn("text-muted-foreground", className)}>
      <AvatarImage
        src={src}
        alt={alt}
        className="object-contain object-center"
      />
    </AtomAvatar>
  );
};
