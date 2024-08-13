import "../App.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { UserContext } from "../context/userContext";

function FormBook() {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/books");
      const data = res.data.payload.books;
      setBooks(data);
    };
    fetchData();
  }, []);

  const postCardBook = async (value) => {
    const newCardBook = {
      user: user.id,
      books: value._id,
    };

    await axios
      .post("http://localhost:8080/api/booksManager", newCardBook)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "¡Operacion exitosa!",
          text: "La carta del libro fue agregada de manera exitosa!",
          footer: '<a href="/">Volver al inicio</a>',
        });
      });
  };

  const categories = ["Todos", ...new Set(books.map((book) => book.category))];

  const handleFilterByCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const filteredBooks = books.filter((book) => {
    return (
      (selectedCategory === "Todos" || book.category === selectedCategory) &&
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex justify-center items-center m-[100px]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Formulario para retirar libro
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Ingrese los datos para retirar el libro.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg w-[1000px]">
          <div className="mb-4 flex flex-col gap-6">
            <div className="mb-4 flex flex-col gap-6">
              <div className="flex w-72">
                <div className="ml-5 mr-5 mb-5">
                  <Input
                    type="text"
                    label="Buscar libro"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="ml-5 mr-5 mb-5">
                  <Select
                    label="Filtrar por Categoría"
                    onChange={(e) => handleFilterByCategory(e)}
                    className=""
                  >
                    {categories.map((category) => (
                      <Option key={category} value={category}>
                        {category}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map((book) => (
                  <Card key={book._id} className="w-[250px] box-shadow p-6">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      {book.title}
                    </Typography>
                    <img
                      src={book.img}
                      alt={book.title}
                      className="mb-2 rounded-md w-full h-[300px]"
                    />
                    <Typography color="gray" className="mb-2">
                      Categoría: {book.category}
                    </Typography>
                    <Button
                      fullWidth
                      onClick={() => postCardBook(book)}
                      variant="gradient"
                      color="blue"
                    >
                      Seleccionar
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default FormBook;
