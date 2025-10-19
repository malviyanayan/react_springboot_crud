import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { CheckCircle, CalendarDays, AlarmClock } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <CalendarDays size={40} />,
      title: "Smart Scheduling",
      text: "Easily organize your daily tasks, meetings, and reminders in one place.",
    },
    {
      icon: <AlarmClock size={40} />,
      title: "Reminders & Alerts",
      text: "Never miss a task! Get timely alerts for your planned activities.",
    },
    {
      icon: <CheckCircle size={40} />,
      title: "Track Progress",
      text: "Monitor your productivity and achieve your daily goals efficiently.",
    },
  ];

  return (
    <section className="py-5 bg-white" id="features">
      <Container>
        <h2 className="text-center fw-bold mb-4">Key Features</h2>
        <Row className="g-4">
          {features.map((f, i) => (
            <Col md={4} key={i}>
              <Card className="h-100 shadow-sm border-0 text-center p-4">
                <div className="text-primary mb-3">{f.icon}</div>
                <h5>{f.title}</h5>
                <p className="text-muted">{f.text}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
