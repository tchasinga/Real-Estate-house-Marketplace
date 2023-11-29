import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase.js'
import {useDispatch} from 'react-redux'
import {singInSuccess} from '../redux/user/userSlice.js'

export default function OAuth() {
    const dispatch = useDispatch()
    const handleGoogleclik = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res =  await fetch('http://localhost:4000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:result.user.displayName, email:result.user.email, photo: result.user.photoURL})
            })
            const data = await res.json()
            dispatch(singInSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <button onClick={handleGoogleclik} className="bg-red-700 text-white p-3 rounded-lg uppercase w-full">hang on with google</button>      
    </div>
  )
}
