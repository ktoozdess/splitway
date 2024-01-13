
import styles from './Feed.module.scss'
import { Link } from 'react-router-dom'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import db from "../../../service/firebase.js"
import HeaderHome from '../../headerhome/HeaderHome.jsx';

const FeedPage = () =>{
    const auth = getAuth();
    const [usser, setUsser] = useState([])
    useEffect(() =>{

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log('success');
        } else {
          console.log('no');
        }
      });
      const FetchUser = async() =>{
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if (doc.id == auth.currentUser.uid){
            setUsser(doc.data())
          }
        });
      }

      FetchUser()

  }, [])



    const navigate = useNavigate()

    const logout = () =>{
        signOut(auth).then(() => {
            console.log('signout successful');
            navigate('../', { replace: true })
        }).catch((error) => {
            console.log(error);
        });
    }

    const alertupdateprofile = () =>{
      if ( usser.name == '' || usser.surname == '' || usser.bio == '', usser.location){
        setTimeout(() => {
          document.querySelector('.alert').classList.add('hidden')
        }, 4000);
      return(
        <div class="alert alert-light w-8/12 m-auto flex justify-center animate__animated animate__fadeInDown" role="alert">
          <p>Update your profile in settings to enter your Name, Surname etc!</p>
        </div>
      )
      }
    }


    return(
      <div class="animate__animated animate__fadeIn">
        <HeaderHome />
      <div className={styles.wrapper}>
      {alertupdateprofile()}
        <div className={styles.feed_wrapper}>

          <div className={styles.profile}>
            <img src={usser.profilePhoto} className={styles.profile_logo} alt="profile photo" />
            <p>{usser.name} {usser.surname}</p>
            <p>@{ usser.username }</p>
            <p>Email: {usser.email}</p>
          </div>
          {/* <Link  to={'/updateprofile'} class="btn bg-[#54C3EA] mt-4">Update profile</Link> */}
          <button class="btn bg-[#F76806] mt-4" onClick={logout}>logout</button>
        </div>
      </div>

      </div>
    )
}

export default FeedPage