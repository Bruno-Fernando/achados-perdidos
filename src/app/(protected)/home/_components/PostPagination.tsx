import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";

interface Props {
  page: number;
  count: number;
}

const PER_PAGE = 5;

function PostPagination({ page, count }: Props) {
  const hasNextPage = 0 < count - page * PER_PAGE;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/home?page=${page - 1}`}
            isActive={page === 1}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={`/home?page=${page + 1}`}
            isActive={!hasNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PostPagination;
