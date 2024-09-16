import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Option,
  Select,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Register() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    course: "",
    email: "",
    password: "",
  });
  const [value, setValue] = useState("@alumno.etec.um.edu.ar");
  const [loading, setLoading] = useState(false);

  /*
  ! Ver si se implementa luego

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  */

  const registerUser = async (e) => {
    e.preventDefault();
    const { firstName, lastName, course, phone, password } = data;
    const email = data.email + value;
    setLoading(true)

    if (phone.length !== 10) {
      toast.error("El número de teléfono debe tener 10 dígitos");
      return;
    }
    await axios
      .post("/api/users/register", {
        firstName,
        lastName,
        course,
        phone,
        password,
        email,
      })
      .then((res) => {
        if (!res.data.valid) toast.error(res.data.message);
        else {
          setData({
            firstName: "",
            lastName: "",
            course: "",
            phone: "",
            password: "",
            email: "",
          });
          toast.success(res.data.message);
        }
      });
    setLoading(false)
  };

  return (
    <div className="flex justify-center items-center mx-5 my-24 md:m-[100px]">
      <Card className="w-full md:w-96 shadow-2xl">
        <CardHeader
          variant="gradient"
          color="deep-purple"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Registrarse
          </Typography>
        </CardHeader>
        <form onSubmit={registerUser}>
          <CardBody className="flex flex-col gap-4">
            <Input
              variant="standard"
              label="Nombre"
              size="lg"
              required
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
            <Input
              variant="standard"
              label="Apellido"
              size="lg"
              required
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
            <Input
              variant="standard"
              label="Teléfono"
              size="lg"
              required
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <Select
              variant="standard"
              label="Curso"
              onChange={(e) => setData({ ...data, course: e })}
            >
              <Option value="1°A">1°A</Option>
              <Option value="1°B">1°B</Option>
              <Option value="2°A">2°A</Option>
              <Option value="2°B">2°B</Option>
              <Option value="3°I">3°I</Option>
              <Option value="3°E">3°E</Option>
              <Option value="4°I">4°I</Option>
              <Option value="4°E">4°E</Option>
              <Option value="5°I">5°I</Option>
              <Option value="5°E">5°E</Option>
              <Option value="6°I">6°I</Option>
              <Option value="6°E">6°E</Option>
            </Select>
            <div className="inline-flex items- w-full">
              <Input
                variant="standard"
                className="w-full"
                label="Email"
                type="text"
                required
                containerProps={{ className: "min-w-0 icon-father" }}
                icon={
                  <select
                    className="border-white border-solid border focus:outline-gray-400 justify-self-end text-xs md:text-base"
                    onChange={(val) => setValue(val.target.value)}
                  >
                    <option value="@alumno.etec.um.edu.ar">
                      @alumno.etec.um.edu.ar
                    </option>
                    <option value="@etec.um.edu.ar">@etec.um.edu.ar</option>
                    <option value="@alumno.um.edu.ar">@alumno.um.edu.ar</option>
                  </select>
                }
                autoComplete="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="inline-flex items- w-full">
              <Input
                variant="standard"
                className="w-full"
                label="Contraseña"
                type="password"
                required
                containerProps={{ className: "min-w-0 icon-father" }}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" color="deep-purple" fullWidth type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Registrarse"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              ¿Ya tienes cuenta?
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Ingresar
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Register;
