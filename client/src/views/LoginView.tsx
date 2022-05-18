import React from 'react';
import { Container } from 'react-bootstrap';
import Login from '../components/Login';
import '../styling/Authentication.scss';
import Header from '../components/Header';

export default function LoginView() {
  return (
    <>
      <Header buttonFree />
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
