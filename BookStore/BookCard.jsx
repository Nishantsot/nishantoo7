import React from "react";

function BookCard({ book, onViewDetails }) {
  const info = book.volumeInfo;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={info.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
          className="card-img-top"
          alt={info.title}
        />
        <div className="card-body">
          <h5 className="card-title">{info.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {info.authors?.join(", ") || "Unknown Author"}
          </h6>
          <p className="card-text">
            {info.description
              ? info.description.slice(0, 100) + "..."
              : "No description available."}
          </p>
          <div className="d-flex justify-content-between">
            <a
              href={info.previewLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-primary"
              onClick={onViewDetails} // Track as recently viewed
            >
              Preview
            </a>
            <button className="btn btn-info" onClick={onViewDetails}>
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
