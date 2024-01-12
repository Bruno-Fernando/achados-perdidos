"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import useQueryParams from "@/hooks/useQueryParams";

interface Props {
  page: number;
  count: number;
}

const PER_PAGE = 10;

function PostPagination({ page, count }: Props) {
  const { createQueryString } = useQueryParams();

  const hasNextPage = 0 < count - page * PER_PAGE;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/home?${createQueryString("page", page - 1)}`}
            isActive={page === 1}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={`/home?${createQueryString("page", page + 1)}`}
            isActive={!hasNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PostPagination;
