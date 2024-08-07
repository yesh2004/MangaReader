import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar'
function Nav() {
  const navigate=useNavigate()
  const randommanga=()=>{
    axios.get(`https://api.mangadex.org/manga/random`).then(res=>{
      console.log(res.data.data.id)
      navigate(`/manga/${res.data.data.id}`)
      window.location.reload()
    }
    )
  }
  return (
    <nav className='flex justify-between h-[60px] text-white pl-5 bg-[#b9080a] pr-6'>
        <div className="">
            <h1 className='text-[42px] font-extrabold'><span className='duration-300 ease-in hover:text-black '>MANGA</span>READER</h1>
        </div>
       
        <div className="">
            <ul className='flex mt-2 '>
                <li className='mr-6 text-[24px] uppercase font-bold cursor-pointer'><Link to='/'>Home</Link>  </li>
                <li className='mr-6 text-[24px] uppercase font-bold cursor-pointer'>Genre</li>
                <li className='mr-6 text-[24px] uppercase font-bold cursor-pointer' onClick={randommanga}>Random</li>
            </ul>
        </div>
    </nav>
  )
}

export default Nav