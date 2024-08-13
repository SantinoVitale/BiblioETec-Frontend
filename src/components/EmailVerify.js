import { Alert, Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      await axios
        .get(`/api/users/${params.id}/verify/${params.token}`)
        .then((res) => {
          console.log(res);
          setValidUrl(true);
        })
        .catch((err) => {
          console.log(err);
          setValidUrl(false);
          setError(err.response.data.message);
        });
    };
    verifyEmailUrl();
  }, [params]);

  return (
    <div className="flex justify-center h-full mt-64">
      {validUrl ? (
        <Alert
          icon={<i class="bi bi-patch-check-fill text-3xl"></i>}
          className="w-fit h-32 text-xl"
          color="green"
        >
          <div className="flex justify-center items-center flex-col">
            Email verificado correctamente, puede volver al inicio de sesión.
            <Link to="/login">
              <Button color="white" size="md" variant="outlined">
                Login
              </Button>
            </Link>
          </div>
        </Alert>
      ) : (
        <Alert
          icon={<i class="bi bi-exclamation-triangle-fill text-3xl"></i>}
          color="red"
          className="w-fit h-32 text-xl"
        >
          <div className="flex justify-center items-center flex-col">
            Hubo un problema con la verificación de Email:
            <p>{error}</p>
            <Link to="/login">
              <Button color="white" size="md" variant="outlined">
                Login
              </Button>
            </Link>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default EmailVerify;
