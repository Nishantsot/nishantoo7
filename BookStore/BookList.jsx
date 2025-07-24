import React from "react";
import { Row } from "react-bootstrap";
import BookCard from "./BookCard";

const BookList = ({ books, onPreview }) => {
  return (
    <Row className="mt-4">
      {books.length === 0 ? (
        <p className="text-center w-100">No books found.</p>
      ) : (
        books.map((book) => (
          <BookCard key={book.id} book={book.volumeInfo} onPreview={onPreview} />
        ))
      )}
    </Row>
  );
};

export default BookList;