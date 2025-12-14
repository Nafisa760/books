import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, CardBody, Input } from "reactstrap";
import { fetchAllBorrowedBooks } from "../Features/BorrowedBookModelSlice";

const BorrowedList = () => {
  const dispatch = useDispatch();
  const { borrowedBooks, loading, error } = useSelector(state => state.borrowed);
  const [search, setSearch] = useState("");

<<<<<<< HEAD
  useEffect(() => { dispatch(fetchAllBorrowedBooks()); }, [dispatch]);
=======
  // جلب جميع الكتب المقترضة عند تحميل الصفحة
  useEffect(() => {
    dispatch(fetchAllBorrowedBooks());
  }, [dispatch]);
>>>>>>> 2f2a94abfe466f32fd3545f4605f5ce20fa52451

  // فلترة الكتب بناء على البحث
  const filteredBooks = borrowedBooks.filter(
    b =>
      b.bookId?.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.studentUsername?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center">Borrowed Books List (Admin)</h3>
      <Input
        placeholder="Search by student or book title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-3"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
<<<<<<< HEAD
      {!loading && filteredBooks.length === 0 && <p className="text-center">No borrowed books found.</p>}

      <Row>
{borrowedBooks.map(b => (
  <Col md="4" key={b._id} className="mb-3">
    <Card className="shadow-sm">
      <CardBody>
        <h5>{b.bookId?.title || "Unknown Title"}</h5>
        <p>Author: {b.bookId?.author || "-"}</p>
        <p>Year: {b.bookId?.year || "-"}</p>
        <p>Student: {b.studentUsername}</p>
        <p>Borrowed At: {new Date(b.borrowedAt).toLocaleString()}</p>
        {b.returnedAt && <p>Returned At: {new Date(b.returnedAt).toLocaleString()}</p>}
        <p>Rating: {b.rating || "-"}</p>
        <p>Feedback: {b.feedback || "-"}</p>
      </CardBody>
    </Card>
  </Col>
))}

=======
      {!loading && filteredBooks.length === 0 && (
        <p className="text-center">No borrowed books found.</p>
      )}

      <Row>
        {filteredBooks.map(b => (
          <Col md="4" key={b._id} className="mb-3">
            <Card className="shadow-sm">
              <CardBody>
                <h5>{b.bookId?.title || "Unknown Title"}</h5>
                <p>Author: {b.bookId?.author || "-"}</p>
                <p>Year: {b.bookId?.year || "-"}</p>
                <p>Student: {b.studentUsername}</p>
                <p>Borrowed At: {b.borrowedAt ? new Date(b.borrowedAt).toLocaleString() : "-"}</p>
                {b.returnedAt && <p>Returned At: {new Date(b.returnedAt).toLocaleString()}</p>}
                <p>Rating: {b.rating || "-"}</p>
                <p>Feedback: {b.feedback || "-"}</p>
              </CardBody>
            </Card>
          </Col>
        ))}
>>>>>>> 2f2a94abfe466f32fd3545f4605f5ce20fa52451
      </Row>
    </Container>
  );
};

export default BorrowedList;
