import React from "react";
import studentImage from "../images/student.png"; // صورة تمثيلية للكتب

// دوال مساعدة
export const sum = (a, b) => a + b;
export const greetUser = (name) => `Hello, ${name}!`;
export const currentUser = { username: "nafisa987", role: "student" };
export const bookGenres = ["Fiction", "Science", "History"];
export const isAvailable = (copies) => copies > 0;

// capitalize first letter
export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// reverse a string
export const reverseString = (text) => text.split("").reverse().join("");

// simple math utilities
export const mathOps = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
};



const About1 = () => {
  return (
    <div>
      <h2>About This Book Management Project</h2>
      <p>This project manages borrowed books for students and admin users.</p>
      <p>
        Students can view their borrowed books and leave ratings/feedback. Admins
        can see all borrowed books and manage the system.
      </p>
      <img src={studentImage} alt="projectimage" className="projectImage" />
      <button>Contact Developer</button>
    </div>
  );
};

export default About1;
