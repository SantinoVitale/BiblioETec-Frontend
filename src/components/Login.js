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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try
    {
      await axios.post("/api/users/login", {
        email,
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
            <Input label="Email" type="email" size="lg" onChange={(e) => setData({...data, email: e.target.value})}/>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                onChange={(e) => setData({...data, password: e.target.value})}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-r-md"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
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