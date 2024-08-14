import { createElement, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";

const BooksManager = () => {
  const data = [
    {
      label: "Crear Libro",
      value: "create",
      icon: <i class="bi bi-journal-plus"></i>,
      form: 
      <Card color="white" className="p-10" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Creación de libro
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Por favor, complete todos los campos para subir un nuevo libro.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Título
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Autor
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Categoría
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Imagen
            </Typography>
            <Input
              size="lg"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6" color="blue" fullWidth>
            Subir Libro
          </Button>
        </form>
      </Card>
    },
    {
      label: "Editar Libro",
      value: "update",
      icon: <i class="bi bi-pencil-square"></i>,
      form: <h1>Formulario Edicion</h1>
    },
    {
      label: "Eliminar Libro",
      value: "delete",
      icon: <i class="bi bi-journal-minus"></i>,
      form: <h1>Formulario Borrar</h1>
    }
  ]
  const [books, setBook] = useState("");

  return (
    <div className="bg-gradient-to-r from-gray-500 via-white to-gray-500 p-10">
      <h1 className="text-bold text-black">Administración de Libros</h1>
      <div className="p-10">
      <Tabs value="dashboard">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
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
