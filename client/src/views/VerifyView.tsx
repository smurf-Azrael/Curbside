import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { reload } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function VerifyView() {
  const [error, setError, ] = useState("");
  const { currentUser, sendVerification } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  async function handleClick() {
    await sendVerification(currentUser)
      .then((e:any) => console.log('eee', e))
      .catch((e:any) => console.log('error', e));
    setEmailSent(true);
    const checkingUser = setInterval(async () => {
      const user = await reload(currentUser);
      console.log('user interval');
      console.log(user);
      console.log('INTERVAL');
      if (currentUser.user.multiFactor.user.accessToken){
        clearInterval(checkingUser)
        navigate("/");
      }
    }, 3000)
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
            >Send verification email {emailSent ? "again" : ""}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}
