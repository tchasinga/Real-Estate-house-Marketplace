export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">

       <div className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
         <form className="flex flex-col gap-7">
              <div className="flex items-center gap-2 ">
                <label className="whitespace-nowrap">Search Term :</label>
                <input type="text" id='searchTerm' placeholder="Search...." className="border rounded-lg w-full p-2"/>
              </div>
              <div className="flex gap-2 flex-wrap text-xs">
                   <label>Types : </label>
                   <div className="flex gap-2">
                      <input type="checkbox" id='all' value="House" className="w-4"/>
                      <span>Rent & Sell</span>
                   </div>

                   <div className="flex gap-2">
                      <input type="checkbox" id='rent' value="House" className="w-4"/>
                      <span>Rent</span>
                   </div>

                   <div className="flex gap-2">
                      <input type="checkbox" id='sale' value="House" className="w-4"/>
                      <span>Sale</span>
                   </div>

                   <div className="flex gap-2">
                      <input type="checkbox" id='offer' value="House" className="w-4"/>
                      <span>Offer</span>
                   </div>
              </div>

              {/* SECOND SECTION OF FILTARING....*/}

              <div className="flex gap-2 flex-wrap text-xs">
                   <label>Amenities : </label>
                   <div className="flex gap-2">
                      <input type="checkbox" id='parking' value="House" className="w-4"/>
                      <span>Parking slot</span>
                   </div>

                   <div className="flex gap-2">
                      <input type="checkbox" id='furnished' value="House" className="w-4"/>
                      <span>Funished</span>
                   </div>
              </div>

              <div className="flex items-center gap-2">
                  <label>Sort :</label>
                  <select name="" id="sort_order" className=" border rounded-lg p-2">
                      <option>Price  high to low</option>
                      <option>Price  low to high</option>
                      <option>Latest</option>
                      <option>Oldest</option>
                  </select>
              </div>
              <button className="uppercase bg-zinc-800 p-3 text-center text-white rounded-3xl font-medium text-xs hover:bg-green-900 hover:scale-95 cursor-pointer">search house</button>
         </form>
       </div>

       <div className="">
         <h1 className="text-3xl font-semibold border-b p-3 text-slate-600">Your Listing result...</h1>
       </div>
    </div>
  )
}
