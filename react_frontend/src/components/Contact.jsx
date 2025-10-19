import React from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Contact() {
  return (
    <section className="py-5" id="contact">
      <Container style={{ maxWidth: "600px" }}>
        <h2 className="text-center fw-bold mb-4">Contact Us</h2>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Your message..." />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
}
