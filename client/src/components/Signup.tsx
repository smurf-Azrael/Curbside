// @ts-nocheck
import React, { ChangeEvent, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import InputField from './InputField';
import { useAuth } from '../contexts/AuthContext';


export default function Signup() {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = React.useRef<HTMLInputElement | null>(null);
  const [formErrors, setFormErrors] = useState({})
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
    setFormErrors({});
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = passwordConfirmRef.current.value;
    const errors = {};

    if (!email) {
      errors.email = "Email must not be empty"
    }
    if (!password) {
      errors.password = "Password must not be empty"
    }
    if (password !== confirmPassword) {
      errors.password2 = "Passwords don't match"
    }
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) {
      return;
    }
    // if (emailRef.current.value && passwordRef.current.value) {
    try {
      setFormErrors({});
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value)
    } catch {
      setFormErrors({signUpError : "Failed to create an account"})
    }
    setLoading(false);
    // }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          <Form.Text className={'text-danger'}>{formErrors.signUpError}</Form.Text>
          <Form onSubmit={handleSubmit}>
            <InputField
              name="email"
              label='Email'
              type='email'
              fieldref={emailRef}
              error={formErrors.email}
            />
            <InputField
              name="password"
              label='Password'
              type='password'
              fieldref={passwordRef}
              error={formErrors.password}
            />
            <InputField
              name="password2"
              label='Confirm Password'
              type='password'
              fieldref={passwordConfirmRef}
              error={formErrors.password2}
            />
            <Button disabled={loading} type="submit" className="w-100" >Sign up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log in
      </div>
    </>
  )
}
