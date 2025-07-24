// src/components/BookFeedback.jsx
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const BookFeedback = ({ bookId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`feedback-${bookId}`)) || [];
    setFeedbackList(saved);
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFeedback = { rating, comment, time: new Date().toLocaleString() };
    const updated = [newFeedback, ...feedbackList];
    setFeedbackList(updated);
    localStorage.setItem(`feedback-${bookId}`, JSON.stringify(updated));
    setRating(0);
    setComment("");
  };

  return (
    <div className="mt-3">
      <h6>Rate & Comment</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value={0}>Select rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} ★
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your thoughts..."
          />
        </Form.Group>
        <Button type="submit" variant="success" size="sm" className="mt-2">
          Submit
        </Button>
      </Form>

      <div className="mt-3">
        <h6>All Feedback</h6>
        {feedbackList.length === 0 ? (
          <p className="text-muted">No comments yet.</p>
        ) : (
          feedbackList.map((f, idx) => (
            <div key={idx} className="mb-2 border p-2 rounded bg-light">
              <strong>{f.rating} ★</strong> <span className="text-muted">({f.time})</span>
              <div>{f.comment}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookFeedback;
