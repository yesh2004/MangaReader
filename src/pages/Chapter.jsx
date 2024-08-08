import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

function Chapter() {
    const { chapterid, title, mangaid } = useParams();
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries([...searchParams]);
    const [imageData, setImageData] = useState([]);
    const [baseUrl, setBaseUrl] = useState('');
    const [chapterHash, setChapterHash] = useState('');
    const [chapterData, setChapterData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const fetchChapterImages = () => {
        const uri = `https://api.mangadex.org/at-home/server/${chapterid}`;
        axios.get(uri)
            .then(res => {
                setImageData(res.data.chapter.data);
                setBaseUrl(res.data.baseUrl);
                setChapterHash(res.data.chapter.hash);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const fetchChapters = () => {
        if (isFetching || !hasMore) return;
        setIsFetching(true);

        const churi = `https://api.mangadex.org/chapter?manga=${mangaid}&includeFutureUpdates=1&order[volume]=asc&order[chapter]=asc&translatedLanguage[]=en&limit=100&offset=${offset}`;
        
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
                    setOffset(prevOffset => prevOffset + 100);
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
        fetchChapterImages();
        fetchChapters();
    }, []);

    useEffect(() => {
        if (chapterData.length > 0 && hasMore) {
            fetchChapters();
        }
    }, [offset]);

    const pId = parseInt(params.next) - 1;
    const nId = parseInt(params.next) + 1;

    const prevId = pId >= 0 ? chapterData.length > 0 ? chapterData[pId]?.id : null : null;
    const nextId = nId < chapterData.length ? chapterData[nId]?.id : null;

    const prevTitle = prevId ? chapterData[pId]?.attributes.title || `CH${chapterData[pId]?.attributes.chapter}` : null;
    const nextTitle = nextId ? chapterData[nId]?.attributes.title || `CH${chapterData[nId]?.attributes.chapter}` : null;

    return (
        <>
            <Nav />
            <div className="mangaLatest flex justify-center content-center flex-col">
                <h1 className='text-center rubik font-bold text-lg'>{title}</h1>
                <div className="mangaLatest gap-[100px] flex justify-between mb-5">
                    <div>
                        {prevId && (
                            <button>
                                <Link className='bg-[#b9080a] text-white p-3 rubik_thin rounded-md pl-5 pr-5 mr-3 mb-10' reloadDocument to={`/manga/chapter/${mangaid}/${prevId}/${prevTitle}?next=${prevId ? parseInt(params.next) - 1 : null}`}>Prev</Link>
                            </button>
                        )}
                    </div>
                    <div>
                        {nextId && (
                            <button>
                                <Link className='bg-[#b9080a] text-white p-3 rubik_thin rounded-md pl-5 pr-5' reloadDocument to={`/manga/chapter/${mangaid}/${nextId}/${nextTitle}?next=${nextId ? parseInt(params.next) + 1 : null}`}>Next</Link>
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-[50%] content-center ml-auto mr-auto mt-3">
                    {
                        imageData.length > 0 && baseUrl && chapterHash ?
                            imageData.map((img, index) => (
                                <img key={index} src={`${baseUrl}/data/${chapterHash}/${img}`} loading='lazy' />
                            ))
                            :
                            <h3>{imageData.length > 0 ? "Loading" : "Error"}</h3>
                    }
                </div>
                <div className="mangaLatest gap-4 flex justify-between">
                <div>
                        {prevId && (
                            <button>
                                <Link className='bg-[#b9080a] text-white p-3 rubik_thin rounded-md pl-5 pr-5 mr-3 mb-10' reloadDocument to={`/manga/chapter/${mangaid}/${prevId}/${prevTitle}?next=${prevId ? parseInt(params.next) - 1 : null}`}>Prev</Link>
                            </button>
                        )}
                    </div>
                    <div>
                        {nextId && (
                            <button>
                                <Link className='bg-[#b9080a] text-white p-3 rubik_thin rounded-md pl-5 pr-5' reloadDocument to={`/manga/chapter/${mangaid}/${nextId}/${nextTitle}?next=${nextId ? parseInt(params.next) + 1 : null}`}>Next</Link>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chapter;
