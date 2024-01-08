import HeaderHome from "../../headerhome/HeaderHome"
import styles from './homepage.module.scss'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, query } from 'firebase/firestore'
import db from "../../../service/firebase.js"
import addcircle from '../../../assets/add_circle.svg'
import { Link } from "react-router-dom";


const Home = () =>{
    const navigate = useNavigate()
    const auth = getAuth();
    const [usser, setUsser] = useState([])
    const [data, setData] = useState([])
    const libdata = []
    useEffect(() =>{
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
    useEffect(()=>{
      const FetchData = async() =>{
        const querySnapshot = await getDocs(query(collection(db, "groups")));
        querySnapshot.forEach((doc) => {
            const datas ={
                docId: doc.id,
                name: doc.data().name,
                admin: doc.data().admin,
                members: doc.data().members
            }
            const leng = (datas.members.filter((member) => member.user == usser.email)).length
            if (leng !== 0) {
              libdata.push(datas)
              setData(libdata)
            }
        });
      }
      FetchData()
    },[usser])
    const mygroups = data.map((group, index) => {
      return(
        <Link to={`/group/${group.docId}`} className={styles.list_item} key={index}>
          <p>{group.name}</p>
          {
            Object.values(group.members).map((member, index) =>(
              <ul key={index} class="flex flex-col items-start content-start list-disc">
                <li>{member.user}</li>
              </ul>
            ))
          }
        </Link>
      )
    })
    return(
        <div>
            <HeaderHome />
            <div className={styles.main_wrapper}>
                <h3>My Groups</h3>
                <div className={styles.list_groups}>
                    {mygroups}
                    <div className={styles.add_list_item}>
                      <Link to={'/creategroup'}><img src={addcircle} alt="add" /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home