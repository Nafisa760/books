import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  // Fetch books from backend
  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/books");
      setBooks(res.data);
    } catch (err) {
      console.log("Error fetching books:", err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  // Delete book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/books/${id}`);
      getBooks(); // refresh
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <Card className="shadow p-3">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Books List</h3>

                {/* ADD BOOK BUTTON */}
                <Button color="primary" onClick={() => navigate("/book")}>
                  + Add Book
                </Button>
              </div>

              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {books.map((b, index) => (
                    <tr key={b._id}>
                      <td>{index + 1}</td>
                      <td>{b.title}</td>
                      <td>{b.author}</td>
                      <td>{b.year}</td>

                      <td>
                        <Button
                          color="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/book?id=${b._id}`)}
                        >
                          Edit
                        </Button>

                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => deleteBook(b._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
