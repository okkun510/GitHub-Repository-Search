import { Pagination as AtomPagination } from "@/components/ui/atoms/Pagination";
import { PaginationContent } from "@/components/ui/atoms/Pagination/PaginationContent";
import { PaginationEllipsis } from "@/components/ui/atoms/Pagination/PaginationEllipsis";
import { PaginationItem } from "@/components/ui/atoms/Pagination/PaginationItem";
import { PaginationLink } from "@/components/ui/atoms/Pagination/PaginationLink";
import { PaginationNext } from "@/components/ui/atoms/Pagination/PaginationNext";
import { PaginationPrevious } from "@/components/ui/atoms/Pagination/PaginationPrevious";

export type Props = {
  totalPage: number;
  href: string;
};

export const Pagination = ({ totalPage, href }: Props) => {
  const getCurrentPage = () => {
    const [, query] = href.split("?");
    const params = new URLSearchParams(query);
    return Number(params.get("page")) || 1;
  };

  const currentPage = getCurrentPage();
  const getPageRange = () => {
    const siblings = 1;
    const startPage = Math.max(1, currentPage - siblings);
    const endPage = Math.min(totalPage, currentPage + siblings);
    const length = endPage - startPage + 1;

    return Array.from({ length }, (_, idx) => startPage + idx);
  };

  const getPageUrl = (page: number) => {
    const [pathname, query] = href.split("?");
    const params = new URLSearchParams(query);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  const pageRange = getPageRange();
  const firstPageInRange = pageRange.at(0);
  const lastPageInRange = pageRange.at(-1);

  const firstPage = 1;
  const secondPage = 2;

  const hasPageRange =
    firstPageInRange !== undefined && lastPageInRange !== undefined;

  const showFirst = hasPageRange && firstPageInRange > firstPage;
  const showFirstEllipsis = hasPageRange && firstPageInRange > secondPage;
  const showLastEllipsis = hasPageRange && lastPageInRange < totalPage - 1;
  const showLast = hasPageRange && lastPageInRange < totalPage;

  return (
    <AtomPagination>
      <PaginationContent className="gap-0 md:gap-1">
        {hasPageRange && currentPage > firstPage && (
          <PaginationItem>
            <PaginationPrevious href={getPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}

        {showFirst && (
          <PaginationItem>
            <PaginationLink href={getPageUrl(firstPage)}>
              {firstPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {showFirstEllipsis && <PaginationEllipsis />}

        {hasPageRange &&
          pageRange.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={getPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {showLastEllipsis && <PaginationEllipsis />}

        {showLast && (
          <PaginationItem>
            <PaginationLink href={getPageUrl(totalPage)}>
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {hasPageRange && currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext href={getPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </AtomPagination>
  );
};
