import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Swal from "sweetalert2";

function Recover() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState("@alumno.etec.um.edu.ar");
  const code = searchParams.get("code");
  const email = searchParams.get("email");
  const [data, setData] = useState({
    email: "",
    password: "",
    code: code,
  });

  useEffect(() => {
    getMail();
  }, []);
  /*
  ! Ver si se implementa luego 
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  */

  const getMail = async () => {
    await axios
      .post("/api/users/recoverPass/getMail", {
        email: email,
        code: code,
      })
      .then((res) => {
        if (res) {
          toast.success("Codigo no está vencido");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Codigo está vencido");
        toast.error(
          err.response?.data?.message || "Error al obtener el correo"
        );
      });
  };

  const changePass = async (e) => {
    e.preventDefault();
    console.log(data);

    const { email, password, code } = data;
    await axios
      .post("/api/users/recoverPass/changePass", {
        email: email + value,
        password: password,
        code: code,
      })
      .then((res) => {
        if (res) {
          toast.success("Contraseña cambiada con éxito");
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="flex justify-center items-center m-[100px]">
      <Card className="w-96 shadow-2xl">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Recuperar contraseña
          </Typography>
        </CardHeader>
        <form onSubmit={changePass}>
          <CardBody className="flex flex-col gap-4">
            <div className="inline-flex items- w-full">
              <Input
                variant="standard"
                aria-autocomplete="email"
                formNoValidate
                className="w-full"
                label="Email"
                type="text"
                containerProps={{ className: "min-w-0 icon-father" }}
                icon={
                  <select
                    className="border-white border-solid border focus:outline-gray-400"
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
                label="Nueva contraseña"
                type="password"
                containerProps={{ className: "min-w-0 icon-father" }}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="inline-flex items- w-full">
              <Input
                variant="standard"
                className="w-full"
                label="Código"
                type="text"
                value={code}
                containerProps={{ className: "min-w-0 icon-father" }}
                onChange={(e) => setData({ ...data, code: e.target.value })}
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" color="blue" fullWidth type="submit">
              Cambiar contraseña
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Recover;
