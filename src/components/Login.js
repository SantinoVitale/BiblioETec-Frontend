import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  /*
  ! Ver si se implementa luego 
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  */

  const loginUser = async (e) => {
    e.preventDefault();
    const { email , password } = data;
    try
    {
      await axios.post("/api/users/login", {
        email: email + "@alumno.etec.um.edu.ar",
        password
      })
      .then((res) => 
      {
        toast.success("Logged successfully! Welcome to BiblioETec");
        const newUser = {
          ...res.data.payload,
          id: res.data.payload._id
        }
        setUser(newUser)
        setData({});
        navigate("/");
      })
    } catch(error)
    {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='flex justify-center items-center m-[100px]'>
      <Card className="w-96 shadow-2xl">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Ingresar
          </Typography>
        </CardHeader>
        <form onSubmit={loginUser}>
          <CardBody className="flex flex-col gap-4">
              <div className="inline-flex items- w-full">
                  <Input variant="standard" aria-autocomplete="email" formNoValidate className="w-full" label="Email" type="text" containerProps={{className: "min-w-0 icon-father"}} icon={<span className="w-full">@alumno.etec.um.edu.ar</span>} autoComplete="email" onChange={(e) => setData({...data, email: e.target.value})}/>
              </div>
              <div className="inline-flex items- w-full">
                  <Input variant="standard" className="w-full" label="Contraseña" type="password" containerProps={{className: "min-w-0 icon-father"}} onChange={(e) => setData({...data, password: e.target.value})}/>
              </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" color="blue" fullWidth type="submit">
              Ingresar
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              ¿No tienes cuenta?
              <Typography
                as="a"
                href="/register"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Registrarse
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;