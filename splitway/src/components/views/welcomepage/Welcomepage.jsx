import db from "../../../service/firebase.js"
import { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,updateProfile } from "firebase/auth";
import { setDoc, doc, getDocs, collection } from '@firebase/firestore';
import HeaderWelcome from "../../headerwelcome/HeaderWelcome.jsx"
import styles from './Welcomepage.module.scss'
import arrow_down from '../../../assets/arrow_circle_dropdown.svg'
import screen from '../../../assets/screenshot.png'
import googlelogo from '../../../assets/google_logo.svg'
import { useNavigate } from "react-router-dom";
import logoS from '../../../assets/logos/simple.png'
import close from '../../../assets/close.svg'

const Welcomepage = () => {
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const [usser, setUsser] = useState([])

  const libusers = []
  useEffect(() =>{
    const FetchUser = async() =>{
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
          const users ={
              id: doc.id,
              username: doc.data().username,
              profilePhoto: doc.data().profilePhoto
          }
          libusers.push(users)
          setUsser(libusers)
      });
    }
    FetchUser()
}, [])

const auth = getAuth();
const createuser = () => {
    if(password1 == password2){
        createUserWithEmailAndPassword(auth, email, password1)
        .then(async() =>{
            try {
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    id: auth.currentUser.uid,
                    email: email,
                    username: username,
                    profilePhoto: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg',
                });
                updateProfile(auth.currentUser, {
                    displayName: username,
                    photoURL: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg'
                }).then(() => {
                    console.log("Profile updated!");
                }).catch((error) => {
            // An error occurred
            });

            } catch (e) {
            console.error("Error adding document: ", e);
            }
            console.log('success');
            navigate('../homepage', { replace: true })
        })
        .catch((error) => {
            console.log(error);
        });
    }else{
        alert('Please enter correctly two passwords fields')
    }
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
  .then(async(result) => {
      try {
          if( Object.keys(usser.filter(user => user.id == result.user.uid)).length == 0 ){
          await setDoc(doc(db, "users", result.user.uid), {
              id: result.user.uid,
              email: result.user.email,
              username: result.user.displayName,
              profilePhoto: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg',
          });
          updateProfile(auth.currentUser, {
              displayName: result.user.displayName,
              photoURL: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg'
          }).then(() => {
              console.log("Profile updated!");

          }).catch((error) => {
          // An error occurred
          console.log(error);
      });
          }else{
              console.log('have');
          }
      } catch (e) {
      console.error("Error adding document: ", e);
      }
      navigate('../homepage', { replace: true })
  })
  .catch((error) => {
      // console.log(error.message);
  })
}
const loginuser = () =>{
  signInWithEmailAndPassword(auth, email, password1)
  .then(() => {

      console.log('success');
      navigate('../', { replace: true })
  })
  .catch((error) => {
  //   console.log(error);
  });
}
const closesignin = () =>{
  document.querySelector('.signin_wrapperr').classList.add('hidden')
  }

  return (
    <div  class="animate__animated animate__fadeIn">
      <HeaderWelcome />
      <div class="signin_wrapperr hidden">
      <div className={styles.signin_wrapper}>
      <div className={styles.form}>
          <a class="cursor-pointer" onClick={closesignin}><img src={close} alt="X" /></a>
              <div class="flex flex-col justify-center items-center content-center mb-2">
                <img src={logoS} alt="S." width="100px" />
                <p>Welcome to Splitway</p>
              </div>
                <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="email" placeholder='Email' value={ email } onChange={(event) => setEmail(event.target.value)}  />
                <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="password" placeholder='Password' value={ password1 } onChange={(event) => setPassword1(event.target.value)} />
                <a className={styles.btn_submit} onClick={loginuser}>Sign In</a>
                <a className={styles.btn_submit_google} onClick={signInWithGoogle}> <img src={googlelogo} alt="" /> Sign In with Google</a>
            </div>
          </div>
      </div>

      <div className={styles.main_wrapper}>
        <div className={styles.main_phrase}>
          <p>Main phrase</p>
        </div>
        <div className={styles.main_phrase_arrow}>
          <img class="animate__animated animate__heartBeat animate__slower animate__infinite" src={arrow_down} alt="next" />
        </div>
        <div className={styles.first_intro}>
          <div className={styles.l_side}>
            <img src={screen} alt="" />
          </div>
          <div className={styles.r_side}>
            <p>some text</p>
          </div>
        </div>

        <div className={styles.sec_intro}>
        <div className={styles.r_side}>
            <p>some text</p>
          </div>
          <div className={styles.l_side}>
            <img src={screen} alt="" />
          </div>
        </div>

        <div className={styles.third_intro}>
          <div className={styles.l_side}>
            <img src={screen} alt="" />
          </div>
          <div className={styles.r_side}>
            <p>some text</p>
          </div>
        </div>

        <div className={styles.signup_to}>
          <div className={styles.l_side}>
            <p>sign up to///</p>
          </div>
          <div className={styles.r_side}>
            <div id="Signup" className={styles.form}>
              <div class="flex flex-col justify-center items-center content-center mb-2">
                <img src={logoS} alt="S." width="100px" />
                <p>Welcome to Splitway</p>
              </div>
                <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="text" placeholder='Username' value={ username } onChange={(event) => setUsername(event.target.value)}  />
                <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="email" placeholder='Email' value={ email } onChange={(event) => setEmail(event.target.value)}  />
                <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="password" placeholder='Password' value={ password1 } onChange={(event) => setPassword1(event.target.value)} />
                <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="password" placeholder='Password again' value={ password2 } onChange={(event) => setPassword2(event.target.value)} />
                <a className={styles.btn_submit} onClick={createuser}>Sign Up</a>
                <a className={styles.btn_submit_google} onClick={signInWithGoogle}> <img src={googlelogo} alt="" /> Sign Up with Google</a>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Welcomepage
