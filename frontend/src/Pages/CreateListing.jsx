import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import {useSelector} from 'react-redux';
import { app } from '../firebase';

export default function CreateListing() {
    const currentUser = useSelector((state) => state.user?.user?.currentUser); // Updated selector usage
    const [files , setFiles] = useState([]);
    const [imageUploadImageError,  setImageUploadError] = useState(false);
    const [formData, setFormData] = useState({
       imageUrls:  [], 
    });
    const [uploading, setUploading] = useState(false);
   
    // Adding Imgae Logic to Uppload Img to the database
   const handlerImageSubmit = () => {
    if(files.length > 0 && files.length + formData.imageUrls.length < 8){
        setUploading(true)
        setImageUploadError(false)
        const promise = []
        for (let i = 0; i < files.length; i++){
            promise.push(storeImage(files[i]))
        }
        Promise.all(promise).then((urls) => {
            setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadError(false)
            setUploading(false)
        }).catch((err) =>{
            console.error(err)
            setImageUploadError("Image upload error (2 mb per image)")
        });
       
    }else{
        setImageUploadError("You can upload max 7 images")
        setUploading(false)
    }
   }
   const storeImage = async (file)=> {
    return new Promise((resolve, reject) => {
         const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );  
    })
   }

//    Removing Image from the database

const handlerRemoveimg = (index) =>{

    setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
}

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-medium text-center mt-3'><span className='text-slate-500 font-bold'>{currentUser.username}, </span>Add a new listing here</h1>
        <form className='flex  flex-col sm:flex-row gap-4 mt-6'>
            <div className="flex flex-col gap-3 flex-1">
                <input className='border p-2 rounded-lg ' id='name' maxLength='100' minLength='10' required placeholder='Name' type="text" />
                <textarea className='border p-2 rounded-lg ' id='description' required placeholder='Description...' type="text" />
                <input className='border p-2 rounded-lg ' id='adress' required placeholder='Adress...' type="text" /> 
               
            <div className="flex gap-2 flex-wrap"> 
               <div className="flex gap-2">
                    <input type="checkbox"  id='sale' className='w-4'/>
                    <span className='text-xs'>Sell</span>
                </div>
             <div className="flex gap-2">
                    <input type="checkbox"  id='rent' className='w-4'/>
                    <span className='text-xs'>rent</span>
                </div>
             <div className="flex gap-2">
                    <input type="checkbox"  id='parking' className='w-4'/>
                    <span className='text-xs'>Parking place</span>
                </div>
             <div className="flex gap-2">
                    <input type="checkbox"  id='furnished' className='w-4'/>
                    <span className='text-xs'>Furnished</span>
                </div>
             <div className="flex gap-2">
                    <input type="checkbox"  id='offer' className='w-4'/>
                    <span className='text-xs'>Offer</span>
                </div>
               </div>

               {/* Adding number of div element.... */}

               <div className="text-xs flex flex-wrap gap-4">
                <div className="flex items-center gap-1">
                    <input type="number" id='bedrooms' className='p-2 border-gray-300 rounded-lg' min='1' max='10' required/>
                    <span>Bed-rooms</span>
                </div>

                <div className="flex items-center gap-1">
                    <input type="number" id='bathrooms' className='p-2 border-gray-300 rounded-lg' min='1' max='10' required/>
                    <span>Bath-rooms</span>
                </div>

                <div className="flex items-center gap-1">
                    <input type="number" id='regularprice' className='p-2 border-gray-300 rounded-lg' min='1' max='10' required/>
                    <div className='flex flex-col items-center'>
                    <span>Regular-price</span>
                    <p className='text'>($ / month)</p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <input type="number" id='discountprice' className='p-2 border-gray-300 rounded-lg' min='1' max='10' required/>
                   <div className='flex flex-col items-center'>
                   <span>Discount-price</span>
                   <p className='text'>($ / month)</p>
                   </div>
                </div>
               </div>
            </div>

            {/* Adding new Last side of this code part */}

            <div className="flex flex-col flex-1 gap-3">
                 <p className='font-semibold'>Image : 
                 <span className='text-xs font-normal text-gray-600 ml-2'>The first Uploaded image will  be the cover (max 7)</span>
                </p>
            <div className="flex gap-3">
            <input onChange={(e) => setFiles(e.target.files)} type="file" className='p-2 border border-gray-300 rounded-lg' id='images' accept='image/*' multiple/>
                <button disabled={uploading} type='button' onClick={handlerImageSubmit} className='font-medium w-1/4 text-xs  text-green-700 border rounded-xl p-3'>{uploading ? 'Uploading...' : 'Upload data'}</button>
            </div>
            <p className='text-red-700 text-xs'>{imageUploadImageError &&  imageUploadImageError}</p>
            {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) =>(
                   <div key={url}  className="flex justify-between p-3 border items-center  ">
                        <img src={url} alt="Image listing" className='w-10 h-10 object-cover rounded-lg' />
                        <button type='button' onClick={()=> handlerRemoveimg(index)} className='text-red-700 p-2'>Delete image</button>
                   </div>
                ))
            }
            <button className='p-3 bg-cyan-900 text-white rounded-lg uppercase hover:bg-green-700'>Creat listing</button>
         </div>
        </form>
        
    </main>
  )
}
