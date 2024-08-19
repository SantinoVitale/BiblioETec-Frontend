import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/layout/Layout';
import FormBook from './components/FormBook';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';
import Recover from './components/Recover';
import EmailVerify from './components/EmailVerify';
import BooksManager from './components/BooksManager';
import Profile from './components/Profile';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
        <Routes>
            <Route element={<Layout />}>
            <Route path="/" element={<Home/>}/>
            <Route path='/form-books' element={<FormBook/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/recover-pass' element={<Recover/>}/>
            <Route path='/users/:id/verify/:token' element={<EmailVerify/>}/>
            <Route path='/books-manager' element={<BooksManager/>} />
            <Route path='/profile/:id' element={<Profile/>} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
