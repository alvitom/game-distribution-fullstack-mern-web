import React, { createContext, useState } from "react";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(null);

  return <CheckoutContext.Provider value={{ checkout, setCheckout }}>{children}</CheckoutContext.Provider>;
};
