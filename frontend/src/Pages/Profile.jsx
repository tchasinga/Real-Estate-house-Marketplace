import { useSelector } from "react-redux";

export default function Profile() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser);
  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-center my-7">Profile pages</h1>
      <form className="gap-3 flex flex-col">
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
          />
          {/* <h1 className="text-xl font-semibold">{currentUser.username}</h1>
          <p className="text-sm text-gray-500">{currentUser.email}</p> */}

         <input type="text" id="username"  placeholder="username" className="border p-3 rounded-lg"/>
         <input type="email" id="email"  placeholder="email" className="border p-3 rounded-lg"/>
         <input type="password" id="password"  placeholder="password" className="border p-3 rounded-lg"/>
         <button className="bg-slate-700 text-white rounded-lg p-3 uppercase">update</button>
      </form>
      <div className="flex justify-between mt-5 items-center">
        <span className="text-red-700 cursor-pointer text-sm">Delete Account</span>
        <span className="text-blue-600 cursor-pointer text-sm">Sing out</span>
      </div>
    </div>
  )
}
