import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import logo from '../../assets/logos/logo.png'



const HeaderWelcome = () =>{

    return(
      <div className={styles.wrapper}>
        <a href="/">
            <img src={logo} width="180px" alt="SplitWay" />
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