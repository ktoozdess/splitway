import styles from './Expense.module.scss'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query} from 'firebase/firestore'
import db from "../../../service/firebase.js"
import { Link } from "react-router-dom";
import HeaderHome from '../../headerhome/HeaderHome.jsx';
import { useContext } from 'react';
import { Context } from "../../../context/AuthContext.jsx";


const Expense = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {user} = useContext(Context)
    const [data, setData] = useState([])
    const [owes, setOwes] = useState([])
    useEffect(() =>{
        const FetchData = async() =>{
            const querySnapshot = await getDocs(query(collection(db, "groups")));
            querySnapshot.forEach((doc) => {
                const data ={
                    docId: doc.id,
                    name: doc.data().name,
                    admin: doc.data().admin,
                    members: doc.data().members,
                    expenses: doc.data().expenses,
                    currency: doc.data().currency
                }
                Object.values(doc.data().expenses).map((expense) =>{
                    if(expense.docId == id){
                        setData(expense)
                        setOwes(expense.userowes)
                      }
                })
            })
        }
        FetchData()
    }, [])
    return(
        <div>
            <HeaderHome />
            <Link className={styles.back_home_link} to={'/homepage'}> Back to home</Link>
            <div className={styles.bars}>
                <div className={styles.left_bar}>
                    <p><b>Title:</b> {data.expensetitle}</p>
                    <p><b>Split method:</b> {data.Switchmethod}</p>
                    <p><b>Amount:</b> {data.expenseamount}</p>
                    <p><b>Payment user:</b> {data.expenseuser}</p>
                    <p><b>Date:</b> {data.timestamp}</p>
                </div>
                <div className={styles.right_bar}>
                    <h2>Debts</h2>
                        {
                            owes.map((exp, index) =>(
                                <div className={styles.owe} key={index}>
                                    <p><b>{exp.email}</b> owe {exp.amount} to <b>{exp.to}</b></p>
                                </div>

                            ))
                        }
                </div>
                </div>
                </div>

    )
}

export default Expense