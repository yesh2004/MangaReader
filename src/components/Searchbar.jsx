import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
function Searchbar() {
    const [search,setSeacrch]=useState("")
    const navigate = useNavigate();
    const Searchto=(value)=>{
      setSeacrch(value)
     console.log(search)
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      navigate(`/search?search=${search}`);
      window.location.reload()
    }
  return (
    <>
    <section className='mangaLatest'>
    <form action="" onSubmit={handleSubmit}>
      <input type="text" value={search} onChange={(e) => Searchto(e.target.value)} className='w-[100%] p-1 rounded-lg text-black' placeholder='Search'/>
    </form>
    </section>
    </>
  )
}

export default Searchbar