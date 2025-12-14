import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About1 from "../src/Component/About1";
import React from "react";
import "@testing-library/jest-dom";

import {
  sum,
  greetUser,
  currentUser,
  bookGenres,
  isAvailable,
  capitalize,
  reverseString,
  mathOps,
  
} from "../src/Component/About1";

describe("About1 Component & Utils", () => {
  // Test 1: Render About1 component
  it("should render the About1 component", () => {
    render(<About1 />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  // Test 2: Check if About1 contains project text
  it("should display project description text", () => {
    render(<About1 />);
    expect(screen.getByText(/manages borrowed books/i)).toBeInTheDocument();
  });

  // Test 3: Check if image is present
  it("should render the project image", () => {
    render(<About1 />);
    const img = screen.getByAltText("projectimage");
    expect(img).toHaveClass("projectImage");
  });

  // Test 4: Contact button exists
  it("should display Contact Developer button", () => {
    render(<About1 />);
    expect(screen.getByText("Contact Developer")).toBeTruthy();
  });

  // -------------------------------
  // Utility Functions Tests
  // -------------------------------

  it("sum() should add two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("greetUser() should return greeting message", () => {
    expect(greetUser("Nafisa")).toBe("Hello, Nafisa!");
  });

  it("currentUser object should have correct properties", () => {
    expect(currentUser).toHaveProperty("username");
    expect(currentUser.username).toBe("nafisa987");
  });

  it("bookGenres array should contain 'Fiction'", () => {
    expect(bookGenres).toContain("Fiction");
  });

  it("isAvailable() should correctly check copies", () => {
    expect(isAvailable(3)).toBe(true);
    expect(isAvailable(0)).toBe(false);
  });

  it("capitalize() should capitalize first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("reverseString() should reverse text", () => {
    expect(reverseString("books")).toBe("skoob");
  });

  describe("mathOps object", () => {
    it("adds numbers correctly", () => {
      expect(mathOps.add(4, 5)).toBe(9);
    });

    it("multiplies numbers correctly", () => {
      expect(mathOps.multiply(3, 4)).toBe(12);
    });
  });

});
