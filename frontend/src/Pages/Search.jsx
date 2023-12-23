import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loadtwo from "../animation/Loadtwo";
import Errors from "../animation/Errors";
import NewErrors from "../errors/NewErrors";
// import Errors from "../animation/Errors";
import '../errors/pers.css';
import ListingCard from "../Components/ListingCard";
import { FaHouseUser } from "react-icons/fa";

export default function Search() {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState([]);
  const [showMore , setShowMore] = useState(false);
// Initialisation side used for search is in the top 

// Adding function tha will  handler the show more button
const onShowManyClick = async () => {
  const numberOfListing = listing.length;
  const startIndex = numberOfListing;
  const urlParams = new URLSearchParams(location.search);
  urlParams.set('startIndex', startIndex);
  const searchQuery = urlParams.toString();
  const res = await fetch(`https://landind-service-estate.onrender.com/api/addlisting/gettingdata?${searchQuery}`);
  const data = await res.json();

  if (data.length < 9) {
    setShowMore(false);
  }
  setListing([...listing, ...data]);
};

const [sidebarData, setSidebarData] = useState({
  searchTerm: '',
  type: 'all',
  parking: false,
  furnished: false,
  offer: false,
  sort: 'created_at',
  order: 'desc',
});



// Adding a useEffect to get the search term from the url
useEffect(() =>{
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm');
  const typeFromUrl = urlParams.get('type');
  const parkingFromUrl = urlParams.get('parking');
  const furnishedFromUrl = urlParams.get('furnished');
  const offerFromUrl = urlParams.get('offer');
  const sortFromUrl = urlParams.get('sort');
  const orderFromUrl = urlParams.get('order');

  if(searchTermFromUrl || sortFromUrl || orderFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl){
    setSidebarData({ 
      searchTerm: searchTermFromUrl || '',
      type: typeFromUrl || 'all',
      parking: parkingFromUrl === 'true' ? true : false,
      furnished: furnishedFromUrl === 'true' ? true : false,
      offer: offerFromUrl === 'true' ? true : false,
      sort: sortFromUrl || 'created_at',
      order: orderFromUrl || 'desc',
    })
}
const fetchingListings = async () => {
  try {
    setLoading(true);
    setShowMore(false);
    const searchQuery = urlParams.toString();
    const res = await fetch(`https://landind-service-estate.onrender.com/api/addlisting/gettingdata?${searchQuery}`);
    const data = await res.json();

    if (data.length > 8) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }

    if (data.success === false) {
      setError(true);
      setLoading(false);
      return;
    }

    setListing(data);
    setLoading(false);
    setError(false);
  } catch (error) {
    setError(true);
    console.log(error);
    setLoading(false);
  }
};
fetchingListings();

 }, [location.search])



// ADDING A SEARCH FUNCTION WITH SUBMITING A FORM
const handlerChange = (e) => {
  const { id, value, checked } = e.target;

  if (id === 'all' || id === 'rent' || id === 'sale') {
    setSidebarData({ ...sidebarData, type: id });
  }

  if (id === 'searchTerm') {
    setSidebarData({ ...sidebarData, searchTerm: value });
  }

  if (id === 'parking' || id === 'furnished' || id === 'offer') {
    setSidebarData({ ...sidebarData, [id]: checked });
  }

  if (id === 'sort_order') {
    const sort = value.split('_')[0] || 'created_at';
    const order = value.split('_')[1] || 'desc';
    setSidebarData({ ...sidebarData, sort, order });
  }
};

const handlerSubmit = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams();
  urlParams.set('searchTerm', sidebarData.searchTerm);
  urlParams.set('type', sidebarData.type);
  urlParams.set('parking', sidebarData.parking);
  urlParams.set('furnished', sidebarData.furnished);
  urlParams.set('offer', sidebarData.offer);
  urlParams.set('sort', sidebarData.sort);
  urlParams.set('order', sidebarData.order);
  const searchQuery = urlParams.toString();
  navigation(`/search?${searchQuery}`);
}


  return (
    <div className="flex flex-col md:flex-row">
       <div className="p-6 border-b-2 md:border-r-2 w-full md:min-h-screen">
         <form onClick={handlerSubmit} className="flex flex-col gap-7">
              <div className="flex items-center gap-2 ">
                <label className="whitespace-nowrap">Search Term :</label>
                <input type="text" id='searchTerm' placeholder="Search...." value={sidebarData.searchTerm} onChange={handlerChange} className="border rounded-lg w-full p-2"/>
              </div>

              <div className="flex gap-2 flex-wrap text-xs">
                   <label>Types : </label>
                   <div className="flex gap-2">
                      <input type="checkbox" id='all' onChange={handlerChange} checked={sidebarData.type === 'all'} className="w-4"/>
                      <span>Rent & Sell</span>
                   </div>

                   <div className="flex gap-2">
                      <input type="checkbox" id='rent' className="w-4" onChange={handlerChange} checked={sidebarData.type === 'rent'}/>
                      <span>Rent</span>
                   </div>

                   <div className="flex gap-2">
                      <input type="checkbox" id='sale' className="w-4" onChange={handlerChange} checked={sidebarData.type === 'sale'}/>
                      <span>Sale</span>
                   </div>

                   <div className="flex gap-2">
                      <input type="checkbox" id='offer' className="w-4" onChange={handlerChange} checked={sidebarData.offer}/>
                      <span>Offer</span>
                   </div>
              </div>

              {/* SECOND SECTION OF FILTARING....*/}

              <div className="flex gap-2 flex-wrap text-xs">
                   <label>Amenities : </label>
                   <div className="flex gap-2">
                      <input type="checkbox" id='parking' className="w-4" onChange={handlerChange} checked={sidebarData.parking}/>
                      <span>Parking slot</span>
                   </div>

                   <div className="flex gap-2">
                      <input type="checkbox" id='furnished' className="w-4" onChange={handlerChange} checked={sidebarData.furnished}/>
                      <span>Funished</span>
                   </div>
              </div>

              <div className="flex items-center gap-2">
                  <label>Sort :</label>
                  <select onChange={handlerChange} defaultValue={'created_at_desc'} name="" id="sort_order" className=" border rounded-lg p-2">
                      <option value='regularPrice_desc'>Price  high to low</option>
                      <option value='regularPrice_asc'>Price  low to high</option>
                      <option value='regularPrice_desc'>Latest</option>
                      <option value='regularPrice_asc'>Oldest</option>
                  </select>
              </div>
              <button className="uppercase bg-zinc-800 p-3 text-center text-white rounded-3xl font-medium text-xs hover:bg-green-900 hover:scale-95 cursor-pointer">search house</button>
         </form>
       </div>

       <div className="mydes">
       <div className="flex items-center gap-0">
         <h1 className="text-2xl  font-semibold border-b  flex items-center p-3 text-slate-600">Available & General House:<span className="gap-5">{listing.length}</span></h1>
          <FaHouseUser className=""/>
     </div>
         {loading && <h1 className='LoadingpageContainer'><Loadtwo/></h1>}
          {error && <h1 className='LoadingpageContainer'><Errors/></h1>}
          <div className="">
             {!loading && listing.length === 0 && (
              <div className="flex flex-col gap-7 LoadingpageContainer">
                  <NewErrors/>
                <h1 className="text-xs font-semibold text-slate-600">No Listing found...</h1>
              </div>
             )}
          </div>
          <div className="mt-7 justify-center flex gap-5 flex-wrap w-full">
            {listing.map((list) => (
              <ListingCard key={list._id} listing={list} />
            ))}
            
            {showMore && (
          <div className="flex justify-center w-full">
         <button onClick={onShowManyClick} className="uppercase bg-zinc-800 p-3 text-center text-white rounded-3xl font-medium text-xs hover:bg-green-900 hover:scale-95 cursor-pointer">
                show-more
         </button>
         </div>
          )}

            </div>
       </div>
    </div>
  )
}