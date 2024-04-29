import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage(){
    const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/mista-uzivatele').then(({data}) => {
      setPlaces(data);
    });
  }, []);

    return (
        <div>
            <AccountNav />

                <div className="text-center">
                    Seznam všech přidaných nabídek
                    <br />
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/ucet/nabidky/nove'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                Přidat místo
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/ucet/nabidky/' + place._id} className="flex cursor-pointer gap-4 mt-6 bg-gray-200 p-4 rounded-2xl">
                        <div className="flex  w-32 h-32 shrink-0 mt-5">
                            <PlaceImg place={place} />
                        </div>
                        <div className="grow-0 shrink">
                        <h2 className="text-xl">{place.title}</h2>
                        <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}