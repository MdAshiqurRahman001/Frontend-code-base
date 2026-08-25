"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TablePaginationProps {
  totalPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TablePagination = ({
  totalPage = 10,
  currentPage,
  onPageChange,
}: TablePaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPage <= maxVisible) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPage - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPage - 2) pages.push("...");
    pages.push(totalPage);

    return pages;
  };

  return (
    <div className="flex items-center justify-end gap-3 p-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="flex items-center gap-2 px-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="min-w-9 h-9 px-2 flex items-center justify-center text-muted-foreground text-sm"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className="min-w-9 h-9 px-3 text-sm"
            >
              {String(page).padStart(2, "0")}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="flex items-center gap-2 px-4"
      >
        Next
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TablePagination;
