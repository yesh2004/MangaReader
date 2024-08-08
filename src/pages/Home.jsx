import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import Listitem from '../components/Listitem'
import Listitemtwo from '../components/ListItemtwo'
import Searchbar from '../components/Searchbar'
import { useNavigate } from 'react-router-dom';
const uri=`https://api.mangadex.org/manga?includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&hasAvailableChapters=true&order[followedCount]=desc&includes[]=author&limit=60`


function Home() {
    const[mangas,Setmangas]=useState([])
    
    useEffect(()=>{
        
        axios.get(uri).then(res =>{
            
            
            
            
            Setmangas(res.data.data)
            
        }).catch((err)=>{console.log(err)})
        
    },[])
    
  return (
    <>
    <Nav/>
    <Searchbar/>
    <section className='mangaLatest'>

    
    <h2 className='text-lg font-semibold rubik mb-10'>Latest Manga</h2>
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

export default Home