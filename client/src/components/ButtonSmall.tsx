import React from 'react';
import '../styling/ButtonSmall.css';

export default function ButtonSmall({ content, fill }: {content: string, fill: boolean}) {
  return (
    <button className={`custom-button-small ${fill ? "fill" : "nofill"}`}>
      {content}
    </button>
  )
}
