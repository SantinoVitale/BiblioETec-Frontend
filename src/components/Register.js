import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    course: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault()
    const {firstName, lastName, course, phone, password, email} = data;
    try{
      const {data} = await axios.post('/api/users/register', {
        firstName, lastName, course, phone, password, email
      });
      if(!data.valid)
        toast.error(data.message)
      else
      {
        setData({
          firstName: '',
          lastName: '',
          course: '',
          phone: '',
          password: '',
          email: ''
        });
        toast.success('Register complete! Welcome to BiblioETec');
        navigate("/login")
      }
    } catch(error){
      
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
            Registrarse
          </Typography>
        </CardHeader>
        <form onSubmit={registerUser}>
          <CardBody className="flex flex-col gap-4">
            <Input label="Nombre" size="lg" onChange={(e) => setData({...data, firstName: e.target.value})}/>
            <Input label="Apellido" size="lg" onChange={(e) => setData({...data, lastName: e.target.value})}/>
            <Input label="Teléfono" size="lg" onChange={(e) => setData({...data, phone: e.target.value})}/>
            <Select label="Curso" onChange={(e) =>setData({...data, course: e})}>
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
            <Input label="Email" type="email" size="lg" onChange={(e) => setData({...data, email: e.target.value})}/>
            <Input label="Contraseña" type="password" size="lg" onChange={(e) => setData({...data, password: e.target.value})}/>

          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" color="blue" fullWidth type="submit">
              Registrarse
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