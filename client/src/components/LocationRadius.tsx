// @ts-nocheck
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, Col, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import InputField from './InputField';
import SimpleMap from './SimpleMap';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';


export default function LocationRadius({ locationIsVisible, closeLocationModal }: { [key: string]: any }) {
  const [value, setValue] = useState(25);
  const [position, setPosition] = useState({ lat: 50, lng: 10 });
  const [singleSelection, setSingleSelection] = useState([]);



  const options = [
    {
      "place_id": 385898,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
      "osm_type": "node",
      "osm_id": 240109189,
      "boundingbox": ["52.3570365", "52.6770365", "13.2288599", "13.5488599"],
      "lat": "52.5170365",
      "lon": "13.3888599",
      "display_name": "Berlin, 10117, Germany",
      "class": "place",
      "type": "city",
      "importance": 0.9875390282491363,
      "icon": "https://nominatim.openstreetmap.org/ui/mapicons//poi_place_city.p.20.png"
    },
    {
      "place_id": 285001329,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
      "osm_type": "relation",
      "osm_id": 62422,
      "boundingbox": ["52.3382448", "52.6755087", "13.088345", "13.7611609"],
      "lat": "52.506934799999996",
      "lon": "13.397482681501469",
      "display_name": "Berlin, Germany",
      "class": "boundary",
      "type": "administrative",
      "importance": 0.9875390282491363,
      "icon": "https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png"
    },
    { "place_id": 42884840, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "node", "osm_id": 3419894993, "boundingbox": ["52.5053817", "52.5153817", "13.4299112", "13.4399112"], "lat": "52.5103817", "lon": "13.4349112", "display_name": "Berlin Ostbahnhof, Mitteltunnel, Friedrichshain, Friedrichshain-Kreuzberg, Berlin, 10243, Germany", "class": "railway", "type": "station", "importance": 0.6454581816511722, "icon": "https://nominatim.openstreetmap.org/ui/mapicons//transport_train_station2.p.20.png" },
    { "place_id": 1082848, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "node", "osm_id": 313826576, "boundingbox": ["52.5033502", "52.5034502", "13.3385873", "13.3386873"], "lat": "52.5034002", "lon": "13.3386373", "display_name": "Berlin, Tauentzienstraße, Charlottenburg, Charlottenburg-Wilmersdorf, Berlin, 10789, Germany", "class": "tourism", "type": "artwork", "importance": 0.4053717591619116, "icon": "https://nominatim.openstreetmap.org/ui/mapicons//tourist_art_gallery2.p.20.png" },
    { "place_id": 283551231, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "relation", "osm_id": 4447, "boundingbox": ["52.5031153", "52.5041953", "13.3507011", "13.3527437"], "lat": "52.503664900000004", "lon": "13.35168136061127", "display_name": "Hotel Berlin, Berlin, 17, Lützowplatz, Botschaftsviertel, Tiergarten, Mitte, Berlin, 10785, Germany", "class": "tourism", "type": "hotel", "importance": 0.381472839091896, "icon": "https://nominatim.openstreetmap.org/ui/mapicons//accommodation_hotel2.p.20.png" },
    { "place_id": 285795487, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "node", "osm_id": 50798110, "boundingbox": ["54.0163605", "54.0563605", "10.4261313", "10.4661313"], "lat": "54.0363605", "lon": "10.4461313", "display_name": "Berlin, Seedorf, Trave-Land, Kreis Segeberg, Schleswig-Holstein, 23823, Germany", "class": "place", "type": "village", "importance": 0.3626514353057295, "icon": "https://nominatim.openstreetmap.org/ui/mapicons//poi_place_village.p.20.png" },
    { "place_id": 117148627, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "way", "osm_id": 68276545, "boundingbox": ["54.4028337", "54.4069751", "9.4192873", "9.4299614"], "lat": "54.4051916", "lon": "9.4248338", "display_name": "Berlin, Potsdam, Klein Bennebek, Kropp-Stapelholm, Schleswig-Flensburg, Schleswig-Holstein, 24848, Germany", "class": "highway", "type": "unclassified", "importance": 0.3 },
    { "place_id": 177323956, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "way", "osm_id": 312630146, "boundingbox": ["52.51086", "52.511186", "13.3155867", "13.3159396"], "lat": "52.5110906", "lon": "13.315751530699703", "display_name": "Dritte Kirche Christi, Wissenschaftler, Berlin, 16, Schillerstraße, Charlottenburg, Charlottenburg-Wilmersdorf, Berlin, 10625, Germany", "class": "amenity", "type": "place_of_worship", "importance": 0.201, "icon": "https://nominatim.openstreetmap.org/ui/mapicons//place_of_worship_unknown3.p.20.png" },
    { "place_id": 4981759, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "node", "osm_id": 622129784, "boundingbox": ["52.4562128", "52.4563128", "13.3211857", "13.3212857"], "lat": "52.4562628", "lon": "13.3212357", "display_name": "Hotel Steglitz International, 2, Albrechtstraße, Steglitz, Steglitz-Zehlendorf, Berlin, 12165, Germany", "class": "tourism", "type": "hotel", "importance": 0.201, "icon": "https://nominatim.openstreetmap.org/ui/mapicons//accommodation_hotel2.p.20.png" },
    { "place_id": 50168057, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "osm_type": "node", "osm_id": 4329873408, "boundingbox": ["52.5201762", "52.5202762", "13.3704374", "13.3705374"], "lat": "52.5202262", "lon": "13.3704874", "display_name": "Berlin, Willy-Brandt-Straße, Tiergarten, Mitte, Berlin, 10557, Germany", "class": "tourism", "type": "artwork", "importance": 0.201, "icon": "https://nominatim.openstreetmap.org/ui/mapicons//tourist_art_gallery2.p.20.png" }]

const optionss = ['1','2','3']


  return (
    <Modal show={locationIsVisible} onHide={closeLocationModal}>
      <Modal.Header closeButton>Location & Radius</Modal.Header>
      <Modal.Body className="filter-frame" >

        {/* <InputField
          name="location"
          label='Location'
          type='location'
        // fieldref={emailRef}
        // error={formErrors.email}
        /> */}


        <Form>


          <Form.Group>
            <Form.Label>Single Selection</Form.Label>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              onChange={setSingleSelection}
              options={options}
              placeholder="Search..."
              selected={singleSelection}
            />
          </Form.Group>


          <Form.Group as={Row}>
            <Col xs="9">
              <RangeSlider
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </Col>
            <Col xs="3">
              <Form.Control
                value={value}
                onChange={e => setValue(e.target.value)} />
            </Col>
          </Form.Group>
        </Form>


        <SimpleMap position={position} />


      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={closeLocationModal}>Save</Button>
      </Modal.Footer>

    </Modal>
  )


}
