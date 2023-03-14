import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import CoinsDetails from './Components/CoinsDetails'
import Coins from './Components/Coins'
import Exchanges from './Components/Exchanges'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/coins' element={<Coins/>}/>
        <Route  path='/Exchanges' element={<Exchanges/>}/>
        <Route  path='/coin/:id' element={<CoinsDetails/>}/>  
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App