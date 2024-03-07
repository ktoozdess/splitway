import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import logo from '../../assets/logos/logo.png'



const HeaderWelcome = () =>{

  const signinhide = () =>{
    document.querySelector('.signin_wrapperr').classList.remove('hidden')
    }
    return(
      <div className={styles.wrapper}>
        <a href="/">
            <img src={logo} width="180px" alt="SplitWay" />
        </a>

        <div className="flex">
          <a class="mx-2 rounded-lg cursor-pointer" onClick={signinhide}>
             Log In
           </a>
           <a class="mx-2 rounded-lg" href='#Signup'>
             Sign Up
           </a>
        </div>
      </div>
    )
}

export default HeaderWelcome