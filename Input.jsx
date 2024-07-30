import React, { useState } from "react";

//render prop pattern

export default function Input({ renderProps }) {
  const [fahrenheitToCelsius, setFahrenheitToCelsius] = useState(null);
  const [celsiusToFahrenheit, setCelsiusToFahrenheit] = useState(null);
  const [multiplyByTwo, setMultiplyByTwo] = useState(null);

  function handleChange(val) {
    const number = parseFloat(val); // Convert input to a number
    if (!isNaN(number)) {
      // Perform calculations only if the input is a valid number
      setFahrenheitToCelsius((((number - 32) * 5) / 9).toFixed(3));
      setCelsiusToFahrenheit((number * 9) / 5 + 32);
      setMultiplyByTwo(number * 2);
    }
  }

  return (
    <>
      <input type="text" onChange={(e) => handleChange(e.target.value)} />
      {/* Render props function to display the calculated values */}
      {renderProps({
        faToCel: fahrenheitToCelsius,
        celToFah: celsiusToFahrenheit,
        multByTwo: multiplyByTwo,
      })}
    </>
  );
}



// usage

import React from "react";
import Input from "./Input";

export default function App() {
  return (
    <div>
      <h1>Conversion and Calculation</h1>
      <Input
        renderProps={({ faToCel, celToFah, multByTwo }) => (
          <div>
            <p>Fahrenheit to Celsius: {faToCel}</p>
            <p>Celsius to Fahrenheit: {celToFah}</p>
            <p>Multiplied by Two: {multByTwo}</p>
          </div>
        )}
      />
    </div>
  );
}

