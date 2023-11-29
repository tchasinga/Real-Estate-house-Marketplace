import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signing from './Pages/Signing'
import SignOut from './Pages/SignUp'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Header from './Components/Header'


function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
     <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sing-in' element={<Signing/>}/>
        <Route path='/sign-up' element={<SignOut/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile />}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
