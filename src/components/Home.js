import '../App.css';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Button, Alert, Spinner  } from "@material-tailwind/react";
import moment from "moment-timezone";

function Home() {
  const [list, setList] = useState([])
  const [cardBooksWithExpiredDelivery, setCardBooksWithExpiredDelivery] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get("/api/booksManager").then((res) => {
      const bookCardsData = res.data.payload.booksCard.map((bookCard) => {
        return {
          ...bookCard,
          expireDate: moment(bookCard.expireDate).format(),
          retiredDate: moment(bookCard.retiredDate).format(),
        };
      });
      const currentDateTime = moment().format();
      const bookCardsConEntregaVencida = bookCardsData.filter((bookCard) => {
        return moment(bookCard.expireDate).isBefore(currentDateTime);
      });
      if (bookCardsConEntregaVencida.length > 0) {
        // Actualiza la lista de bookCards excluyendo los vencidos
        const updatedList = bookCardsData.filter((bookCard) => {
          return !bookCardsConEntregaVencida.some((vencido) => vencido._id === bookCard._id);
        });
        setList(updatedList);
        setCardBooksWithExpiredDelivery(bookCardsConEntregaVencida);
        setShowAlert(true);
        setIsLoading(false);
      } else {
        if(bookCardsData.length===0){
          setIsLoading(false);
          setCardBooksWithExpiredDelivery([]);
          setList([])
        }
        setCardBooksWithExpiredDelivery([]);
        setList(bookCardsData)
        setShowAlert(false);
        setIsLoading(false);
      }
    })

  };
  

  const deleteBookCard = async (bid) => {
    Swal.fire({
      title: '¿Estás seguro de borrar esta tarjeta?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/booksManager/${bid}`).then( () => {
          fetchData();
        })
      } else if (result.isDenied) {
        Swal.fire('Cancelado', 'La carta no fue borrada', 'info');
      }
    });
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
            <a href="#list-th"><i className="bi bi-card-text"></i></a>
            <a href="#large-th"><i className="bi bi-card-heading"></i></a>
          </div>
        </div>
        <div id="list-th" className='books-manager-container'>
        <div className="col-md-10 mb-2 mt-4 expired-area">
              {showAlert && cardBooksWithExpiredDelivery.length > 0 && (
                <div className="alert alert-danger">
                  <Alert icon={<i className="bi bi-exclamation-triangle-fill"></i>} variant='ghost' color="amber">La hora de entrega ha pasado para las siguientes tarjetas:</Alert>
                    {cardBooksWithExpiredDelivery.map((booksCard) => (
                      <div className="book expired read" key={booksCard._id}>
                        <div className="cover">
                          <img src={booksCard.books.img} alt='imagen Libro'/>
                        </div>
                        <div className="description">
                          <p className='leading-relaxed mb-3 font-bold title'>{booksCard.title}</p>
                          <p className="leading-relaxed mb-3 bookTitle">Libro: {booksCard.books.title}</p>
                          <p className="leading-relaxed mb-3 text-sm horario"> Fecha en la que se retiró: {format(new Date(booksCard.retiredDate), 'dd/MM/yyyy - HH:mm')} </p>
                          <p className="leading-relaxed mb-3 text-sm horario"> Fecha de vencimiento: {format(new Date(booksCard.expireDate), 'dd/MM/yyyy - HH:mm')} </p>
                          <div className="flex justify-center">
                            <Button className='mb-5 p-[10px] m-[10px]' color='red' onClick={() => deleteBookCard(booksCard._id)}>Borrar</Button>
                            <Button className='mb-5 p-[10px] m-[10px]' color='yellow'>Notificar alumno</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
            )}
          </div>
        <div className="cardBooks-area">
        {!isLoading && (
        <div>
          {list.length === 0 ? (
            <div className="alert alert-info">
              <Alert icon={<i className="bi bi-info-circle-fill"></i>} variant='ghost' color="blue">
                No hay libros para cargar.
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
                  <p className='leading-relaxed mb-3 font-bold title'>{booksCard.title}</p>
                  <p className="leading-relaxed mb-3 bookTitle">Libro: {booksCard.books.title}</p>
                  <p className="leading-relaxed mb-3 text-sm horario"> Fecha en la que se retiró: {format(new Date(booksCard.retiredDate), 'dd/MM/yyyy - HH:mm')} </p>
                  <p className="leading-relaxed mb-3 text-sm horario"> Fecha de vencimiento: {format(new Date(booksCard.expireDate), 'dd/MM/yyyy - HH:mm')} </p>
                  <div className="flex justify-center">
                    <Button className='mb-5' color='red' onClick={() => deleteBookCard(booksCard._id)}>Borrar</Button>
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