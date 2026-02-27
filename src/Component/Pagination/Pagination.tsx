import React from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 10
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    if (currentPage - 1 <= half) {
      start = 2;
      end = Math.min(totalPages - 1, maxVisiblePages);
    }

    if (totalPages - currentPage <= half) {
      start = Math.max(2, totalPages - maxVisiblePages + 1);
      end = totalPages - 1;
    }

    pages.push(1); // first page
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages); // last page

    return pages;
  };

  return (
    <div className="pagination-container">
      <div
        className={`pagination-arrow ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePrevious}
      >
        <KeyboardBackspaceIcon />
      </div>

      <div className="pagination-numbers">
        {getPageNumbers().map((page, idx) =>
          typeof page === "number" ? (
            <div
              key={idx}
              className={`pagination-page ${currentPage === page ? "active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </div>
          ) : (
            <div key={idx} className="pagination-ellipsis">
              {page}
            </div>
          )
        )}
      </div>

      <div
        className={`pagination-arrow ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={handleNext}
      >
        <ArrowRightAltIcon />
      </div>
    </div>
  );
};

export default Pagination;