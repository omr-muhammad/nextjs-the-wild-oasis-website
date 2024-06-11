"use client";
import { useOptimistic } from "react";

import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

export default function ReservationList({ bookings }) {
  // First Params will be the init state for optimisticBookings
  // and the output of the cb function
  const [optimisticBookings, optimisticTrigger] = useOptimistic(
    bookings,
    (curState, bookingId) => {
      return curState.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId, guestId) {
    // This will run the function in the useOptimistic and change the UI immediately
    // according to the output of this function
    optimisticTrigger(bookingId);
    await deleteReservation(bookingId, guestId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
