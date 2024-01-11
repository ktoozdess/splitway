import styles from './Header.module.scss'
import { Link } from 'react-router-dom'



const HeaderWelcome = () =>{

    return(
      <div className={styles.wrapper}>
        <a href="/">
            <img src="" width="200px" alt="SplitWay Logo" />
        </a>

        <div className="flex">
          <Link class="mx-2" to={'/signin'}>
             Log In
           </Link>
           <Link class="mx-2" to={'/signup'}>
             Sign Up
           </Link>
        </div>
      </div>
    )
}

export default HeaderWelcome