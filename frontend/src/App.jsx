import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signing from './Pages/Signing'
import SignOut from './Pages/SignUp'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './Pages/CreateListing'
import UpdatingListing from './Pages/UpdatingListing'
import Listing from './Pages/Listing'
import Search from './Pages/Search'


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
        <Route path='/listing/:listingId' element={<Listing />}/>
        <Route path='/search' element={<Search />}/>
        
        <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/create-list' element={<CreateListing />}/>
        <Route path='/updating-listing/:listingId' element={<UpdatingListing/>}/>
        </Route>
        
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
