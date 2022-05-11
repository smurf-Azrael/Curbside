import React from 'react';
import '../styling/CustomButton.css';

export default function ButtonWide({ clickFunction,  content, fill }: { clickFunction?: any, content: string, fill: boolean}) {
  return (
    <button
      onClick={clickFunction}
      className={`custom-button-style ${fill ? "fill" : "nofill"}`}
      style={{width:'100%'}}
    >
      {content}
    </button>
  )
}
