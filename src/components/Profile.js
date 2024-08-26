import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, Input, Option, Select, Spinner } from "@material-tailwind/react";


const Profile = () => {
  const { user, userLoading } = useContext(UserContext);
  const [ userData, setUserData ] = useState({})
  console.log(user);
  

  const editProfile = (e) => {
    e.preventDefault()
    axios.put(`/api/users/edit/${user.id}`, userData)
    .then((res) => {
      toast.success("Usuario actualizado con éxito")
    })
    .catch((err) => {
      toast.error(err.response.data.message)
      console.log(err.response.data.error);
    })
  }  

  return (
    <div className="p-10">
      {userLoading ? <Spinner className="w-12 h-12" color="blue"></Spinner> : user ? 
      <div className="flex flex-col items-center">
        <h1 className="text-white text-3xl pb-10">Perfil de {user.firstName} {user.lastName}</h1>
        <form onSubmit={editProfile}>
          <Card className="w-96">
            <CardBody className="flex flex-col gap-4">
              <Input label="Nombre" defaultValue={user.firstName} variant="standard" size="lg" onChange={(e) => setUserData({...userData, firstName: e.target.value})} />
              <Input label="Apellido" defaultValue={user.lastName} variant="standard" size="lg" onChange={(e) => setUserData({...userData, lastName: e.target.value})} />
              <Input label="Telefono" defaultValue={user.phone} variant="standard" size="lg" onChange={(e) => setUserData({...userData, phone: e.target.value})} />
              <Select
              variant="standard"
              label="Curso"
              defaultValue={user.course}
              value={user.course}
              onChange={(e) => setUserData({ ...userData, course: e })}
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
              <Input label="Email" defaultValue={user.email} variant="outlined" size="lg" disabled/>
              <Input label="Rol" defaultValue={user.role} variant="outlined" size="lg" disabled/>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">
                Editar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
      : <h1>ERROR</h1>}
      
    </div>
  )
}

export default Profile;