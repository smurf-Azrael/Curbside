import React from 'react';
import Signup from './../components/Signup';
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonSmall from "../components/ButtonSmall";
import Footer from "../components/Footer";
import Header from '../components/Header';
import '../styling/Authentication.css';

export default function SignupView() {

  return (
    <>
      <Header />
      <div className="form-container" >
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ margin: "auto" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }} >
            <Signup />
          </div>
        </Container>
      </div>
    </>
  )
}
