// @ts-nocheck
import React, { ChangeEvent } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
const emailRef = React.useRef<HTMLInputElement >(null);
const passwordRef = React.useRef<HTMLInputElement | null>(null);
const passwordConfirmRef = React.useRef<HTMLInputElement | null>(null);
const { signUp } = useAuth();

console.log('singup', signUp)


function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
  event.preventDefault();
  if (emailRef.current.value && passwordRef.current.value) {
    signUp(emailRef.current.value, passwordRef.current.value)
  }
}

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          <Form>
            <Form.Group id="email" >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password-confirm" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button type="submit" className="w-100" >Sign up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log in
      </div>
    </>
  )
}
