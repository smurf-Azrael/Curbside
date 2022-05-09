import { useRef, useState, FormEvent } from "react"
import InputField from "../components/InputField"
import { useApi } from "../contexts/ApiProvider";
import { useNavigate } from "react-router-dom";
export default function ListingView () {
  const titleField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLTextAreaElement>(null);
  const conditionField = useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const [formErrors, setFormErrors] = useState<{[key:string]:string}>({})

  const api = useApi();
  const navigate = useNavigate();
  
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const title = titleField.current?.value;
    const description = descriptionField.current?.value;
    const condition = conditionField.current?.value;
    const price = priceField.current?.value;
    
    const errors: {[key:string]:string} = {}
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
    <form onSubmit={onSubmit}>
      <InputField 
        name="title"
        placeholder="title"
        label="Title"
        error={formErrors.title}
        fieldref={titleField}
      />
      <div>
        <label>Description</label>
        <textarea ref={descriptionField}></textarea>
        <p>{formErrors.description}</p>
      </div>
      <div>
        <label>Condition</label>
        <select>
          <option value="new">New</option>
          <option value="gently used">Gently Used</option>
          <option value="used">Used</option>
        </select>
        <p>{formErrors.condition}</p>
      </div>
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
      <input type='submit' value="Create"/>
    </form>
  )
}