
import React, { FormEvent, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import InputField from '../components/InputField';
import Map from '../components/SetProfileMap';

export default function SetProfileView() {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const [formErrors, setFormErrors] = useState<{[key:string]:string}>({});

  const handleSubmit = (event: FormEvent) => {
    console.log('is in handleSubmit');
    event.preventDefault();
    const name = nameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const errors: {[key:string]:string} = {};

    if (!name) {
      errors.name = "Name must not be empty"
    }
    if (!lastName) {
      errors.lastName = "Last name must not be empty"
    }
    setFormErrors(errors);
    if(Object.keys(errors).length >0) {
      return;
    }
    if (name && lastName) {
      console.log('add functionality to update profile here');
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Set up Profile</h2>
          <Form onSubmit={handleSubmit}>
            <InputField
              name="name"
              label='Name'
              type='text'
              fieldref={nameRef}
              error={formErrors.name}
            />
            <InputField
              name="lastName"
              label='Last Name'
              type='text'
              fieldref={lastNameRef}
              error={formErrors.lastName}
            />
          </Form>
          <Map />
          <Button type="submit" className="w-100" >Submit</Button>
        </Card.Body>
      </Card>
    </>
  )
}
