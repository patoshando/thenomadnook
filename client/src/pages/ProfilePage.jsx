import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage(){
    const [redirect, setRedirect] = useState(null);
    const {user, ready, setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined){
        subpage = 'profil';
    }


    async function logout() {
        await axios.post('/odhlasit');
        setRedirect('/');
        setUser(null);
    }

    if (!ready){
        return 'Loading...';
    }
    if (ready && !user && !redirect){
        return <Navigate to={'/prihlasit'} />
    }

    
    

    if (redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profil' && (
                <div className="text-center max-w-lg mx-auto">
                    Přihlášen jako: {user.name} ({user.email})
                    <button onClick={logout} className="primary max-w-sm mt-2">Odhlásit</button>
                </div>
            )}
            {subpage === 'nabidky' && (
                <PlacesPage/>
            )}
        </div>
    );
}