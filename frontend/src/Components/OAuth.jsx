import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase.js'
import {useDispatch} from 'react-redux'
import {singInSuccess} from '../redux/user/userSlice.js'
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleclik = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res =  await fetch('https://landind-service-estate.onrender.com/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:result.user.displayName, email:result.user.email, photo: result.user.photoURL})
            })
            const data = await res.json()
            dispatch(singInSuccess(data))
            navigate('/')
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