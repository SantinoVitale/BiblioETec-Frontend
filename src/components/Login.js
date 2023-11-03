import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try
    {
      await axios.post("/api/users/login", {
        email,
        password
      })
      .then(() => 
      {
        toast.success("Logged successfully! Welcome to BiblioETec");
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
            <Input label="Password" type="password" size="lg" onChange={(e) => setData({...data, password: e.target.value})}/>
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