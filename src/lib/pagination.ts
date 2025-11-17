/**
 * Pagination utility for blog listings
 */

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
}

/**
 * Paginate an array of items
 */
export function paginate<T>(
  items: T[],
  currentPage: number = 1,
  itemsPerPage: number = 10
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Ensure currentPage is within valid range
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    currentPage: validPage,
    totalPages,
    itemsPerPage,
    totalItems,
    hasNextPage: validPage < totalPages,
    hasPreviousPage: validPage > 1,
    startIndex,
    endIndex
  };
}

/**
 * Generate page numbers for pagination UI
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 7
): (number | 'ellipsis')[] {
  if (totalPages <= maxVisible) {
    // Show all pages if total is less than max
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  // Always show first page
  pages.push(1);

  let startPage: number;
  let endPage: number;

  if (currentPage <= halfVisible + 1) {
    // Near the beginning
    startPage = 2;
    endPage = maxVisible - 1;
  } else if (currentPage >= totalPages - halfVisible) {
    // Near the end
    startPage = totalPages - maxVisible + 2;
    endPage = totalPages - 1;
  } else {
    // In the middle
    startPage = currentPage - halfVisible + 1;
    endPage = currentPage + halfVisible - 1;
  }

  // Add ellipsis after first page if needed
  if (startPage > 2) {
    pages.push('ellipsis');
  }

  // Add middle pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add ellipsis before last page if needed
  if (endPage < totalPages - 1) {
    pages.push('ellipsis');
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Calculate pagination info for display
 */
export function getPaginationInfo(
  currentPage: number,
  itemsPerPage: number,
  totalItems: number
): string {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  
  if (totalItems === 0) {
    return 'No items';
  }
  
  return `Showing ${startIndex}-${endIndex} of ${totalItems}`;
}
