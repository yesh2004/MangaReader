import React from 'react'
import { Link } from 'react-router-dom';

function Listitemtwo({manga}) {
    const getFirstEnTitle = (manga) => {
        const enTitleObj = manga.attributes.altTitles.find(title => title.hasOwnProperty('en'));
        return enTitleObj ? enTitleObj.en : manga.attributes.title.en ;
    };
    
    const firstEnTitles = getFirstEnTitle(manga);
    
  return (
    <>
    
        <div className='p-4 w-44 h-[350px] flex-[33%] border-black border-solid  '>
        <Link to={`/manga/${manga.id}`} className='flex bg-gray-100 text-black p-5 '>
        <img className='object-contain h-[100px] mr-[4rem] ease-in duration-250 hover:h-[256px] ' src={`https://mangadex.org/covers/${manga.id}/${(manga.relationships.find(rel => rel.type === "cover_art")).attributes.fileName}.256.jpg`} loading="lazy"/>
        
            <h3 className='text-[12px] font-semibold'>
                
                
            {firstEnTitles}
            
           </h3>
           </Link>
            </div>
    
    </>
  )
}

export default Listitemtwo