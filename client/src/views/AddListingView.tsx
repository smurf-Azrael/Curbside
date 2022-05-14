import { useRef, useState, useEffect, FormEvent } from 'react';
import InputField from '../components/InputField';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiProvider';
import { useNavigate } from 'react-router-dom';
// import '../styling/AddListingView.scss';
import '../styling/AddListingView.scss'
import ButtonWide from '../components/ButtonWide';
import { FormSelect, Form } from 'react-bootstrap';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import AppBody from '../components/AppBody';



export default function AddListingView() {
  const titleField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLInputElement>(null);
  const conditionField = useRef<HTMLSelectElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const photoField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleFileSelect = (event: any): void => {
    console.log('called');
    console.log(event.target.files);
    setFiles(event.target.files);
  };

  const api = useApi();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [navigate, currentUser]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const title = titleField.current?.value;
    const description = descriptionField.current?.value;
    const condition = conditionField.current?.value;
    const price = priceField.current?.value;
    const errors: { [key: string]: string } = {};
    if (!title) {
      errors.title = 'Title is required';
    }
    if (!description) {
      errors.description = 'Description is required';
    }
    if (!price) {
      errors.price = 'Price is required';
    }
    if (files.length === 0) {
      errors.photos = 'Please upload at least one photo';
    }
    const urls: string[] = [];
    for (let file of files) {
      // @ts-ignore
      const imageRef = ref(storage, `images/${currentUser?.id}-${file.name}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      urls.push(url);
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    const priceInCents = parseFloat(price as string) * 100;
    const newListing = {
      userId: currentUser?.id,
      currency: 'eur',
      photoUrls: urls,
      latitude: 52.52,
      longitude: 13.405,
      title,
      description,
      condition,
      priceInCents,
      tags: '',
    };

    const res = await api.post('/listings', newListing);
    if (res.ok) {
      navigate('/');
    } else {
      //should have errors
      console.log('ERRRORR');
    }
  };

  return (
    <AppBody>
      <div className="AddListingView">
        <div className="body-frame-padding">
          <form onSubmit={onSubmit}>
            <h3 className="form-title">List an item</h3>
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
            <div style={{ marginBottom: '15px' }}>
              <Form.Group>
                <FormSelect ref={conditionField}>
                  <option value="new">New</option>
                  <option value="gentlyUsed">Gently Used</option>
                  <option value="used">Used</option>
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
              fieldref={descriptionField}
              as="textarea"
            />

            <InputField
              name="photos"
              type="file"
              multiple={true}
              placeholder="Photos"
              label="Photos"
              error={formErrors.photos}
              fieldref={photoField}
              onChange={(e) => handleFileSelect(e)}
            />

            {/* <div className='location-div-container'>
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
              </div> */}

            <div className="add-item-buttons">
              {/* <button type="submit" style={{ border: 'none', padding: '0' }}> */}
              <ButtonWide type={'submit'} content={'Create'} fill={true} />
              {/* </button> */}
              <ButtonWide clickFunction={() => navigate('/')} content={'Cancel'} fill={false} />
            </div>
          </form>

        </div>
        <div className="body-footer-container">
        </div>
      </div>
    </AppBody>
  );
}
