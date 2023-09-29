import '../App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Button } from "@material-tailwind/react";

function Home() {
  const [list, setList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080/api/booksManager")
      const data = res.data.payload.booksCard
      setList(data)
    }
    fetchData()
  }, [])

  const deleteBookCard = async (bid) => {
    console.log(bid);
    Swal.fire({
      title: '¿Estás seguro de borrar esta tarjeta?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then( async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:8080/api/booksManager/` + bid)
        console.log(res);
        const getData = await axios.get("http://localhost:8080/api/booksManager")
        const data = getData.data.payload.booksCard
        setList(data)
        Swal.fire('Borrado!', 'La carta se borró con éxito', 'success')
      } else if (result.isDenied) {
        Swal.fire('Cancelado', 'La carta no fue borrada', 'info')
      }
    })
    
    
  }
  
  return (
    <div>
        <h1 className='text-center text-2xl p-10'>Retiro de libros</h1>
        <div className="flex flex-wrap justify-center">
        <div className="choose">
        <a href="#list-th"><i class="bi bi-grid-fill"></i></a>
        <a href="#large-th"><i class="fa fa-th-large" aria-hidden="true">b</i></a>
      </div>
      </div>
      <div className='flex flex-wrap' id="list-th">
      {list.map((booksCard) => (
        <div className="book read">
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
        ))}
      </div>
        
        </div>
  );
}

export default Home;