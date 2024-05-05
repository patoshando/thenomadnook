import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);
    useEffect(() =>{
        if (!id){
            return;
        }
        axios.get('/nabidky/'+id).then(response =>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id])
    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description){
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    };


    async function savePlace(ev) {
        ev.preventDefault();
        if (!title || !address || !addedPhotos || !description || !perks || !extraInfo || 
            !checkIn || !checkOut || !maxGuests || !price) {
         alert("DOPLŇTE VŠECHNY INFORMACE!")
          return;
        }

        
        const placeData = {
          title, address, addedPhotos,
          description, perks, extraInfo,
          checkIn, checkOut, maxGuests, price
        };
        if (id) {
          // update
          await axios.put('/mista', {
            id, ...placeData
          });
          setRedirect(true);
        } else {
          // new place
          await axios.post('/mista', placeData);
          setRedirect(true);
        }
    
      }
        

        if (redirect){
            return <Navigate to={'/ucet/nabidky'}/>
        }
    return(
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Nadpis', 'Nadpis by měl být trefný a chytlavý, jako v reklamě!')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Můj milovaný apartmán" />
                {preInput('Adresa', 'Adresa vašeho místa')}
                <input value={address} onChange={ev => setAddress(ev.target.value)} type="text" placeholder="Adresa" />
                {preInput('Fotky', 'Čím více, tím lépe')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Popisek', 'Popište vaše místo!')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Výhody', 'Vyberte všechny výhody vašeho nabízeného místa!')}
                <Perks selected={perks} onChange={setPerks}/>
                {preInput('Extra info', 'Pravidla domu apod..')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('Check in & Check out časy, maximum hostů', 'přidejte check in a checkout časy! Nezapmeňte si nechat rezervu na uklízení mezi dalšími hosty!')}
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in</h3>
                    <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="text" placeholder="16:00"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out</h3>
                    <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="text" placeholder="8:00"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Maximum hostů</h3>
                    <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="text" placeholder="3" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Cena/noc</h3>
                    <input value={price} onChange={ev => setPrice(ev.target.value)} type="number" placeholder="100" />
                    </div>
                    <div>
                        <button className="primary my-4">Vytvořit / Uložit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}