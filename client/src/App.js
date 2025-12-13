import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Component/Header";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Dashboard from "./Component/Dashboard";
import ViewBooks from "./Component/ViewBooks";
import MyBorrowedBooks from "./Component/MyBorrowedBooks";
import AdminDashboard from "./Component/AdminDashboard";
import AddEditBook from "./Component/AddEditBook";
import BorrowedList from "./Component/BorrowedList";
import Footer from "./Component/Footer";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) setUserRole(role);
  }, []);

  const StudentRoute = ({ children }) =>
    userRole === "student" ? children : <Navigate to="/login" />;

  const AdminRoute = ({ children }) =>
    userRole === "admin" ? children : <Navigate to="/login" />;

  return (
    <Router>
      <Header userRole={userRole} setUserRole={setUserRole} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />

        {/* Student Pages */}
        <Route
          path="/dashboard"
          element={
            <StudentRoute>
              <Dashboard />
            </StudentRoute>
          }
        />
        <Route
          path="/viewbooks"
          element={
            <StudentRoute>
              <ViewBooks />
            </StudentRoute>
          }
        />
        <Route
          path="/myborrowed"
          element={
            <StudentRoute>
              <MyBorrowedBooks />
            </StudentRoute>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/book"
          element={
            <AdminRoute>
              <AddEditBook />
            </AdminRoute>
          }
        />
        <Route
          path="/borrowedlist"
          element={
            <AdminRoute>
              <BorrowedList />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
