import { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

import { Link } from "react-router-dom";
import BookingsDates from "../BookingsDate";

export default function BookingsPage() {
  const [bookings, setBookings] = useState("");
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden ">
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow mt-3 py-2 ">
                <h2>{booking.place.title}</h2>

                <div className="text-xl">
                  <BookingsDates booking={booking} className=" mb-2 mt-4 text-gray-500" />
                  <div className="flex gap-1 t">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span className="text-2xl">Total Price: ${booking.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
