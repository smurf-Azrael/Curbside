import React from 'react';
import '../styling/CustomButton.css';

export default function ButtonSmall({ content, fill }: {content: string, fill: boolean}) {
  return (
    <button className={`custom-button-style ${fill ? "fill" : "nofill"}`}>
      {content}
    </button>
  )
}
