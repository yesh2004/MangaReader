import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';

function Manga() {
  const { mangaid } = useParams();
  const [data, setData] = useState([]);
  const [readmore, setReadMore] = useState(false);
  const [chapterData, setChapterData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 100;

  const uri = `https://api.mangadex.org/manga/${mangaid}?includes[]=cover_art`;

  const fetchMangaDetails = () => {
    axios.get(uri)
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchChapters = () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    const churi = `https://api.mangadex.org/chapter?manga=${mangaid}&includeFutureUpdates=1&order[volume]=asc&order[chapter]=asc&translatedLanguage[]=en&limit=${limit}&offset=${offset}`;
    
    axios.get(churi)
      .then(res => {
        const chapters = res.data.data;
        if (chapters.length > 0) {
          setChapterData(prevChapters => {
            const newChapters = chapters.filter(chapter => 
              !prevChapters.some(existingChapter => existingChapter.id === chapter.id)
            );
            return [...prevChapters, ...newChapters];
          });
          setOffset(prevOffset => prevOffset + limit);
        } else {
          setHasMore(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchMangaDetails();
    fetchChapters(); // Fetch initial chapters
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  useEffect(() => {
    if (chapterData.length > 0 && hasMore) {
      fetchChapters();
    }
    console.log("offser:",offset)
  }, [offset]); // Fetch more chapters whenever offset changes

  const getFirstEnTitle = (manga) => {
    const enTitleObj = manga.attributes.altTitles.find(title => title.hasOwnProperty('en'));
    return enTitleObj ? enTitleObj.en : manga.attributes.title.en;
  };

  const FirstEnTitle = data.relationships ? getFirstEnTitle(data) : "undefined";

  return (
    <>
      <Nav />
      <section className='mangaLatest'>
        {
          data.relationships && data.relationships.length > 0 ?
            <>
              <div className="mt-10 bg-white p-5 text-[#000] flex ">
                <img className='object-contain h-[256px] mr-[4rem] ease-in duration-250' src={`https://mangadex.org/covers/${data.id}/${data.relationships.find(rel => rel.type === "cover_art").attributes.fileName}.256.jpg`} alt="" loading="lazy" />
                <div>
                  <h2 className='text-[24px] font-bold rubik'>{FirstEnTitle}</h2>
                  <p><span className='text-lg font-semibold rubik'>Genre:</span>{data.attributes.tags.map((tag, index) => (
                    <span key={index} className='mr-3 font-sans bg-black text-white p-0.5  rounded pl-1 pr-1 rubik_thin'>{tag.attributes.name.en}</span>
                  ))}</p>
                  <p className='text-[24px] font-bold rubik_thin'>Description</p>
                  <p className='rubik_thin'>{data.attributes.description.en ? !readmore ? data.attributes.description.en.substring(0, 500) : data.attributes.description.en : "No Description"}</p>
                  <p><span className='text-[18px] font-bold rubik_thin'>Status :</span><span className='uppercase'>{data.attributes.status ? data.attributes.status : ""}</span></p>
                </div>
              </div>
              <div className="">
              </div>
            </>
            :
            <h2>No data</h2>
        }
        <div className="mt-5 bg-white text-black p-3 list-none w-[80%] m-auto max-h-screen overflow-y-auto mb-10">
          <h2 className='text-lg rubik '>Chapters:</h2>
          {
            chapterData.length > 0 ?
              chapterData.map((chapter, index) => (
                <li key={chapter.id} data-next-chapter-id={index < chapterData.length - 1 ? chapterData[index + 1].id : null} className='odd:bg-gray-100 test-[32px] m-auto pt-1 pb-1 pl-7 hover:text-[#b9080a]'>
                  <Link key={index} to={`/manga/chapter/${mangaid}/${chapter.id}/${chapter.attributes.title ? chapter.attributes.title : `CH${chapter.attributes.chapter}`}?next=${index}`}>CH:{chapter.attributes.chapter}-{chapter.attributes.title}</Link>
                </li>
              ))
              :
              <h3>No Chapters Found</h3>
          }
        </div>
      </section>
    </>
  );
}

export default Manga;
