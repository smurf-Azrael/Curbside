import { Form, FormSelect } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {
  Autocomplete,
  TextField,
  FormControl,
} from '@mui/material';
import AutoCompleteSearch from './AutoCompleteSearch';
import '../styling/FiltersComponents.css';

export default function FiltersComponent({ filtersAreVisible, closeFiltersModal, applyFilters, fields }: { [key: string]: any }) {
  return (
    <>
      <Modal show={filtersAreVisible} onHide={closeFiltersModal}>
        <Modal.Header closeButton>Filters</Modal.Header>
        <Modal.Body className="filter-frame" >
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <FormSelect ref={fields.sortByField}>
              <option value='closest'>Closest</option>
              <option value='newest'>Newest</option>
              <option value='price asc'>Price Asc</option>
              <option value='price desc'>Price Desc</option>
            </FormSelect>
          </Form.Group>
          <Form.Group>
            <Form.Label>Condition</Form.Label>
            <FormSelect ref={fields.conditionField}>
              <option value='all'>All</option>
              <option value='new'>New</option>
              <option value='gently used'>Gently Used</option>
              <option value='used'>Used</option>
            </FormSelect>
          </Form.Group>

          {/* <Dropdown>
            <Dropdown.Toggle>Categories</Dropdown.Toggle>
          </Dropdown> */}

          <Form.Group className="auto-complete-search-frame">
            <Form.Label> Category </Form.Label>
            <FormControl>
              {/* <AutoCompleteSearch /> */}

              {/* <Autocomplete
                size="small"
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={['hey', 'hello', 'good morning', 'good night']}
                getOptionLabel={(option) => option}
                // defaultValue={['hey', 'hello']}
                renderInput={(params) => (
                  <TextField {...params}  placeholder="Favorites" />
                  )}
                  sx={{ width: '450px' }}
                  /> */}


            </FormControl>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={applyFilters}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}