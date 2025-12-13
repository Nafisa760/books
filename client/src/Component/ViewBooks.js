import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, Button, Input, FormGroup, Label } from "reactstrap";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const username = localStorage.getItem("username"); // Make sure username is stored on login

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      const res = await axios.post("http://localhost:3001/borrow", { username, bookId });
      if (res.data.success) {
        alert(res.data.message);
      } else {
        alert(res.data.message || "Error borrowing book");
      }
    } catch (err) {
      console.error("Error borrowing book:", err);
      alert("Error borrowing book");
    }
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center">Available Books</h3>

      <FormGroup>
        <Label for="search">Search by Title</Label>
        <Input
          id="search"
          placeholder="Enter book title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </FormGroup>

      <Row>
        {filteredBooks.map((b) => (
          <Col md="4" className="mb-3" key={b._id}>
            <Card className="shadow-sm">
              <CardBody>
                <h5>{b.title}</h5>
                <p>Author: {b.author}</p>
                <p>Year: {b.year}</p>

                <Button color="success" className="mt-2" onClick={() => handleBorrow(b._id)}>
                  Borrow
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewBooks;
