import { useRef, useState, useEffect, FormEvent } from 'react';
import InputField from '../components/InputField';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiProvider';
import { useNavigate } from 'react-router-dom';
import '../styling/AddListingView.scss';
import ButtonWide from '../components/ButtonWide';
import { FormSelect, Form } from 'react-bootstrap';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import AppBody from '../components/AppBody';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';
import AutoCompleteSearch from '../components/AutoCompleteSearch';
import { User } from '../interfaces/User';

export default function AddListingView() {
  const titleField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLInputElement>(null);
  const conditionField = useRef<HTMLSelectElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const photoField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>();
  const [user, setUser] = useState<User>();
  const tags = useRef<string[]>(null);

  const handleFileSelect = (event: any): void => {
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

  useEffect(() => {
    if (currentUser) {
      const loadUserData = async () => {
        const res = await api.get(`/users/${currentUser.id}`);
        if (res.ok) {
          setUser(res.body.data.user);
        } else {
          console.log("failing to load user listing data");
          navigate('/')
          // handleErrors
        }
        setLoading(false);
      };
      loadUserData();
    }
  }, [api, navigate, currentUser]);


  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

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
    setFormErrors(errors);
    const urls: string[] = [];
    if (!errors.title && !errors.description && !errors.price && files.length > 0) {
      for (let file of files) {
        // @ts-ignore
        const imageRef = ref(storage, `images/${currentUser?.id}-${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        urls.push(url);
      }
    }

    if (Object.keys(errors).length > 0) {
      setLoading(false);

      return;
    }
    const priceInCents = parseFloat(price as string) * 100;
    const newListing = {
      userId: currentUser?.id,
      currency: 'eur',
      photoUrls: urls,
      latitude: user?.latitude,
      longitude: user?.longitude,
      title,
      description,
      condition,
      priceInCents,
      tags: tags.current?.length ? tags.current.map((el) => el.replace(/\s+/g, '')).join(' ') : ['Allcategories'],
    };

    const res = await api.post('/listings', newListing);
    setLoading(false);
    if (res.ok) {
      navigate('/');
    } else {
      console.log('Failed to post listing');
      return <p>Sorry, something went wrong and listing could not be posted</p>//should have errors
    }
  };

  return (
    <>
      {loading && <FullScreenLoadingIndicator />}
      <AppBody>
        <form className="AddListingView" onSubmit={onSubmit}>
          <h3 className="form-title">Add a new Listing</h3>
          <InputField
            name="title"
            placeholder="Road Bike"
            label="Title"
            error={formErrors.title}
            fieldref={titleField}
          />
          <InputField
            name="price"
            placeholder="249.50"
            type="number"
            min={0}
            step="any"
            label="Price"
            error={formErrors.price}
            fieldref={priceField}
          />
          <p style={{ marginRight: 'auto', marginBottom: '5px', marginLeft: '3px' }}>Condition</p>
          <Form.Group>
            <FormSelect ref={conditionField}>
              <option value="new">New</option>
              <option value="gentlyUsed">Gently Used</option>
              <option value="used">Used</option>
            </FormSelect>
          </Form.Group>

          <p>{formErrors.condition}</p>
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

          <p style={{ marginRight: 'auto', marginBottom: '5px', marginLeft: '3px' }}>Categories</p>
          <AutoCompleteSearch tagStack={tags} />

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
            {/* <ButtonWide clickFunction={() => navigate('/')} content={'Cancel'} fill={false} /> */}
            <ButtonWide type={'submit'} content={'Create'} fill={true} />
          </div>
        </form>
        <div className="body-footer-container"></div>
      </AppBody>
    </>
  );
}
