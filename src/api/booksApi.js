const API_KEY = process.env.REACT_APP_NYT_API_KEY || "YOUR_NYT_API_KEY";

const API_URL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`;

export async function fetchBooksApi() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`NYT API error: ${response.status}`);
  }

  const data = await response.json();
  const books = data?.results?.books || [];

  return books.map((book) => ({
    id: book.primary_isbn13 || book.primary_isbn10 || book.title,
    title: book.title || "",
    author: book.author || "",
    publisher: book.publisher || "",
    isbn: book.primary_isbn13 || book.primary_isbn10 || book.isbn13 || "",
  }));
}
