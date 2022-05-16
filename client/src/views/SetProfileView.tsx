
import React, { FormEvent, useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useApi } from '../contexts/ApiProvider';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import Map from '../components/SetProfileMap';
import { useNavigate } from 'react-router-dom';
import '../styling/SetProfileView.scss';
import Header from '../components/Header';
import { User } from '../interfaces/User'

export default function SetProfileView() {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const [formErrors, setFormErrors] = useState<{[key:string]:string}>({});
  const [user, setUser] = useState<User>();
  const [position, setPosition] = useState({lng:13.405, lat:52.52})

  const api = useApi();
  const {currentUser} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  useEffect(() => {
    const loadUserData = async () => {
      const res = await api.get(`/users/${currentUser!.id}`);
      if (res.ok) {
        setUser(res.body.data.user);
        setPosition({lng:res.body.data.user.longitude, lat:res.body.data.user.latitude})
      } else {
        console.log("failing to load user listing data");
        navigate('/')
        // handleErrors
      }
    };
    loadUserData();
  }, [api, currentUser, navigate])

  async function handleSubmit (event: FormEvent) {
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
      console.log(errors);
      return;
    }
    if (name && lastName) {
      const additionalUserInfo = {
        firstName: name,
        lastName: lastName,
        city: 'Berlin',
        longitude: position.lng,
        latitude:position.lat
      };

      const res = await api.patch(`/users/${currentUser?.id}`, additionalUserInfo);
      if (res.ok) {
        navigate('/')
      } else {
        // Need to add notification to customer
        console.log('ERROR')
      }

    }
  }


  return (
    <>
      {user &&
      <>
        <Header prevRoute />
        <div className="SetProfileView">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-2">Profile Details</h2>
              <Form onSubmit={handleSubmit}>
                <InputField
                  name="name"
                  label='Name'
                  type='text'
                  defaultValue={user ? user.firstName : ''}
                  fieldref={nameRef}
                  error={formErrors.name}
                />
                <InputField
                  name="lastName"
                  label='Last Name'
                  type='text'
                  defaultValue={user ? user.lastName : ''}
                  fieldref={lastNameRef}
                  error={formErrors.lastName}
                />
              <p>Location</p>
              <p className='comment'>Click on the map to select your location</p>
              <Map position={position} setPosition={setPosition}/>
              <p className='comment'>
                This location will be used for the items you sell
              </p>
              <Button type="submit" className="w-100 mb-1 mt-3" >Save</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </>
      }
    </>
  )
}
