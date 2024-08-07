import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { useParams, useSearchParams,Link } from 'react-router-dom'
import axios from 'axios'

function Chapter() {
    const {chapterid,title,mangaid}=useParams()
    const [searchParams]=useSearchParams()
    const params = Object.fromEntries([...searchParams]);
    const uri=`https://api.mangadex.org/at-home/server/${chapterid}`
    const churi=`https://api.mangadex.org/chapter?manga=${mangaid}&includeFutureUpdates=1&order[volume]=asc&order[chapter]=asc&translatedLanguage[]=en&limit=100`
    const [imageData,setImageData]=useState([])
    const[chapterData,setChapterData]=useState([])
    const[baseUrl,setBaseUrl]=useState([])
    const[chapterHash,setChapeterHash]=useState([])
    useEffect(()=>{
        axios.get(uri).then(res=>{
            setImageData(res.data.chapter.data)
            setBaseUrl(res.data.baseUrl)
            setChapeterHash(res.data.chapter.hash)
        })
        axios.get(churi).then(res =>{
        
        
        
        
            setChapterData(res.data.data)
            
        }).catch((err)=>{console.log(err)})

    },[])
    const nextId=params.next<Object.values(chapterData).length>0?Object.values(chapterData)[params.next].id:null;
    console.log("ID",nextId)
    console.log(chapterData.length)
    const nextTitle=nextId?chapterData.length>0?Object.values(chapterData)[params.next].attributes.title?Object.values(chapterData)[params.next].attributes.title:`CH${Object.values(chapterData)[params.next].attributes.chapter}`:null:null;
    console.log("title",nextTitle)

  return (
    <>
    <Nav/>
    <div className=" mangaLatest flex justify-center content-center flex-col">
        <h1 className='text-center rubik font-bold text-lg' >{title}</h1>
        <div className="w-[50%] content-center ml-auto mr-auto ">
        {
            imageData && baseUrl&& chapterHash?
            
                Object.values(imageData).map(img=>(
                    <>
                    <img src={`${baseUrl}/data/${chapterHash}/${img}`} loading='lazy'/>
                    
                    </>
                ))
            :
            <h3>{imageData.length>0?"Loading":"Error"}</h3>
        }
        </div>
        {nextId?<button ><Link reloadDocument to={`/manga/chapter/${mangaid}/${nextId}/${nextTitle}?next=${nextId?parseInt(params.next)+1:null}`}>Next</Link></button>:<></>}
    </div>
    </>
  )
}

export default Chapter