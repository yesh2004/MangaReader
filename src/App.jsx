import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Manga from './pages/Manga'
import Chapter from './pages/Chapter.jsx'
import Search from './pages/Search.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/manga/:mangaid' element={<Manga/>} />
        <Route path='/manga/chapter/:mangaid/:chapterid/:title' element={<Chapter/>} />
        <Route path='/search' element={<Search/>} />
      </Routes>
    
  )
}

export default App
