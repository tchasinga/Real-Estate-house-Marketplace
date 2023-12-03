import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";

function ListingCard({ listing }) {
  return (
    <div className='bg-white overflow-hidden rounded-3xl gap-6 w-full sm:w-[330px]'>
        <Link className='' to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt={listing.name} className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 cursor-pointer'/>
            <div className='p-3 flex flex-col gap-2 w-full'>
                 <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
                 <div className='flex items-center gap-1'>
                 <MdLocationOn  className='h-4 w-4 text-green-600 '/>
                    <span className='text-xs text-gray-600 truncate w-full'>{listing.address}</span>
                 </div>
                 <p className='text-sm text-gray-600 line-clamp-3'>{listing.description}</p>
                 <p className='text-slate-700 font-semibold mt-2 flex items-center'>
                    $
                    {
                        listing.offer ? listing.discountPrice.toLocaleString('en-EU') : listing.regularPrice.toLocaleString('en-EU')
                    }
                    {listing.type === 'rent' && ' / month'}
                 </p>
                 <div className="text-slate-700 flex gap-4 items-center">
                   <div className="font-bold text-xs ">
                   {listing.bedRooms > 1 ? `${listing.bedRooms} beds ` : `${listing.bedRooms} bed `}
                   </div>
                 
                   <div className="font-bold text-xs ">
                   {listing.bathRooms > 1 ? `${listing.bathRooms} beds ` : `${listing.bathRooms} bed `}
                   </div>


                 </div>
            </div>
        </Link>
    </div>
  );
}

ListingCard.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discountPrice: PropTypes.number,
    offer: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    bedRooms: PropTypes.number.isRequired,
    bathRooms: PropTypes.number.isRequired,
  }).isRequired,
};

export default ListingCard;
