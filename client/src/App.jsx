import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from './pages/indexPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './Layout';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/prihlasit' element={<LoginPage />} />
          <Route path='/zaregistrovat' element={<RegisterPage />} />
          <Route path='/ucet' element={<ProfilePage />} />
          <Route path='/ucet/nabidky' element={<PlacesPage />} />
          <Route path='/ucet/nabidky/nove' element={<PlacesFormPage />} />
          <Route path='/ucet/nabidky/:id' element={<PlacesFormPage />} />
          <Route path='/misto/:id' element={<PlacePage/>}/>
          <Route path='/ucet/rezervace' element={<BookingsPage/>} />
          <Route path='/ucet/rezervace/:id' element={<BookingPage/>} />
        </Route>
      
      </Routes>
    </UserContextProvider>
  )
}

export default App
