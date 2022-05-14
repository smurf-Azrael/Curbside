import React from 'react';
import { Container } from 'react-bootstrap';
import Login from '../components/Login';
import Header from '../components/Header';
import '../styling/Authentication.scss';
import AppBody from '../components/AppBody';

export default function LoginView() {
  return (
    <AppBody>
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
    </AppBody>
  )
}
