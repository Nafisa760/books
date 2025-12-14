import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import libraryImg from "../images/library.jpg"; // استيراد الصورة

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container position-relative text-center text-white">
      
      <img
        src={libraryImg}
        alt="Library"
        className="img-fluid w-100 home-bg"
      />

      
      <div className="home-content position-absolute top-50 start-50 translate-middle">
        <h1 className="display-3 mb-3 fw-bold home-title">Library System</h1>
        <h3 className="mb-4 fst-italic home-subtitle">Welcome to the Library</h3>
        <button
          className="btn btn-primary btn-lg px-5 py-3 shadow-lg home-btn"
          onClick={() => navigate("/login")} 
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
