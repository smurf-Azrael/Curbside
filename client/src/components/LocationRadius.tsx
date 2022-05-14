// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import InputField from './InputField';
import Button from 'react-bootstrap/Button';
import Map from './SetProfileMap';

export default function LocationRadius({ locationIsVisible, closeLocationModal }: { [key: string]: any }) {
  const [radius, setRadius] = useState(25);
  const [position, setPosition] = useState({ lat: 50, lng: 10 });
  const [locationResult, setLocationResult] = useState({});
  const [clickPosition, setClickPosition] = useState({})

  const locationField = useRef<HTMLInputElement>(null);

  function pressEnter(event) {
    if (event.key === 'Enter') {
      getCityInformation(locationField.current?.value)
    }
  }

  const urlSearch = 'https://nominatim.openstreetmap.org/search?format=json&q='

  async function getCityInformation(query) {
    const selectedPlace = await fetch(urlSearch + query)
      .then(res => res.json())
      .then(res => formatResponse(res))
      .then(res => (
        setLocationResult({
          location: res.display_name,
          lat: res.lat,
          lng: res.lon
        })
      ))
  }

  function formatResponse(response) {
    let selectedPlace = response.filter(el => (el.type === 'city' || el.type === 'village'))[0];
    if (!selectedPlace) {
      selectedPlace = response[0];
    }
    return selectedPlace;
  }

  useEffect(() => {
    const urlSearch = 'https://nominatim.openstreetmap.org/search?format=json&q='
    if (clickPosition && clickPosition.lat) {
      const response = async () => {
        const latCopy = clickPosition.lat.toString();
        const lngCopy = clickPosition.lng.toString();
        const positionLessAccurate = [
          latCopy.slice(0, latCopy.indexOf('.') + 5),
          lngCopy.slice(0, lngCopy.indexOf('.') + 5)
        ]
        await fetch(urlSearch + positionLessAccurate.join(','))
          .then(res => res.json())
          .then(res => formatResponse(res))
          .then(res => (
            locationField.current.value = res.display_name
          ))
          .then(() => setPosition(clickPosition));
      };
      response();
    }
  }, [clickPosition])

  useEffect(() => {
    if (locationResult.lat && locationResult.lng) {
      setPosition({ lat: locationResult.lat, lng: locationResult.lng })
    }
  }, [locationResult])

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
                onChange={e => setRadius(e.target.value < 1 ? '1' : e.target.value)}
              />
            </Col>
            <Col xs="3">
              <InputGroup className="mb-3">
                <FormControl
                  value={radius}
                  onChange={e => setRadius(e.target.value < 1 ? '1' : e.target.value)}
                />
                <InputGroup.Text style={{ marginRight: '0' }} id="basic-addon2">km</InputGroup.Text>
              </InputGroup>
              {/* <Form.Control
                value={radius+'  km'}
                onChange={e => setRadius(e.target.value.slice(0, e.target.value.length-4))} /> */}
            </Col>
          </Form.Group>
        </Form>

        <Map position={position} setPosition={setClickPosition} radius={radius} />


      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={closeLocationModal}>Save</Button>
      </Modal.Footer>

    </Modal>
  )


}
