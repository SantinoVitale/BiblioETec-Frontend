import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
 
function Login() {
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
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" type="email" size="lg" />
          <Input label="Password" type="password" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" color="blue" fullWidth>
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
      </Card>
    </div>
  );
}

export default Login;