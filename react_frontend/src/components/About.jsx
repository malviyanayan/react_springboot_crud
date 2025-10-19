import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <section className="py-5 bg-light" id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/8144/8144424.png"
              alt="About illustration"
              className="img-fluid rounded"
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold mb-3">About Day Planner</h2>
            <p className="text-muted">
              Day Planner is your personal productivity assistant. It helps you
              plan your day smartly, stay organized, and achieve more every day.
              With features like task tracking, reminders, and progress reports,
              you can focus on what truly matters.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
