import React from "react";
import { Container, Button } from "react-bootstrap";

export default function Hero() {
  return (
    <section className="hero-section bg-light text-center py-5">
      <Container>
        <h1 className="display-4 fw-bold mb-3">Plan Your Day, Stay Ahead!</h1>
        <p className="lead mb-4">
          Organize your tasks, set goals, and boost your productivity with Day Planner.
        </p>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Container>
    </section>
  );
}
