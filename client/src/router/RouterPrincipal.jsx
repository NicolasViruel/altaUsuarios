
import {Route, Routes, } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Error from '../Pages/Error/Error'
import ListaPersonas from '../Pages/ListaPersonas/ListaPersonas'




function RouterPrincipal() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/listaPersonas' element={<ListaPersonas/>} />
            <Route path='*' element={<Error/>} />
        </Routes>
    </>
      
  )
} 

export default RouterPrincipal 