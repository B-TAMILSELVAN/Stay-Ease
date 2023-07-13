import { Children, useContext, useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { Navigate } from "react-router-dom";
import axios from "axios"
import { UserContext } from "./UserContext";
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [redirect,setRedirect]=useState('')
  const {user}=useContext(UserContext)

 useEffect(()=>{
    if(user){
      setName(user.name);
    }
 },[user])

  let numberOfNights=0;
  if(checkIn&&checkOut){
    numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
  }

 async function bookThisPlace(){
 
 const response= await  axios.post('/booking',{checkIn,checkOut,numberOfGuests,name,phone,place:place._id,price:numberOfNights*place.price});

  const bookingId=response.data._id;
  setRedirect(`/account/bookings/${bookingId}`)
  }

  if(redirect){
    return <Navigate to={redirect}/>
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price}/per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className=" py-3 px-4">
            <label htmlFor="">Check in: </label>
            <input
              type="date"
              name=""
              id=""
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className=" py-3 px-4 border-l">
            <label htmlFor="">Check out: </label>
            <input
              type="date"
              name=""
              id=""
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="">Number of guests: </label>
          <input
            type="number"
            name=""
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            id=""
          />
        </div>
        {numberOfNights>0&&(
          <div className="py-3 px-4 border-t">
          <label htmlFor="">Your full name: </label>
          <input
            type="text"
            name=""
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            id=""
          />
          <label htmlFor="">Phone number: </label>
          <input
            type="tel"
            name=""
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            id=""
          />
        </div>
        )}
      </div>

      <button className="primary mt-4" onClick={
        bookThisPlace} >Book this place{numberOfNights>0&&(
        <span> ${numberOfNights*place.price}</span>
      )}</button>
    </div>
  );
}
