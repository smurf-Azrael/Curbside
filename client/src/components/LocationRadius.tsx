// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import InputField from './InputField';
import SimpleMap from './SimpleMap';
import Button from 'react-bootstrap/Button';
import Map from './SetProfileMap';

export default function LocationRadius({ locationIsVisible, closeLocationModal }: { [key: string]: any }) {
  const [radius, setRadius] = useState(25);
  const [position, setPosition] = useState({ lat: 50, lng: 10 });
  const [locationResult, setLocationResult] = useState({});

  const locationField = useRef<HTMLInputElement>(null);
  function pressEnter(event) {
    console.log('key', event.key)
    if (event.key === 'Enter') {
      console.log('value ref', locationField.current?.value);
      getCityInformation(locationField.current?.value)
    }
  }

  async function getCityInformation(query) {
    console.log('getCityInformation')
    const urlSearch = 'https://nominatim.openstreetmap.org/search?format=json&q='
    const response = await fetch(urlSearch + query).then(res => res.json());
    formatResponse(response);
  }

  function formatResponse(response) {
    console.log('formatResponse')
    let selectedPlace = response.filter(el => (el.type === 'city' || el.type === 'village'))[0];
    if (!selectedPlace) {
      selectedPlace = response[0]
    }
    setLocationResult({
      location: selectedPlace.display_name,
      lat: selectedPlace.lat,
      lng: selectedPlace.lon
    })
  }

  useEffect(() => {
    if (locationResult.lat && locationResult.lng) {
      setPosition({ lat: locationResult.lat, lng: locationResult.lng })
    }
  }, [locationResult])

  console.log('radius', radius)

  return (
    <Modal show={locationIsVisible} onHide={closeLocationModal}>
      <Modal.Header closeButton>Location & Radius</Modal.Header>
      <Modal.Body className="filter-frame" >

        <InputField
          name="location"
          label='Location'
          type='location'
          fieldref={locationField}
          onKeyPress={e => pressEnter(e)}
        />


        <Form>
          <Form.Group as={Row}>
            <Col xs="9">
              <RangeSlider
                value={radius}
                onChange={e => setRadius(e.target.value<1 ? '1' : e.target.value)}
              />
            </Col>
            <Col xs="3">
              <InputGroup className="mb-3">
                <FormControl
                  value={radius}
                  onChange={e => setRadius(e.target.value<1 ? '1' : e.target.value)}
                />
                <InputGroup.Text style={{marginRight: '0'}} id="basic-addon2">km</InputGroup.Text>
              </InputGroup>
              {/* <Form.Control
                value={radius+'  km'}
                onChange={e => setRadius(e.target.value.slice(0, e.target.value.length-4))} /> */}
            </Col>
          </Form.Group>
        </Form>

        <Map position={position} setPosition={setPosition} radius={radius} />


      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={closeLocationModal}>Save</Button>
      </Modal.Footer>

    </Modal>
  )


}
