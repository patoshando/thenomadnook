import { useContext, useState } from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";


export default function loginPage(){
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/prihlasit', {email, password});
            setUser(data);
            alert("Úspěšné přihlášení!");
            setRedirect(true);
        }catch(e){
            alert("Přihlášení se nezdařilo!");
        }
    }

    if (redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4" >Přihlásit</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder='Email' value={email} 
                
                onChange={ev => setEmail(ev.target.value)}/>
                
                <input type="password" placeholder="Heslo" value={password} 
                
                onChange={ev => setPassword(ev.target.value)}/>
                
                <button className="primary">Přihlásit se</button>
                <div className="text-center py-2 text-gray-500">
                    Ještě nemáte účet? <Link className="underline text-black" to={'/zaregistrovat'}>Zaregistrujte se!</Link>
                </div>
            </form>
            </div>
        </div>
    )
}