// @ts-nocheck
import { useRef, useState } from "react"
import InputField from "../components/InputField"
import { useApi } from "../contexts/ApiProvider";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styling/AddListingView.css';
import ButtonWide from "../components/ButtonWide";
import { FormEvent, FormSelect, Form } from "react-bootstrap";

export default function AddListingView() {
  const titleField = useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const conditionField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLTextAreaElement>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const api = useApi();
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const title = titleField.current?.value;
    const description = descriptionField.current?.value;
    const condition = conditionField.current?.value;
    const price = priceField.current?.value;

    const errors: { [key: string]: string } = {}
    if (!title) {
      errors.title = 'Title is required'
    }
    if (!description) {
      errors.description = 'Description is required'
    }
    if (!price) {
      errors.price = 'Price is required'
    }

    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      return;
    }
    const priceInCents = parseFloat(price as string) * 100;

    const newListing = {
      userId: '4f4442a7-aa22-490b-9945-34763d9fa0d9',
      currency: 'eur',
      photoUrls: [
        'https://secure.img1-ag.wfcdn.com/im/54089193/resize-h600-w600%5Ecompr-r85/1231/123110031/Daulton+20%27%27+Wide+Velvet+Side+Chair.jpg',
        "https://images.unsplash.com/photo-1611464908623-07f19927264e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW4lMjBjaGFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1571977796766-578d484a6c25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JlZW4lMjBjaGFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
      ],
      longitude: 52.5200,
      latitude: 13.4050,
      title, description, condition, priceInCents,
    }

    const res = await api.post('/listings', newListing);
    if (res.ok) {
      navigate('/explore')
    } else {
      //should have errors
      console.log('ERRRORR')
    }

  }


  return (
    <div className="body-page" >
      <Header />
      <div className="body-content-background">
        <div className="body-frame">
          <div className="body-frame-padding">
            <form onSubmit={onSubmit}>
              <h3 className='form-title' >List an item</h3>
              <InputField
                name="title"
                placeholder="title"
                label="Title"
                error={formErrors.title}
                fieldref={titleField}
              />
              <InputField
                name="price"
                placeholder="Price"
                type="number"
                min={0}
                step="any"
                label="Price"
                error={formErrors.price}
                fieldref={priceField}
              />
              <p style={{ justifyContent: 'flex-start', marginBottom: '10px' }}>Condition</p>
              <div style={{marginBottom: '15px'}}>

                <Form.Group>
                  <FormSelect >
                    <option value='closest'>New</option>
                    <option value='newest'>Gently Used</option>
                    <option value='price asc'>Used</option>
                  </FormSelect>
                </Form.Group>

                <p>{formErrors.condition}</p>
              </div>
              <InputField
                name="description"
                placeholder="Description"
                min={0}
                label="Description"
                error={formErrors.description}
                fieldref={priceField}
              />
              <div className='location-div-container'>
                <div className='location-input-div'>
                  <InputField
                    name="location"
                    placeholder="Location"
                    label="Location"
                    error={formErrors.location}
                  // fieldref={locationField}
                  />
                </div>
                <div className='location-picker-btn-div'>
                  <button className='location-picker-btn'>
                    <i className="bi bi-geo-fill"></i>
                  </button>
                </div>
              </div>
              <div className="add-item-buttons">
                <button type='submit' style={{border:'none', padding:'0'}}>
                  <ButtonWide content={"Create"} fill={true} />
                </button>
                <ButtonWide clickFunction={() => navigate('/')} content={"Cancel"} fill={false} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='body-footer-container'>
        <Footer />
      </div>
    </div>
  )
}