export const selectBooks = (state) => state.books.books;
export const selectSortBy = (state) => state.books.sortBy;
export const selectSortOrder = (state) => state.books.sortOrder;
export const selectLoading = (state) => state.books.loading;
export const selectError = (state) => state.books.error;

export const selectSortedBooks = (state) => {
  const books = [...selectBooks(state)];
  const sortBy = selectSortBy(state);
  const sortOrder = selectSortOrder(state);

  return books.sort((a, b) => {
    const aValue = String(a[sortBy] || "").toLowerCase();
    const bValue = String(b[sortBy] || "").toLowerCase();

    if (aValue < bValue) {
      return sortOrder === "asc" ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortOrder === "asc" ? 1 : -1;
    }

    return 0;
  });
};
