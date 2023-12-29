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
}

function PostPagination({ page }: Props) {
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
          <PaginationNext href={`/home?page=${page + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PostPagination;
