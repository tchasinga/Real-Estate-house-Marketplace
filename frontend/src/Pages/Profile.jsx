import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  // console.log(fileUploadError)
  // console.log(filePerc)
  // console.log(formData)

  const currentUser = useSelector(
    (state) => state.user && state.user.user.currentUser
  );

  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        console.log("Upload is complete");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      },
      [formData]
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-center my-7">Profile pages</h1>
      <form className="gap-3 flex flex-col">
        <img
          src={formData.avatar || currentUser.avatar}
          alt="avatar"
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-500">
              Failed to upload image. Please try again. {currentUser.username}
            (Your image must be less than 2 mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-950">
              Uploading image...{filePerc}%
            </span>
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

        {/* <h1 className="text-xl font-semibold">{currentUser.username}</h1>
          <p className="text-sm text-gray-500">{currentUser.email}</p> */}

        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5 items-center">
        <span className="text-red-700 cursor-pointer text-sm">
          Delete Account
        </span>
        <span className="text-blue-600 cursor-pointer text-sm">Sing out</span>
      </div>
    </div>
  );
}
