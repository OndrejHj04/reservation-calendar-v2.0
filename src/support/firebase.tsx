import {initializeApp} from "firebase/app"
import  {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCWBAGCwPFPHi_RNYApa8n-mFCt1lprG-4",
  authDomain: "reservation-calendar-3a139.firebaseapp.com",
  projectId: "reservation-calendar-3a139",
  storageBucket: "reservation-calendar-3a139.appspot.com",
  messagingSenderId: "5681576630",
  appId: "1:5681576630:web:f6263c44d9233589998417",
};
const app =  initializeApp(firebaseConfig)
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
}