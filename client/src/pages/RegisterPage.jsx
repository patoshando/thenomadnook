import {Link} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

export default function RegisterPage(){
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/zaregistrovat', {
                name,
                email,
                password
            });
            alert('Registrace úspěšná, teď se můžete přihlásit!');
        }catch(e){
            alert('Registrace neúspěšná, Zkuste to později!');
        }
        
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4" >Zaregistrovat</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
                <input required type="text" placeholder="Jméno" 
                
                value={name} 
                onChange={ev => setName(ev.target.value)}/>
                
                <input type="email" required placeholder='Email' 
                
                value={email} 
                onChange={ev => setEmail(ev.target.value)}/>
                
                <input required type="password" placeholder="Heslo" 
                
                value={password} 
                onChange={ev => setPassword(ev.target.value)}/>
                
                <button className="primary">Zaregistrovat</button>
                <div className="text-center py-2 text-gray-500">
                    Už jste členem? <Link className="underline text-black" to={'/prihlasit'}>Přihlásit se</Link>
                </div>
            </form>
            </div>
        </div>
    )
}