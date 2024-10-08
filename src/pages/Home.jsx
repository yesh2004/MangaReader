import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import Listitem from '../components/Listitem'
import Listitemtwo from '../components/ListItemtwo'
import Searchbar from '../components/Searchbar'
import { useNavigate } from 'react-router-dom';
const uri=`https://api.mangadex.org/manga?includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&hasAvailableChapters=true&order[followedCount]=desc&includes[]=author&limit=30`
const uri2=`https://api.mangadex.org/manga?limit=15&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[createdAt]=desc&includes[]=cover_art&hasAvailableChapters=true`

function Home() {
    const[mangas,Setmangas]=useState([])
    const [mangas2,setMangas2]=useState([])
    const config = {
      headers: {
        "Referer": " "
        
      },
    };
    useEffect(()=>{
        
        axios.get(uri,config).then(res =>{
            
            
            
            
            Setmangas(res.data.data)
            
        }).catch((err)=>{console.log(err)})
        axios.get(uri2,config).then(res =>{
            
            
            
            
          setMangas2(res.data.data)
          
      }).catch((err)=>{console.log(err)})
        
    },[])
    
  return (
    <>
    <Nav/>
    <Searchbar/>
    <section className='mangaLatest'>

    
    <h2 className='text-lg font-semibold rubik mb-10'>Popular Manga</h2>
    <div className=' flex justify-between flex-wrap'>
    
    {
   
    Object.values(mangas).map((manga,index)=>(
        <Listitem key={index} manga={manga} index={index}/>
       
    ))
    
    }
    </div>
    <h2 className='text-lg font-semibold rubik mb-10 mt-10'>Recently Added</h2>
    <div className=' flex justify-between flex-wrap'>
    
    {
   
    Object.values(mangas2).map((manga,index)=>(
        <Listitem key={index} manga={manga} index={index}/>
       
    ))
    
    }
    </div>
    </section>
   
    </>
  )
}

export default Home