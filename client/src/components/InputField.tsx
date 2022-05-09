import { MutableRefObject } from "react"
import Form from 'react-bootstrap/Form'

export default function InputField(
  { name, label, type, placeholder, error, fieldref, required }: inputInterface
) {
  return (
    <Form.Group controlId={name} className="InputField">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type || 'text'}
        placeholder={placeholder}
        ref={fieldref}
        required={required}
      />
      <Form.Text className={'text-danger'}>{error}</Form.Text>
    </Form.Group>
  )
}

interface inputInterface {
  name: string,
  label?: string,
  type?: string,
  placeholder?: string,
  error?: string,
  fieldref?: MutableRefObject<HTMLInputElement | null>;
  required?:boolean
}