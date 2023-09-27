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

function FormBook() {
  const Values = {
    title: "",
    books: ""
  }
  const [cartBook, setCartBook] = useState(Values)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080/api/books")
      const data = res.data.payload.books
      setBooks(data)
    }
  fetchData()
  }, [])

  const captureData = (e) => {
    const {name, value} = e.target
    console.log(name);
    console.log(value);
    setCartBook({...cartBook, [name]: value})
    console.log(cartBook);
  }

  const postCardBook = async (e) => {
    e.preventDefault();

    const newCardBook = {
      title: cartBook.title,
      books: cartBook.books
    }

    await axios.post("http://localhost:8080/api/booksManager", newCardBook);
    setCartBook({...Values})
  }
  
  
  return (
    <div className='flex justify-center items-center'>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Formulario para retirar libro
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Ingrese los datos para retirar el libro.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={postCardBook}>
        <div className="mb-4 flex flex-col gap-6">
          <Input label="Titulo" value={cartBook.title} onChange={captureData}/>
              <Select label="Libros" value={cartBook.books} onChange={captureData}>
                {books.map((book) => (
                  <Option value={book._id}>{book.title}</Option>
                ))}
          </Select>
        </div>
        <Button className="mt-6" fullWidth>
          Guardar
        </Button>
      </form>
    </Card>
    </div>
  );
}

export default FormBook;