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
 
function Register() {
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
        <CardBody className="flex flex-col gap-4">
          <Input label="Usuario" size="lg" />
          <Input label="Apellido" size="lg" />
          <Input label="Teléfono" size="lg" />
          <Select label="Curso">
            <Option>1°A</Option>
            <Option>1°B</Option>
            <Option>2°A</Option>
            <Option>2°B</Option>
            <Option>3°I</Option>
            <Option>3°E</Option>
            <Option>4°I</Option>
            <Option>4°E</Option>
            <Option>5°I</Option>
            <Option>5°E</Option>
            <Option>6°I</Option>
            <Option>6°E</Option>
          </Select>
          <Input label="Email" type="email" size="lg" />
          <Input label="Contraseña" type="password" size="lg" />

        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" color="blue" fullWidth>
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
      </Card>
    </div>
  );
}

export default Register;