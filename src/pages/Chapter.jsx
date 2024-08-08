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
    const pId=parseInt(params.next)-1
    const nId=parseInt(params.next)+1
    const prevId=pId>=0?Object.values(chapterData).length>0?Object.values(chapterData)[pId].id:null:null;
    const nextId=nId<Object.values(chapterData).length>0?Object.values(chapterData)[nId].id:null;
    console.log("ID",nextId)
    console.log("Pid",prevId)
    const nextTitle=nextId?chapterData.length>0?Object.values(chapterData)[nId].attributes.title?Object.values(chapterData)[nId].attributes.title:`CH${Object.values(chapterData)[nId].attributes.chapter}`:null:null;
    const prevTitle=prevId?chapterData.length>0?Object.values(chapterData)[pId].attributes.title?Object.values(chapterData)[pId].attributes.title:`CH${Object.values(chapterData)[pId].attributes.chapter}`:null:null;
    console.log("title",nextTitle)

  return (
    <>
    <Nav/>
    <div className=" mangaLatest flex justify-center content-center flex-col">
        <h1 className='text-center rubik font-bold text-lg' >{title}</h1>
        <div className="mangaLatest gap-[100px] flex justify-between mb-5">
        <div>{prevId?<button ><Link className='bg-[#b9080a] text-white p-3 rubik_thin rounded-md pl-5 pr-5 mr-3 mb-10' reloadDocument to={`/manga/chapter/${mangaid}/${prevId}/${prevTitle}?next=${prevId?parseInt(params.next)-1:null}`}>Prev</Link></button>:<></>}</div>
        <div>{nextId?<button  ><Link className='bg-[#b9080a] text-white p-3 rubik_thin rounded-md pl-5 pr-5 ' reloadDocument to={`/manga/chapter/${mangaid}/${nextId}/${nextTitle}?next=${nextId?parseInt(params.next)+1:null}`}>Next</Link></button>:<></>}</div>
        </div>
        <div className="w-[50%] content-center ml-auto mr-auto mt-3 ">
        {
            imageData && baseUrl&& chapterHash?
            
                Object.values(imageData).map((img,index)=>(
                    
                    <img key={index}  src={`${baseUrl}/data/${chapterHash}/${img}`} loading='lazy'/>
                    
                    
                ))
            :
            <h3>{imageData.length>0?"Loading":"Error"}</h3>
        }
        </div>
        <div className="mangaLatest gap-4 flex justify-between">
        <div>{prevId?<button ><Link className='bg-[#b9080a] text-white p-3 rubik_thin rounded-md pl-5 pr-5 mr-3' reloadDocument to={`/manga/chapter/${mangaid}/${prevId}/${prevTitle}?next=${prevId?parseInt(params.next)-1:null}`}>Prev</Link></button>:<></>}</div>
        <div>{nextId?<button  ><Link className='bg-[#b9080a] text-white p-3 rubik_thin rounded-md pl-5 pr-5 ' reloadDocument to={`/manga/chapter/${mangaid}/${nextId}/${nextTitle}?next=${nextId?parseInt(params.next)+1:null}`}>Next</Link></button>:<></>}</div>
        
        </div>
    </div>
    </>
  )
}

export default Chapter