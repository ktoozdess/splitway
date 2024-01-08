import styles from './HeaderHome.module.scss'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth';


const HeaderHome = () =>{
  const auth = getAuth();
  const user = auth.currentUser;

    return(
      <div className={styles.wrapper}>
        <a>
            <img src="" width="200px" alt="SplitWay Logo" />
            <Link to={'../homepage'}>Home</Link>
        </a>
        {/* <div className={styles.search}>
          <input type="text" class="border" placeholder='Search Groups' />
        </div> */}
        <div className="flex">
          {
            user && <Link to={`/feed`} className={styles.profile_logo}><img src={user.photoURL} alt="profile"/></Link>
          }
        </div>
      </div>
    )
}

export default HeaderHome