import React from 'react';
import { Container } from 'react-bootstrap';
import Login from '../components/Login';
import Header from '../components/Header';
import '../styling/Authentication.css';

export default function LoginView() {
  return (
    <>
      <Header />
      <div className='form-container' >
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ margin: "auto" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }} >
            <Login />
          </div>
        </Container>
      </div>
    </>
  )
}
