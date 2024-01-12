import styles from './Header.module.scss'
import { Link } from 'react-router-dom'



const HeaderWelcome = () =>{

    return(
      <div className={styles.wrapper}>
        <a href="/">
            <img src="" width="200px" alt="SplitWay" />
        </a>

        <div className="flex">
          <Link class="mx-2 rounded-lg" to={'/signin'}>
             Log In
           </Link>
           <Link class="mx-2 rounded-lg" to={'/signup'}>
             Sign Up
           </Link>
        </div>
      </div>
    )
}

export default HeaderWelcome