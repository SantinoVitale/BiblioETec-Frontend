import '../App.css';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Button, Alert, Spinner  } from "@material-tailwind/react";
import moment from "moment-timezone";
import { UserContext } from "../context/userContext"

function Home() {
  const {user} = useContext(UserContext)
  const [list, setList] = useState([])
  const [cardBooksWithExpiredDelivery, setCardBooksWithExpiredDelivery] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("/api/users/getUser")
      .then((userRes) => {
        const user = userRes.data.payload;
  
        if (user.role === "teacher") {
          // Si el usuario es un profesor, obtén todos los bookCards
          return axios.get("/api/booksManager")
            .then((allBookCardsRes) => 
              allBookCardsRes.data.payload.booksCard.map((bookCard) => ({
              ...bookCard,
              expireDate: moment(bookCard.expireDate).format(),
              retiredDate: moment(bookCard.retiredDate).format(),
            })));
        } else {
          // Si el usuario no es un profesor, obtén los bookCards relacionados con el usuario
          return axios.get(`/api/booksManager/getByUser/${user.id}`)
            .then((userBookCardsRes) => userBookCardsRes.data.payload.bookCard.map((bookCard) => ({
              ...bookCard,
              expireDate: moment(bookCard.expireDate).format(),
              retiredDate: moment(bookCard.retiredDate).format(),
            })));
        }
      })
      .then((bookCardsData) => {
        const currentDateTime = moment().format();
        const bookCardsConEntregaVencida = bookCardsData.filter((bookCard) => moment(bookCard.expireDate).isBefore(currentDateTime));
  
        if (bookCardsConEntregaVencida.length > 0) {
          const updatedList = bookCardsData.filter(
            (bookCard) => !bookCardsConEntregaVencida.some((vencido) => vencido._id === bookCard._id)
          );
          setList(updatedList);
          setCardBooksWithExpiredDelivery(bookCardsConEntregaVencida);
          setShowAlert(true);
          setIsLoading(false);
        } else {
          if (bookCardsData.length === 0) {
            setIsLoading(false);
            setCardBooksWithExpiredDelivery([]);
            setList([]);
          }
          setCardBooksWithExpiredDelivery([]);
          setList(bookCardsData);
          setShowAlert(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };
  

  const deleteBookCard = async (bid) => {
    Swal.fire({
      title: '¿Estás seguro de confirmar devolución de esta tarjeta?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/booksManager/${bid}`, {data: user}).then(() => {
          fetchData();
          Swal.fire('¡Devuelto!', 'Se confirmo la devolución con éxito', 'success');
        })
      } else if (result.isDenied) {
        Swal.fire('Cancelado', 'La carta no fue devuelta', 'info');
      }
    });
  }

  const notifyUser = async (user) => {
    let body
    Swal.fire({
      title: '¿De qué forma quiere notificar al usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Email',
      denyButtonText: 'SMS',
      denyButtonColor: '#8ee5ee',
      confirmButtonColor: '#ffcd38',
    }).then(async (result)=> {
      if(result.isConfirmed)
      {
        body = {
          user: user
        }
        await axios.post("/api/users/notify", body)
        .then((res) => {
          Swal.fire("Enviado!", "¡El usuario fue notificado via Email con éxito!", "success")
        })
      } else if(result.isDenied)
      {
        Swal.fire({
          title: "SMS del usuario",
          icon: "info",
          text: `El numero de celular del usuario es: +54 ${user.phone}`
        })
      } else if(result.isDismissed)
      {
        Swal.fire('Cancelado', 'El usuario no fue notificado', 'info');
      }
    })
  }

  return (
    <div>
        <h1 className='text-center text-2xl p-10'>Retiro de libros</h1>
        {isLoading && (
          <div className="flex text-center justify-center">
            <Spinner color="blue" size="lg" border="4px" className="m-16 h-24 w-24" />
          </div>
        )}
    {!isLoading && (
      <>
        <div className="flex flex-wrap justify-center">
          <div className="choose">
            <a href="#list-th"><i className="bi bi-grid"></i></a>
            <a href="#large-th"><i className="bi bi-layout-split"></i></a>
          </div>
        </div>
        <div id="list-th" className='books-manager-container'>
        <div className="col-md-10 mb-2 mt-4 expired-area">
              {showAlert && cardBooksWithExpiredDelivery.length > 0 && (
                <div className="alert alert-danger flex flex-col items-center">
                  <Alert icon={<i className="bi bi-exclamation-triangle-fill"></i>} variant='ghost' color="amber">La hora de entrega ha pasado para las siguientes tarjetas:</Alert>
                    {cardBooksWithExpiredDelivery.map((booksCard) => (
                      <div className="book expired read" key={booksCard._id}>
                        <div className="cover">
                          <img src={booksCard.books.img} alt='imagen Libro'/>
                        </div>
                        <div className="description">
                          <p className='leading-relaxed mb-3 font-bold title'>Usuario: {booksCard.owner.firstName} {booksCard.owner.lastName}</p>
                          <p className="leading-relaxed mb-3 bookTitle">Libro: {booksCard.books.title}</p>
                          <p className="leading-relaxed mb-3 text-sm horario"> Fecha en la que se retiró: {format(new Date(booksCard.retiredDate), 'dd/MM/yyyy - HH:mm')} </p>
                          <p className="leading-relaxed mb-3 text-sm horario"> Fecha de vencimiento: {format(new Date(booksCard.expireDate), 'dd/MM/yyyy - HH:mm')} </p>
                          <div className="flex justify-center">
                            <Button className='mb-5 p-[10px] m-[10px] z-[1]' color='red' onClick={() => deleteBookCard(booksCard._id)}>Confirmar devolución</Button>
                            {user.role === "teacher" && (
                              <Button className='mb-5 p-[10px] m-[10px] z-[1]' color='yellow' onClick={() => notifyUser(booksCard.owner)}>Notificar alumno</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
            )}
          </div>
        <div className="cardBooks-area">
        {!isLoading && cardBooksWithExpiredDelivery.length == 0 &&(
        <div>
          {list.length === 0 ? (
            <div className="alert alert-info mt-10">
              <Alert icon={<i className="bi bi-info-circle-fill"></i>} variant='ghost' color="blue">
                No hay libros para mostrar.
              </Alert>
            </div>
          ) : (
            // Renderiza el contenido de libros si la lista no está vacía
            list.map((booksCard) => (
              <div className="book read" key={booksCard._id}>
                <div className="cover">
                  <img src={booksCard.books.img} alt='imagen Libro'/>
                </div>
                <div className="description">
                  <p className='leading-relaxed mb-3 font-bold title'>Usuario: {booksCard.owner.firstName} {booksCard.owner.lastName}</p>
                  <p className="leading-relaxed mb-3 bookTitle">Libro: {booksCard.books.title}</p>
                  <p className="leading-relaxed mb-3 text-sm horario"> Fecha en la que se retiró: {format(new Date(booksCard.retiredDate), 'dd/MM/yyyy - HH:mm')} </p>
                  <p className="leading-relaxed mb-3 text-sm horario"> Fecha de vencimiento: {format(new Date(booksCard.expireDate), 'dd/MM/yyyy - HH:mm')} </p>
                  <div className="flex justify-center">
                    <Button className='mb-5 z-[1]' color='red' onClick={() => deleteBookCard(booksCard._id)}>Confirmar devolución</Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        )}
        </div>
        </div>
      </>
      )}
      </div>
    )
}

export default Home;