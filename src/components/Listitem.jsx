import React from 'react'
import { Link } from 'react-router-dom';

function Listitem({manga}) {
    const getFirstEnTitle = (manga) => {
        const enTitleObj = manga.attributes.altTitles.find(title => title.hasOwnProperty('en'));
        return enTitleObj ? enTitleObj.en : manga.attributes.title.en ;
    };
    
    const firstEnTitles = getFirstEnTitle(manga);
    console.log(firstEnTitles)
  return (
    <>
    
        <div className='p-4 w-44 h-[350px] flex-[25%] border-black border-solid '>
        <Link to={`/manga/${manga.id}`}>
        <img className='object-contain h-[256px] mr-[4rem] ease-in duration-250 hover:h-[256px]' src={`https://mangadex.org/covers/${manga.id}/${(manga.relationships.find(rel => rel.type === "cover_art")).attributes.fileName}.256.jpg`} loading="lazy"/>
        
            <h3 className='text-[16px] font-semibold'>
                
                
            {firstEnTitles}
            
           </h3>
           </Link>
            </div>
    
    </>
  )
}

export default Listitem