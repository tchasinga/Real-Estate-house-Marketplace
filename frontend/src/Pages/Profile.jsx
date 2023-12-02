import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {Link} from "react-router-dom";
import { app } from "../firebase.js";
import { updateUserSuccess, updateUserFailure, updateUserStart,  deleteUserStart,deleteUserSuccess,deleteUserFailure,signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice.js'

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingErrors, setshowListingErrors] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const currentUser = useSelector((state) => state.user?.user?.currentUser); // Updated selector usage
  const loading = useSelector((state) => state.user?.user?.loading); // Updated selector usage
  const error = useSelector((state) => state.user?.user?.error); // Updated selector usage

  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error(error);
        setFileUploadError(true);
      },
      () => {
        console.log("Upload is complete");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  // Updating User Information
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submitted Changes from different form
  const handlerSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const  res = await fetch(`http://localhost:4000/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === true) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      console.error(error);
      dispatch(updateUserFailure(error.message)); 
    }
  };
  
  // Delete Account user 
  const handlerdeleleAccount = async() => {
    try {
      const  res = await fetch(`http://localhost:4000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === true) {
        dispatch(deleteUserStart(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      deleteUserSuccess(true);
    } catch (error) {
      console.error(error);
      dispatch(deleteUserFailure(error.message)); 
    }
  }
   
  // handler Singout user 
  const handlerSingout = async() => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('http://localhost:4000/api/auth/signout')
      const data = await res.json();

      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(signOutUserFailure(error.message));
    }
  }
  
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // Show all listings in the database
  const handlerShowListings = async() => {
    try {
      setshowListingErrors(false);
      const res = await fetch(`http://localhost:4000/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === true) {
        setshowListingErrors(true);
        return;
      }
      setUserListings(data);
      setshowListingErrors(false);
      console.log(data);
      
    } catch (error) {
      showListingErrors(true);
    }
  }

  // Delete Image or Information from the listing 
  const handlerListingDelete = async(listingId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/addlisting/delete/${listingId}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if(data.success === true) {
        setFormData(data)
       console.log(data.success);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-center my-7">Profile pages</h1>
      <form  onSubmit={handlerSubmit} className="gap-3 flex flex-col">
        <img
          src={formData.avatar || currentUser.avatar}
          alt="avatar"
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-500">
              Failed to upload image. Please try again. {currentUser?.username} (Your image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-950">Uploading image...{filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className="text-green-500">Image uploaded successfully.</span>
          ) : null}
        </p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase">
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link to="/create-list" className="text-sm bg-slate-500 text-white uppercase p-3 text-center rounded-lg font-medium">Create list</Link>
      </form>
      <div className="flex justify-between mt-5 items-center">
        <span  onClick={handlerdeleleAccount} className="text-red-700 cursor-pointer text-sm">Delete Account</span>
        <span onClick={handlerSingout} className="text-blue-600 cursor-pointer text-sm">Sign out</span>
      </div>
      <p className="text-sm text-red">{error ? error : ''}</p>
      <p className="text-sm text-green-500">{updateSuccess ? 'Update Success ! ' : ''}</p>
       <button onClick={handlerShowListings} className="bg-slate-700  text-white mb-7 rounded-lg p-3 w-full text-xs mt-3 font-medium uppercase">Show all list</button>
       <p className="text-red-700 mt-5">{showListingErrors ? 'You get some errors' : ''}</p>
         
         {/* get all  the user listings */}
         
         {userListings && userListings.map((listing) => {
      return (
         <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-3">
           <Link  to={`/listing/${listing._id}`}>
         <img className="h-16 w-16 object-contain rounded" src={listing.imageUrls[0]} alt="listImg" />
       </Link>
       <Link className="text-slate-700 text-sm font-medium truncate flex-1" to={`/listing/${listing._id}`}>
         <p className="">{listing.name}</p>
       </Link>

          <div className="flex flex-col items-center">
            <button onClick={()=>handlerListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
           <Link to={`/updating-listing/${listing._id}`}>
           <button className="text-blue-700 uppercase">Edit...</button>
           </Link>
          </div>
       </div>
      );
    })}
    </div>
  );
}