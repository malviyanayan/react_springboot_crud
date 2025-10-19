import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <Container>
        <p className="mb-1">© {new Date().getFullYear()} Day Planner. All rights reserved.</p>
        <small>Built with ❤️ using React & Bootstrap</small>
      </Container>
    </footer>
  );
}
