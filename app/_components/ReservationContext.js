"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initState = { from: undefined, to: undefined };

export function ReservationProvider({ children }) {
  const [range, setRange] = useState(initState);

  const resetRange = () => setRange(initState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined)
    throw new Error("Context has been used outside its provider");

  return context;
}
