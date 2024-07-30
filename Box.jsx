import React, { createContext, useContext, useState } from "react";
//  compound component pattern
const BoxContext = createContext();

export default function Box({ children, borderWidth = 1 }) {
  const [width, setWidth] = useState(borderWidth);
  return (
    <BoxContext.Provider value={{ width, setWidth }}>
      <div>{children}</div>
    </BoxContext.Provider>
  );
}

Box.GreenBorder = function ({ children }) {
  const { width, setWidth } = useContext(BoxContext);
  return (
    <div
      onClick={() => {
        setWidth((p) => p + 1);
        console.log(width);
      }}
      style={{ border: `${width}px solid green`, padding: "10px 15px" }}
    >
      {children}
    </div>
  );
};
Box.RedBorder = function ({ children }) {
  const { width, setWidth } = useContext(BoxContext);
  return (
    <div
      onClick={() => {
        setWidth((p) => p - 1);
        console.log(width);
      }}
      style={{ border: `${width + 5}px solid red`, padding: "10px 15px" }}
    >
      {children}
    </div>
  );
};

//second way:
export function GreenBorder({ children }) {
  const { width, setWidth } = useContext(BoxContext);
  return (
    <div style={{ border: `${width}px solid green`, padding: "10px 15px" }}>
      {children}
    </div>
  );
}
export function RedBorder({ children }) {
  const { width, setWidth } = useContext(BoxContext);
  return (
    <div style={{ border: `${width + 5}px solid red`, padding: "10px 15px" }}>
      {children}
    </div>
  );
}
