import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Listitem from '../components/Listitem'
import Searchbar from '../components/Searchbar'
function Search() {
    const [searchParams]=useSearchParams()
    
    const [mangas,setMangas]=useState([])
    useEffect(()=>{
        const params = Object.fromEntries([...searchParams]);
        axios.get(`https://api.mangadex.org/manga?title=${params.search}&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&hasAvailableChapters=true&order[followedCount]=desc&includes[]=author&limit=100`).then(res =>{
            
            
            console.log(res)
            
            setMangas(res.data.data)
            
        }).catch((err)=>{console.log(err)})
 
    },[])
    console.log(mangas)
  return (
    <>
    <Nav/>
    <Searchbar/>
    <section className='mangaLatest'>

    
    <h2 className='text-lg font-semibold rubik mb-10'>Latest Manga</h2>
    <div className=' flex justify-between flex-wrap'>
    
    {mangas.length>0?
   
    Object.values(mangas).map((manga,index)=>(
        <Listitem manga={manga} index={index}/>
       
    ))
    :
    <h2>No items found</h2>
    }
    </div>
    </section>
    </>
  )
}

export default Search