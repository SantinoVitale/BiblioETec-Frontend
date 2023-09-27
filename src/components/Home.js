import '../App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from 'date-fns';

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
    
    await axios.delete(`http://localhost:8080/api/booksManager/` + bid)
    const getData = await axios.get("http://localhost:8080/api/booksManager")
    const data = getData.data.payload.booksCard
    setList(data)
    
  }
  
  return (
    <div className=''>
        <h1 className='text-center text-2xl p-10'>Retiro de libros</h1>
        <div className="flex flex-wrap -m-4 justify-center">
        {list.map((booksCard) => (
          <div className="p-4 sm:w-1/2 lg:w-1/3">
            <div className="h-full bg-slate-100 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img className="lg:h-72 md:h-48 w-full object-contain object-center" src={booksCard.books.img} alt="blog"/>
              <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                <h2 className="text-base font-medium text-indigo-300 mb-1"> {booksCard.title} </h2>
                <h1 className="text-2xl font-semibold mb-3"> {booksCard.books.title} </h1>
                <p className="leading-relaxed mb-3"> Fecha en la que se retiró: {format(new Date(booksCard.retiredDate), 'dd/MM/yyyy - HH:mm')} </p>
                <p className="leading-relaxed mb-3"> Fecha de vencimiento: {format(new Date(booksCard.expireDate), 'dd/MM/yyyy - HH:mm')} </p>
                <div className='flex justify-between'>
                  <p className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0"> {booksCard.owner} </p>
                  <button className='bg-red-700 p-3 rounded text-white font-bold hover:bg-red-900 transition duration-200 ease-in' onClick={() => deleteBookCard(booksCard._id)}>
                    Devolver Libro
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
}

export default Home;