import '../App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select, 
  Option
} from "@material-tailwind/react";
import Swal from 'sweetalert2'

function FormBook() {
  const Values = {
    title: "",
    books: ""
  }
  const [cartBook, setCartBook] = useState(Values)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/books")
      const data = res.data.payload.books
      setBooks(data)
    }
  fetchData()
  }, [])

  const captureData = (name, value) => {
    setCartBook({ ...cartBook, [name]: value });
    console.log(cartBook);
  }

  const postCardBook = async (e) => {
    e.preventDefault();

    const newCardBook = {
      title: cartBook.title,
      books: cartBook.books
    }

    console.log();
    await axios.post("http://localhost:8080/api/booksManager", newCardBook);
    Swal.fire({
      icon: 'success',
      title: '¡Operacion exitosa!',
      text: 'La carta del libro fue agregada de manera exitosa!',
      footer: '<a href="/">Volver al inicio</a>'
    })
    setCartBook({...Values})
  }
  
  
  return (
    <div className='flex justify-center items-center m-[100px]'>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Formulario para retirar libro
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Ingrese los datos para retirar el libro.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Usuario que retira" onChange={(e) => captureData("title", e.target.value)} name='title'/>
            <div className="w-72">
            <Select label="Libro" onChange={(value) => captureData('books', value._id)}>
              {books.map((book) => (
                <Option key={book._id} value={book}>{book.title}</Option>
              ))}
            </Select>
            </div>
          </div>
        </div>
        <Button className="mt-6" fullWidth onClick={postCardBook} variant='gradient' color='blue'>
          Guardar
        </Button>
      </form>
    </Card>
    </div>
  );
}

export default FormBook;