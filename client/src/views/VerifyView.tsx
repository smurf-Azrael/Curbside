import React, { useState } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function VerifyView() {
  const [error, setError] = useState("");
  const { currentUser, sendVerificationAgain } = useAuth();
  async function handleClick() {
    await sendVerificationAgain();
  }
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Verify Email</h2>
            <strong>Email: </strong>{currentUser.email}
            <Button
              onClick={handleClick}
              type="submit"
              className="w-100"
              style={{ marginTop: "20px" }}
            >Send verification email again
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}
