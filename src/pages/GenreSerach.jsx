import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { useParams,useSearchParams } from 'react-router-dom'
import Listitem from '../components/Listitem'
function GenreSerach() {
    const {genreId}=useParams()
    const [searchParams]=useSearchParams()
    const params = Object.fromEntries([...searchParams]);
    const uri=`https://api.mangadex.dev/manga?includedTags[]=${genreId}&includes[]=cover_art&order[followedCount]=desc&limit=100&order[year]=desc`
    const[mangas,Setmangas]=useState([])
    
    useEffect(()=>{
        
        axios.get(uri).then(res =>{
            
            
            
            
            Setmangas(res.data.data)
            
        }).catch((err)=>{console.log(err)})
        
    },[])
  return (
    <>
    <Nav/>
    <section className='mangaLatest'>

    
    <h2 className='text-lg font-semibold rubik mb-10'>{params.title} Manga</h2>
    <div className=' flex justify-between flex-wrap'>
    
    {
   
    Object.values(mangas).map((manga,index)=>(
        <Listitem key={index} manga={manga} index={index}/>
       
    ))
    
    }
    </div>
    </section>
    </>
  )
}

export default GenreSerach