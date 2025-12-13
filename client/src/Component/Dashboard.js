import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import student from "../images/student.png";
import Location from "./Location";
import { Container } from "reactstrap";
import { fetchBooks } from "../Features/BookSlice";
import { fetchBorrowedBooks } from "../Features/BorrowedBookModelSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  // ✅ Books state
  const books = useSelector((state) => state.books.books);
  const booksLoading = useSelector((state) => state.books.isLoading);
  const booksError = useSelector((state) => state.books.isError);

  // ✅ BorrowedBooks state (تعديل هنا)
  const borrowed = useSelector((state) => state.borrowed.borrowedBooks);
  const borrowedLoading = useSelector((state) => state.borrowed.loading);
  const borrowedError = useSelector((state) => state.borrowed.error);

  // Fetch data on mount or user change
  useEffect(() => {
    dispatch(fetchBooks());

    if (user && user.username) {
      dispatch(fetchBorrowedBooks(user.username));
    }
  }, [dispatch, user]);

  // Optional: Refresh borrowed books every 10 seconds
  useEffect(() => {
    if (!user?.username) return;
    const interval = setInterval(() => {
      dispatch(fetchBorrowedBooks(user.username));
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, user]);

  return (
    <Container className="py-4">
      <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
        {/* User info */}
        <div style={{ textAlign: "center" }}>
          <img
            src={student}
            alt="user"
            style={{ width: "120px", borderRadius: "50%", marginBottom: "10px" }}
          />
          <h4>
            Welcome, {user?.fullName || localStorage.getItem("username") || "Guest"}!
          </h4>
          <div className="mt-3">
            <Location />
          </div>
        </div>

        {/* Books statistics */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              minWidth: "150px",
            }}
          >
            <h5>Total Books</h5>
            {booksLoading ? <h2>Loading...</h2> : booksError ? <h2>Error</h2> : <h2>{books.length}</h2>}
          </div>

          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              minWidth: "150px",
            }}
          >
            <h5>Borrowed Books</h5>
            {borrowedLoading ? (
              <h2>Loading...</h2>
            ) : borrowedError ? (
              <h2>Error</h2>
            ) : (
              <h2>{borrowed?.length ?? 0}</h2>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
