import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Load from '../animation/Load';
import Messagingyourerrors from '../errors/Messagebugs';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';

export default function Listing() {
    // Initialize Swiper modules to be used here
    SwiperCore.use([Navigation]);
    // Initialize Swiper reserved variables here
const params = useParams();
const [listing, setListing] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

    useEffect(() => {
         const fetchListing = async () => {
              try {
                setLoading(true);
                const res = await fetch(`http://localhost:4000/api/addlisting/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false) {
                setError(true);
                setLoading(false);
                  return;
            }
             setListing(data);
             setLoading(false);
             setError(false);
              } catch (error) {
                setError(true);
                setLoading(false);
              }
         };
            fetchListing();
    } , [params.listingId])

    return (
        <main>
          {loading && <h1 className='LoadingpageContainer'><Load/></h1>}
          {error && <h1 className='LoadingpageContainer'><Messagingyourerrors/></h1>}
          {listing && !loading && !error && (
            <div className="">
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                     <div className="h-[550px]" style={{background: `url(${url}) center no-repeat`, backgroundSize:'cover'}}>
                         
                     </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </main>
      );
}
