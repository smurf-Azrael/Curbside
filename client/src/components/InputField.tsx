import { MutableRefObject } from "react"

export default function InputField(
  { name, label, type, placeholder, error, fieldref }: inputInterface
) {
  return (
    <div className="InputField">
      {label && <label>{label}</label>}
      <input
        type={type || 'text'}
        placeholder={placeholder}
        ref={fieldref}
      />
      <p>{error}</p>
    </div>
  )
}

interface inputInterface {
  name: string,
  label?: string,
  type?: string,
  placeholder?: string,
  error?: string,
  fieldref?: MutableRefObject<HTMLInputElement | null>;
}