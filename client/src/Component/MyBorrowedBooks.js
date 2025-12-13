import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, CardBody, Button, Input } from "reactstrap";
import { fetchBorrowedBooks, returnBook } from "../Features/BorrowedBookModelSlice";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();

  const username = localStorage.getItem("username");

  const { borrowedBooks, loading: isLoading, error } = useSelector(state => state.borrowed);

  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // جلب الكتب المقترضة عند تحميل الصفحة
  useEffect(() => {
    if (username) dispatch(fetchBorrowedBooks(username));
  }, [dispatch, username]);

  // إعداد قيم ratings و feedback لكل كتاب
  useEffect(() => {
    const r = {};
    const f = {};

    borrowedBooks.forEach(b => {
      if (b.book) {
        r[b.book._id] = b.rating || 0;
        f[b.book._id] = b.feedback || "";
      }
    });

    setRatings(r);
    setFeedbacks(f);
  }, [borrowedBooks]);

  // التعامل مع إرجاع الكتاب
  const handleReturn = async (borrowedId, bookId) => {
    const rating = ratings[bookId] || 0;
    const feedback = feedbacks[bookId] || "";

    // إرسال _id لكل borrowedBook
    await dispatch(returnBook({ _id: borrowedId, rating, feedback }));

    // حذف الكتاب مباشرة من الصفحة
    setSuccessMessage("✔️ Successfully returned!");

    // إعادة تحميل الكتب غير المرجعة بعد نصف ثانية لتحديث الصفحة
    setTimeout(() => {
      dispatch(fetchBorrowedBooks(username));
    }, 500);
  };

  return (
    <Container className="py-4">
      {successMessage && (
        <div className="alert alert-success text-center fw-bold">
          {successMessage}
        </div>
      )}

      <h3 className="mb-4 text-center">My Borrowed Books</h3>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <Row>
        {borrowedBooks.length === 0 && !isLoading && (
          <p className="text-center">You have no borrowed books.</p>
        )}

        {borrowedBooks.map(b => {
          if (!b.book) return null;

          const isReturned = !!b.returnedAt;

          return (
            <Col md="4" className="mb-3" key={b._id}>
              <Card className="shadow-sm">
                <CardBody>
                  <h5>{b.book.title}</h5>
                  <p>Author: {b.book.author}</p>
                  <p>Year: {b.book.year}</p>

                  <p>Borrowed At: {new Date(b.borrowedAt).toLocaleDateString()}</p>
                  {b.returnedAt && (
                    <p>Returned At: {new Date(b.returnedAt).toLocaleDateString()}</p>
                  )}

                  {/* Rating */}
                  <div className="mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        style={{
                          cursor: isReturned ? "not-allowed" : "pointer",
                          color: star <= (ratings[b.book._id] || 0) ? "gold" : "gray",
                          fontSize: "1.2rem",
                          marginRight: "3px"
                        }}
                        onClick={() =>
                          !isReturned &&
                          setRatings(prev => ({ ...prev, [b.book._id]: star }))
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Feedback */}
                  <Input
                    type="textarea"
                    placeholder="Leave feedback"
                    value={feedbacks[b.book._id] || ""}
                    disabled={isReturned}
                    onChange={e =>
                      !isReturned &&
                      setFeedbacks(prev => ({
                        ...prev,
                        [b.book._id]: e.target.value,
                      }))
                    }
                    className="mb-2"
                  />

                  {/* زر الإرجاع */}
                  {!isReturned && (
                    <Button
                      color="success"
                      onClick={() => handleReturn(b._id, b.book._id)}
                    >
                      Return Book
                    </Button>
                  )}
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MyBorrowedBooks;
