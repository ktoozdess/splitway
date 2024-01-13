import styles from './HeaderHome.module.scss'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth';
import logo from '../../assets/logos/logo.png'



const HeaderHome = () =>{
  const auth = getAuth();
  const user = auth.currentUser;

    return(
      <div className={styles.wrapper}>
        <Link to={'../homepage'}>
            <img src={logo} width="180px" alt="SplitWay" />
        </Link>
        <div className="flex">
          {
            user && <Link to={`/feed`} className={styles.profile_logo}><img src={user.photoURL} alt="profile"/></Link>
          }
        </div>
      </div>
    )
}

export default HeaderHome