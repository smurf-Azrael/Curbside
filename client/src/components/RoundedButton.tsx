import React from 'react';
import '../styling/RoundedButton.css';

export default function RoundedButton({ content }: { content: any }) {
  return (
    <button className="map-button">
      <p>
        {content}
      </p>
    </button>
  )
}
