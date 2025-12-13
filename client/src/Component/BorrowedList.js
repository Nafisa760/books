import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, CardBody, Input } from "reactstrap";
import { fetchAllBorrowedBooks } from "../Features/BorrowedBookModelSlice";

const BorrowedList = () => {
  const dispatch = useDispatch();
  const { borrowedBooks, loading, error } = useSelector(state => state.borrowed);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllBorrowedBooks());
  }, [dispatch]);
  

  const filteredBooks = borrowedBooks.filter(
    b =>
      b.book?.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.studentUsername?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center">Borrowed Books List (Admin)</h3>

      <Input
        placeholder="Search by student or book title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {filteredBooks.length === 0 && !loading && <p>No borrowed books found.</p>}

      <Row>
        {filteredBooks.map(b => (
          <Col md="4" key={b._id} className="mb-3">
            <Card className="shadow-sm">
              <CardBody>
                <h5>{b.book?.title}</h5>
                <p>Author: {b.book?.author}</p>
                <p>Year: {b.book?.year}</p>
                <p>Student: {b.studentUsername}</p>
                <p>Borrowed At: {new Date(b.borrowedAt).toLocaleString()}</p>
                {b.returnedAt && <p>Returned At: {new Date(b.returnedAt).toLocaleString()}</p>}
                <p>Rating: {b.rating || "-"}</p>
                <p>Feedback: {b.feedback || "-"}</p>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BorrowedList;
