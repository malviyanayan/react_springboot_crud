import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Alert,
  Spinner,
  ToggleButton,
  ToggleButtonGroup,
  Nav,
} from "react-bootstrap";
import Avatar from "react-avatar";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

/*
  AuthPage.jsx
  - A single-file Login / Register page styled with react-bootstrap.
  - Drop into a React project that already includes bootstrap CSS
    (eg. `import 'bootstrap/dist/css/bootstrap.min.css'` in index.js)
  - Optional props:
      onAuthSuccess(token, user) -> callback fired after successful login/register
  - This component uses `fetch` to POST to `/api/auth/login` and `/api/auth/register` by default.
    Replace those endpoints with your backend routes.
*/

export default function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // "login" or "register"

  // shared state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function updateField(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function validate() {
    setError("");
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return false;
    }
    if (mode === "register") {
      if (!form.name) {
        setError("Please enter your name.");
        return false;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return false;
      }
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // backend should return { message: '...' }
        setError(data.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Expected success shape: { token: '...', user: { name, email, ... } }
      const { token, user, message } = data;

      if (token) {
        // store token (adjust storage strategy to your security needs)
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user || {}));

        setSuccess(mode === "login" ? "Logged in successfully!" : "Account created successfully!");

        if (onAuthSuccess) onAuthSuccess(token, user);

        // optional: redirect to dashboard
        // window.location.href = '/dashboard';
      } else {
        setSuccess(message || "Success (no token provided by server)");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-5 bg-light" id="auth">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 shadow-sm border-0">
              <div className="d-flex align-items-center gap-3 mb-3">
                <Avatar name={form.name || "Guest"} size="56" round />
                <div>
                  <h5 className="mb-0">{mode === "login" ? "Welcome back!" : "Create an account"}</h5>
                  <small className="text-muted">{mode === "login" ? "Login to continue" : "Join and build cool projects"}</small>
                </div>
                <div className="ms-auto">
                  <ToggleButtonGroup type="radio" name="modes" defaultValue={mode}>
                    <ToggleButton
                      id="t-login"
                      type="radio"
                      variant={mode === "login" ? "primary" : "outline-primary"}
                      onClick={() => setMode("login")}
                    >
                      Login
                    </ToggleButton>
                    <ToggleButton
                      id="t-register"
                      type="radio"
                      variant={mode === "register" ? "primary" : "outline-primary"}
                      onClick={() => setMode("register")}
                    >
                      Register
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>

              {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" onClose={() => setSuccess("")} dismissible>
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {mode === "register" && (
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <User size={16} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Mail size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Lock size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) => updateField("password", e.target.value)}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword((s) => !s)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {mode === "register" && (
                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <Lock size={16} />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={form.confirmPassword}
                        onChange={(e) => updateField("confirmPassword", e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                )}

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden /> Processing...
                      </>
                    ) : mode === "login" ? (
                      "Login"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>

                <div className="text-center mt-3">
                  {mode === "login" ? (
                    <small>
                      Don't have an account?{' '}
                      <Button variant="link" onClick={() => setMode("register")}>
                        Create one
                      </Button>
                    </small>
                  ) : (
                    <small>
                      Already have an account?{' '}
                      <Button variant="link" onClick={() => setMode("login")}>
                        Login
                      </Button>
                    </small>
                  )}
                </div>
              </Form>

              <hr />

              <div className="text-center">
                <small className="text-muted">Or use social sign-in (placeholder)</small>
                <div className="mt-2 d-flex justify-content-center gap-2">
                  <Button variant="outline-primary" size="sm">Continue with Google</Button>
                  <Button variant="outline-dark" size="sm">Continue with GitHub</Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
