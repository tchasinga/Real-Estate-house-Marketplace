import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Loadtwo from '../animation/Loadtwo'
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from "react-redux";
import { MdWavingHand } from "react-icons/md";
import ListingCard from '../Components/ListingCard';

export default function Home() {
  SwiperCore.use([Navigation]);
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser);
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:4000/api/addlisting/gettingdata?offer=true&limit=4`)
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
        setLoading(false)
      } catch (error) {
        // Handle error
      }
    }
  
    const fetchRentListings = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:4000/api/addlisting/gettingdata?type=rent&limit=4`)
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
        setLoading(false)
      } catch (error) {
        // Handle error
      }
    }
  
    const fetchSaleListings = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:4000/api/addlisting/gettingdata?type=sale&limit=4`)
        const data = await res.json()
        setSaleListings(data)
        setLoading(false)
      } catch (error) {
        // Handle error
      }
    }
  
    fetchOfferListings()
  }, [])
  




  return (
    <div>
    {/* Home deatials  */}

   <div className='flex flex-col gap-5 p-28 px-3 max-w-6xl mx-auto'>
   <div className="">
       <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">Is still feasible <span className="text-gray-500">to obtain</span> <br/> the home of your dreams</h1>
    </div>
    
     <div className="text-gray-400 text-xs sm:text-sm">
       <p>
          Land Estate is the best place to find your next home greatest place to live 
       </p>
       <p>We get the range of area for you to choose from our state...</p>
     </div>
     <Link to="/search" className="btn btn-primary text-xs text-blue-800 font-bold hover:underline">View Products now...</Link>
   </div>

    {/* Page Swipeer slider deatails and more...*/}

    <Swiper navigation>
    {loading && <h1 className='LoadingpageContainer'><Loadtwo/></h1>}
     {
       rentListings && rentListings.length > 0 && 
       rentListings.map((listing) => {
          return (
            <SwiperSlide key={listing._id}>
            <div className='h-[550px]'style={{background: `url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize: 'cover',}}>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <h1 className="text-white text-2xl font-bold">{listing.name}</h1>
              <Link to={`/listing/${listing._id}`} className="btn btn-primary text-xs text-blue-800 font-bold hover:underline">View Products now...</Link>
            </div>
            </div>
          </SwiperSlide>
          )
       })
     }
    </Swiper>

    {/* More product deatails and crosser out filter */}
      
   <div className="max-w-6xl mx-auto flex flex-col gap-8 my-10">
    {offerListings && offerListings.length > 0 && (
    <div className="">
      <div className="">
        <h1 className='text-xl font-semibold text-slate-700 flex items-center gap-3'>
          Hi <MdWavingHand className='text-yellow-600'/> {currentUser.username}, see the recent Offer
        </h1>
        <hr className='w-48 p-2'/>
        <Link to={`/search?offer=true`} className="btn btn-primary text-xs text-blue-800 font-bold hover:underline">
          View Products now...
        </Link>
      </div>
        <div className="flex flex-wrap gap-4 mt-5">
        {offerListings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
        </div>
    </div> 
  )}


{saleListings && saleListings.length > 0 && (
    <div className="">
      <div className="">
        <h1 className='text-xl font-semibold text-slate-700 flex items-center gap-3'>
          Hi <MdWavingHand className='text-yellow-600'/> {currentUser.username}, see the recent Sell
        </h1>
        <hr className='w-48 p-2'/>
        <Link to={`/search?type=sale`} className="btn btn-primary text-xs text-blue-800 font-bold hover:underline">
          View Products now...
        </Link>
      </div>
        <div className="flex flex-wrap gap-4 mt-5">
        {saleListings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
        </div>
    </div> 
  )}

{rentListings && rentListings.length > 0 && (
    <div className="">
      <div className="">
        <h1 className='text-xl font-semibold text-slate-700 flex items-center gap-3'>
          Hi <MdWavingHand className='text-yellow-600'/> {currentUser.username}, see the recent Rent
        </h1>
        <hr className='w-48 p-2'/>
        <Link to={`/search?offer=true`} className="btn btn-primary text-xs text-blue-800 font-bold hover:underline">
          View Products now...
        </Link>
      </div>
        <div className="flex flex-wrap gap-4 mt-5">
        {rentListings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
        </div>
    </div> 
  )}

</div>

    </div>
  )
}
