import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'

function Genre() {
    const [tags,setTags]=useState([])
    const uri=`https://api.mangadex.dev/manga/tag`
    useEffect(()=>{
        axios.get(uri).then(res=>{
            setTags(res.data.data)
        }).catch(err=>console.log(err))
    },[])
    tags.length>0?Object.values(tags).map(tag=>(console.log(tag))):"loading";
    
  return (
    <>
    <Nav/>
    <div className=" mangaLatest bg-gray-100 flex flex-wrap gap-5 p-5 m-5 w-[80%] pt-6 rounded">
    {tags.length>0? Object.values(tags).map((tag,index)=>(
        <div className='flex-[25%] text-black mt-4' key={index}><Link reloadDocument to={`/genre/${tag.id}?title=${tag.attributes.name.en}`}>{tag.attributes.name.en}</Link></div>
  )):
    <h3>No data</h3>}
    </div>
    </>
  )
}

export default Genre