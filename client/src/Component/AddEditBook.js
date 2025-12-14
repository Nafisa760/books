
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Spinner,
  Alert,
} from "reactstrap";
import { addBook, editBook, fetchBooks, resetBookState } from "../Features/BookSlice";

const AddEditBook = () => {
  const [params] = useSearchParams();
  const bookId = params.get("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { books, isLoading, isError, errorMessage, isSuccess } = useSelector(
    (state) => state.books
  );

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
  });

  
  useEffect(() => {
    if (bookId && books.length > 0) {
      const bookToEdit = books.find((b) => b._id === bookId);
      if (bookToEdit) {
        setForm({
          title: bookToEdit.title,
          author: bookToEdit.author,
          year: bookToEdit.year,
        });
      }
    }
  }, [bookId, books]);

  
  useEffect(() => {
    if (books.length === 0) dispatch(fetchBooks());
  }, [books.length, dispatch]);

  
  useEffect(() => {
    return () => {
      dispatch(resetBookState());
    };
  }, [dispatch]);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (bookId) {
      dispatch(editBook({ id: bookId, ...form }));
    } else {
      dispatch(addBook(form));
    }
  };

  
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin"); 
    }
  }, [isSuccess, navigate]);

  return (
    <Container className="py-4">
      <Card className="shadow p-3">
        <CardBody>
          <h3 className="text-center mb-4">
            {bookId ? "Edit Book" : "Add New Book"}
          </h3>

          {isError && <Alert color="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Book Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Author</Label>
              <Input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Year of Composition</Label>
              <Input
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                required
              />
            </FormGroup>

            <Button color="success" className="w-100 mt-3" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : bookId ? "Update Book" : "Save Book"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AddEditBook;
