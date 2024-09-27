import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Select,
  Option,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import toast from "react-hot-toast";

const BooksManager = () => {
  const [dataBooks, setDataBooks] = useState([]);
  const [createData, setCreateData] = useState({
    title: "",
    author: "",
    category: "",
    img: ""
  });
  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    img: ""
  });
  const [deleteData, setDeleteData] = useState({
    id: ""
  })
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    axios.get("/api/books")
    .then((res) => {
      const data = res.data.payload.books;
      setDataBooks(data)
    })
    .catch((err) => {
      toast.error("Hubo un problema a la hora de cargar los libros", err)
    })

  }, [])

  const handleIdBooks = (e, crud) => {
    if(crud === "update") {
      setUpdateData({...updateData, id: e})
    } else if (crud === "delete"){
      setDeleteData({...data, id: e})
    }
  }

  const submitCreate = async (e) => {
    e.preventDefault();
    setLoadingCreate(true);
    await axios.post("/api/books", createData)
    .then((res) => {
      if(res.data.valid)
        toast.success("Libro creado con éxito");
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    })
    .finally(() => {
      setLoadingCreate(false);
    })
  }

  const submitUpdate = async (e) => {
    e.preventDefault();
    setLoadingEdit(true);
    await axios.put(`/api/books/${updateData.id}`, {
      title: updateData.title,
      author: updateData.author,
      category: updateData.category,
      img: updateData.img
    })
    .then((res) => {
      if(res.data.valid)
        toast.success("Libro actualizado con éxito")
    })
    .catch((err) => {
      toast.error(err.response.data.message)
    })
    .finally(() => {
    setLoadingEdit(false);
    })
  }

  const submitDelete = async (e) => {
    e.preventDefault();
    setLoadingDelete(true);
    await axios.delete(`/api/books/${deleteData.id}`)
    .then((res) => {
      if(res.data.valid)
        toast.success("Libro eliminado con éxito")
    })
    .catch((err) => {
      toast.error(err.response.data.message)
    })
    .finally(() => {
      setLoadingDelete(false)
    })
  }

  const data = [
    {
      label: "Crear Libro",
      value: "create",
      icon: <i className="bi bi-journal-plus"></i>,
      form: 
      <Card color="white" className="p-10 w-fit" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Creación de libro
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Por favor, complete todos los campos para subir un nuevo libro.
        </Typography>
        <form className="mt-8 mb-2 max-w-screen-lg" onSubmit={submitCreate}>
          <div className="mb-1 flex flex-col gap-6">
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setCreateData({...createData, title: e.target.value})}
              variant="standard"
              label="Título"
              required
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setCreateData({...createData, author: e.target.value})}
              variant="standard"
              label="Autor"
              required
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setCreateData({...createData, category: e.target.value})}
              label="Categoría"
              variant="standard"
              required
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Input
              size="lg"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setCreateData({...createData, img: e.target.value})}
              label="Imagen"
              required
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              variant="standard"
              icon={
                <Tooltip content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                      ¿Cómo tengo que subir la imagen?
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      El formato es un link a Google Fotos donde tienen guardadas las imagenes de los demas libros
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      NO hay que subir un archivo, solo el link.
                    </Typography>
                  </div>
                }>
                  <i className="bi bi-question-circle"></i>
                </Tooltip>}
            />
          </div>
          <Button className="mt-6" color="blue" fullWidth type="submit" disabled={loadingCreate}>
            {loadingCreate ? "Cargando..." : "Subir Libro"}
          </Button>
        </form>
      </Card>
    },
    {
      label: "Editar Libro",
      value: "update",
      icon: <i className="bi bi-pencil-square"></i>,
      form: <Card color="white" className="p-10" shadow={true}>
              <Typography variant="h4" color="blue-gray">
                Edición de libro
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Por favor, complete todos los campos para actualizar el Libro
              </Typography>
              <form className="mt-8 mb-2 max-w-screen-lg" onSubmit={submitUpdate}>
                <div className="mb-1 flex flex-col gap-6">
                  <Select
                    label="Libro"
                    variant="standard"
                    required
                    onChange={(e) => handleIdBooks(e, "update")}
                  >
                    {dataBooks.map((book) => (
                      <Option key={book.title} value={book._id}>
                        {book.title}
                      </Option>
                    ))}
                  </Select>
                  <Input
                    size="lg"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={(e) => setUpdateData({...updateData, title: e.target.value})}
                    label="Título"
                    variant="standard"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Input
                    size="lg"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={(e) => setUpdateData({...updateData, author: e.target.value})}
                    label="Autor"
                    variant="standard"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Input
                    size="lg"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={(e) => setUpdateData({...updateData, category: e.target.value})}
                    label="Categoría"
                    variant="standard"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Input
                    size="lg"
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={(e) => setUpdateData({...updateData, img: e.target.value})}
                    label="Imagen"
                    variant="standard"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    icon={
                    <Tooltip content={
                      <div className="w-80">
                        <Typography color="white" className="font-medium">
                          ¿Cómo tengo que subir la imagen?
                        </Typography>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal opacity-80"
                        >
                          El formato es un link a Google Fotos donde tienen guardadas las imagenes de los demas libros
                        </Typography>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal opacity-80"
                        >
                          NO hay que subir un archivo, solo el link.
                        </Typography>
                      </div>
                    }>
                      <i className="bi bi-question-circle"></i>
                    </Tooltip>}
                  />
                </div>
                <Button className="mt-6" color="blue" fullWidth type="submit" disabled={loadingEdit}>
                  {loadingEdit ? "Cargando..." : "Actualizar Libro"}
                </Button>
              </form>
            </Card>
    },
    {
      label: "Eliminar Libro",
      value: "delete",
      icon: <i className="bi bi-journal-minus"></i>,
      form: <Card color="white" className="p-10" shadow={true}>
              <Typography variant="h4" color="blue-gray">
                Eliminar libro
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Por favor, complete todos los campos para eliminar el Libro
              </Typography>
              <form className="mt-8 mb-2 max-w-screen-lg" onSubmit={submitDelete}>
                <div className="mb-1 flex flex-col gap-6">
                  <Select
                    label="Libro"
                    variant="standard"
                    required
                    onChange={(e) => handleIdBooks(e, "delete")}
                  >
                    {dataBooks.map((book) => (
                      <Option key={book.title} value={book._id}>
                        {book.title}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Button className="mt-6" color="blue" fullWidth type="submit" disabled={loadingDelete}>
                  {loadingDelete ? "Cargando..." : "Eliminar Libro"}
                </Button>
              </form>
            </Card>
    }
  ]

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-white font-bold text-3xl">Administración de Libros</h1>
      <div className="p-5 md:p-10">
      <Tabs value="dashboard">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2 text-xs md:text-base">
                {icon}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, form }) => (
            <TabPanel className="flex justify-center" key={value} value={value}>
              {form}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      </div>
    </div>
  );
};

export default BooksManager;
