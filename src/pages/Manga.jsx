import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';

function Manga() {
  const {mangaid}=useParams();
  let offset=0;
  let uri=`https://api.mangadex.org/manga/${mangaid}?includes[]=cover_art`
  const churi=`https://api.mangadex.org/chapter?manga=${mangaid}&includeFutureUpdates=1&order[volume]=asc&order[chapter]=asc&translatedLanguage[]=en&limit=100`
  const [data,setData]=useState([]);
  const [readmore,isReadMore]=useState(false)
  const[chapterData,setChapterData]=useState([])
  let lop=true;
  
  useEffect(()=>{
        
    axios.get(uri).then(res =>{
        
        
        
        
        setData(res.data.data)
        
    }).catch((err)=>{console.log(err)})
    axios.get(churi).then(res =>{
        
        
        
        
      setChapterData(res.data.data)
      
  }).catch((err)=>{console.log(err)})
  
  
  
},[])



const getFirstEnTitle = (manga) => {
  const enTitleObj = manga.attributes.altTitles.find(title => title.hasOwnProperty('en'));
  return enTitleObj ? enTitleObj.en : manga.attributes.title.en ;
};
//console.log(Object.values(chapterData).length>0?Object.values(chapterData)[2].id:null)

const FirstEnTitle=data.relationships? getFirstEnTitle(data):"undifines";


  return (
    <>
    <Nav/>
    <section className='mangaLatest '>
    {
      data.relationships && data.relationships.length > 0?
      <>
    <div className="mt-10 bg-white p-5 text-[#000] flex ">
      <img className='object-contain h-[256px] mr-[4rem] ease-in duration-250 ' src={`https://mangadex.org/covers/${data.id}/${data.relationships.find(rel => rel.type === "cover_art").attributes.fileName}.256.jpg`} alt="" loading="lazy" />
      <div>
      <h2 className='text-[24px] font-bold rubik'>{FirstEnTitle}</h2>
      <p><span className='text-lg font-semibold rubik'>Genre:</span>{data.attributes.tags.map((tag,index)=>(
    <span key={index} className='mr-3 font-sans bg-black text-white p-0.5  rounded pl-1 pr-1 rubik_thin'>{tag.attributes.name.en}</span>
  ))}</p>
  <p className='text-[24px] font-bold rubik_thin'>Description</p>
      <p className='rubik_thin'>{data.attributes.description.en?!readmore?data.attributes.description.en.substring(0,500):data.attributes.description.en:"No Description"}</p>
      <p><span className='text-[18px] font-bold rubik_thin'>Status :</span><span className='uppercase'>{data.attributes.status?data.attributes.status:""}</span></p>
      </div>
      
    </div>
    <div className="">
      
    </div>
    </>:
    <h2>No data</h2>
    }
    <div className="mt-5 bg-white text-black p-3 list-none w-[80%] m-auto max-h-screen overflow-y-auto">
    {
      chapterData.length>0?
      
      Object.values(chapterData).map((chapter,index)=>( 
        
        
      <li key={chapter.id} data-next-chapter-id={index<Object.values(chapterData).length-1?Object.values(chapterData)[index+1].id:null} className='odd:bg-gray-100 test-[32px] m-auto pt-1 pb-1 pl-7 hover:text-[#b9080a]'><Link key={index} to={`/manga/chapter/${mangaid}/${chapter.id}/${chapter.attributes.title?chapter.attributes.title:`CH${chapter.attributes.chapter}`}?next=${index}`} >CH:{chapter.attributes.chapter}-{chapter.attributes.title}</Link></li>
      )
        
      )
      
      :
      <h3>No Chapters Found</h3>
    }
    </div>
    </section>
    </>
  )
}

export default Manga