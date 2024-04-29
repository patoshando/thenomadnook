import { useState } from "react"
import {differenceInCalendarDays} from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useEffect } from "react";
export default function BookingWidget({place}){
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);
    useEffect(() => {
        if (user) {
          setName(user.name);
        }
      }, [user]);
    
      if (numberOfGuests > place.maxGuests){
        setNumberOfGuests(place.maxGuests)
      }

    let numberOfNights = 0;
    if (checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace(){
        const response = await axios.post('/rezervace', {
            checkIn,checkOut,numberOfGuests,name,phone,
            place:place._id,
            price:numberOfNights * place.price,
          });
          const bookingId = response.data._id;
          setRedirect(`/ucet/rezervace/${bookingId}`);
        }


    if (redirect){
        return <Navigate to={redirect}/>
    }
    return(
        <div className="bg-white shadow py-4 rounded-2xl">
                                <div className="text-2xl text-center">
                                Cena: {place.price}Kč / za noc
                                </div>
                                <div className="border rounded-2xl mx-5">
                                    <div className="p-4 px-4 border-l">
                                        <label>Check in: </label>
                                        <input required type="date" name="" id="" 
                                        value={checkIn} 
                                        onChange={ev => setCheckIn(ev.target.value)} />
                                    </div>
                                    <div className="p-4 px-4 border-l">
                                        <label>Check out: </label>
                                        <input required type="date" name="" id="" 
                                        value={checkOut} 
                                        onChange={ev => setCheckOut(ev.target.value)} />
                                    </div>
                                    <div className="p-4 px-4 border-t">
                                        <label>Počet hostů: </label>
                                        <input required type="number" max={place.maxGuests} onKeyUp="if(this.value> place.maxGuests) this.value = null;"
                                        value={numberOfGuests} 
                                        onChange={ev => setNumberOfGuests(ev.target.value)} />
                                    </div>
                                    
                                    {numberOfNights > 0 &&(
                                        <div className="p-4 px-4 border-t">
                                            <label>Celé jméno: </label>
                                            <input required type="text" 
                                            value={name} 
                                            onChange={ev => setName(ev.target.value)} />
                                            <label>Telefonní číslo: </label>
                                            <input required type="tel" 
                                            value={phone} 
                                            onChange={ev => setPhone(ev.target.value)} />
                                        </div>
                                    )}
                                </div>
                                
                                <button onClick={bookThisPlace} className="primary mt-4 ">
                                    Zarezervovat za 
                                    {numberOfNights > 1 && (
                                        <span> {numberOfNights * place.price}Kč</span>
                                    )}
                                </button>
                            </div>
    )
}