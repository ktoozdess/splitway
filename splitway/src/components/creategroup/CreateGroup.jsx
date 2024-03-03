import styles from './CreateGroup.module.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { addDoc, collection, arrayUnion } from '@firebase/firestore';
import db from "../../service/firebase.js"
import { getAuth } from 'firebase/auth';
import React from 'react'


const Creategroup = () =>{
    const navigate = useNavigate()
    const auth = getAuth();
    const user = auth.currentUser;
    const [Groupname, setGroupname] = useState('')
    const [Switchcurrency, SetSwitchcurrency] = useState('USD')

    const creategrouphandle = async () =>{
        try {
            const docRef = await addDoc(collection(db, "groups"), {
                name: Groupname,
                admin: user.uid,
                members: arrayUnion({'email' : user.email, 'id' : user.uid}),
                expenses: [],
                currency: Switchcurrency,

            });
                navigate('../homepage', { replace: true })
            } catch (e) {
            console.error("Error adding document: ", e);
            }
    }
    return(
        <div class="animate__animated animate__fadeIn">
        <div className={styles.wrapper}>
            <Link class="dark:text-text-darktheme" className={styles.back_home_link} to={'/homepage'}> Back to home</Link>
        <div className={styles.form}>
            <p>Create Group</p>
            <input type="text" maxLength="14" value={Groupname} onChange={(event) => setGroupname(event.target.value)} placeholder='Group name' />
            <div className={styles.expense_right}>
                <select class="form-select" id="floatingSelectGrid"
                    onChange={event => SetSwitchcurrency(event.target.value)}
                    defaultValue={SetSwitchcurrency}>
                    <option value="USD" selected>Set currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                </select>
            </div>
            <a className={styles.btn_submit} onClick={creategrouphandle}>Create Group</a>
            </div>
        </div>
        </div>
    )
}

export default Creategroup