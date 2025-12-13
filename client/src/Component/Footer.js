import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} Library System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
