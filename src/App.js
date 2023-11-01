import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/layout/Layout';
import FormBook from './components/FormBook';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  return (
    <BrowserRouter>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
      <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home/>}/>
          <Route path='/form-books' element={<FormBook/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
