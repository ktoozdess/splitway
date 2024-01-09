import styles from './Group.module.scss'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, query, arrayUnion, setDoc } from 'firebase/firestore'
import db from "../../../service/firebase.js"
import { Link } from "react-router-dom";
import HeaderHome from '../../headerhome/HeaderHome';
import settings from '../../../assets/settings.svg'
import close from '../../../assets/close.svg'
import { getAuth } from 'firebase/auth';




const Group = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const auth = getAuth();
    const [data, setData] = useState([])
    const [ussers, setUssers] = useState([])
    const [members, setMembers] = useState([])
    const [expenses, setExpenses] = useState([])
    const [expense, setExpense] = useState([])
    const [NewMember, SetNewMember] = useState('')
    const [expensetitle, Setexpensetitle] = useState('')
    const [expenseamount, Setexpenseamount] = useState()
    const [expensesplitby, Setexpensesplitby] = useState('equally')
    const [Userswo, SetUserswo] = useState([]);

    useEffect(() =>{
        let libusers = []
        let libuserswo = []
        let libexpense = []

        const FetchUser = async() =>{
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              libusers.push(doc.data())
            });
            setUssers(libusers)

          }

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
              if(doc.id == id){
                setData(data)
                setMembers(data.members)
                setExpenses(data.expenses)
                Object.values(data.expenses).map((expense) =>{
                    Object.values(expense.userowes).map((expens) =>{
                        libexpense.push(expens)
                    })
                    setExpense(libexpense)
                })
              }
              Object.values(members).map((member) =>{
                if(member !== auth.currentUser.email){
                    libuserswo.push(member)
                  }
            })
            SetUserswo(libuserswo)
            console.log(expenses);

          });
        }
        FetchUser()
        FetchData()
        totalamount()

    }, [NewMember, expensetitle])


    const UpdateData = async() =>{
        const result = ussers.filter((user) => user.email == NewMember);
        if(result.length == 1){
            await updateDoc(doc(db, "groups", id), {
                members: arrayUnion(NewMember)
            })
            .then(() =>{
                SetNewMember('')
                document.querySelector('.add_member_block').classList.add('hidden')
            })
        }else{
            document.querySelector('.add_member_block').classList.add('hidden')
            alert('User not found')
        }
    }

    const event = new Date();
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const timestamp = event.toLocaleDateString('en-EN', options)

    var sum = 0;
    const totalamount = () =>{
        expenses.forEach(function(expense) {
            sum += parseInt(expense.expenseamount);
        });
        return sum
    }
    const UpdateDataExpense = async() =>{
        const expenseuser = auth.currentUser.email
        if(expensetitle !== '' && expenseamount !== 0 && expensesplitby == 'equally'){
            let userowe = []
            Object.values(Userswo).map(async(Userswoo) =>{
                userowe.push({'email' : Userswoo, 'amount' : '200'})
            })

            await updateDoc(doc(db, "groups", id), {
                expenses: arrayUnion({expensetitle, expenseamount, timestamp, userlent: {}, userowes: userowe, expenseuser, splitby: 'equally'})
            })
            .then(() =>{
                Setexpensetitle('')
                Setexpenseamount(0)
                document.querySelector('.add_expense_block').classList.add('hidden')
            })
        }else{
            document.querySelector('.add_expense_block').classList.add('hidden')
            alert('User not found')
        }

    }
    const addmember = () =>{
        document.querySelector('.add_member_block').classList.remove('hidden')
    }
    const closewindowhandle = () =>{
        document.querySelector('.add_member_block').classList.add('hidden')
    }

    const addexpense = () =>{
        document.querySelector('.add_expense_block').classList.remove('hidden')
    }
    const optionss = () =>{
        document.querySelector('.options_block').classList.remove('hidden')
    }
    const closewindowhandleexp = () =>{
        document.querySelector('.add_expense_block').classList.add('hidden')
    }
    const closewindowhandleopt = () =>{
        document.querySelector('.options_block').classList.add('hidden')
    }

    return(
        <div>
            <HeaderHome />
            <div className={styles.main_wrapper}>
                <div class="add_member_block hidden">
                    <div className={styles.add_member_block_handle} >
                        <div>
                            <a onClick={closewindowhandle}><img src={close} alt="close" /></a>
                        </div>
                        <div className={styles.add_member_wrapper}>
                            <p>Add new member</p>
                            <input type="email" value={NewMember} onChange={(event) => SetNewMember(event.target.value)} />
                            <a className={styles.btn_submit} onClick={UpdateData} >Add member</a>
                        </div>
                    </div>
                </div>
                <div class="add_expense_block hidden">
                    <div className={styles.add_expense_block_handle} >
                        <div>
                            <a onClick={closewindowhandleexp}><img src={close} alt="close" /></a>
                        </div>
                        <div className={styles.add_expense_wrapper}>
                            <p>Add new expense</p>
                            <div class="flex flex-row flex-wrap w-12/12 items-center">
                                <div class="flex flex-col m-2">
                                    <input class="form-control m-1" type="email" placeholder='Title of expense' value={expensetitle} onChange={(event) => Setexpensetitle(event.target.value)} />
                                    <input class="form-control m-1" type="text" placeholder='Amount of expense'  value={expenseamount} onChange={(event) => Setexpenseamount(event.target.value)} />
                                    <p>method: equally</p>
                                </div>
                            </div>
                            <a className={styles.btn_submit} onClick={UpdateDataExpense} >Add expense</a>
                        </div>
                    </div>
                </div>
                <div class="options_block hidden">
                    <div className={styles.options_block_handle} >
                        <div>
                            <a onClick={closewindowhandleopt}><img src={close} alt="close" /></a>
                        </div>
                        <div className={styles.options_wrapper}>
                            <p>Options</p>
                            <div class="flex flex-row flex-wrap w-12/12 items-center">
                                <div class="flex flex-col m-2">
                                    <p>switch</p>
                                    <p>switch</p>
                                </div>
                            </div>
                            <a className={styles.btn_submit}  >Save</a>
                        </div>
                    </div>
                </div>
                <p className={styles.group_name}>{data.name}</p>
                <div className={styles.bars}>
                <div className={styles.left_bar}>
                    <h3>Members</h3>
                    {
                        Object.values(members).map((member, index) =>(
                            <ul key={index} class="flex flex-col items-start content-start list-disc">
                            <li>{member}</li>
                        </ul>
                        ))
                    }
                    <a className={styles.btn_submit} onClick={addmember} >Add member</a>

                    <h3>Users who owe me</h3>
                    {
                        Object.values(expense).map((exp, index) =>(
                            <ul key={index} class="flex flex-col items-start content-start list-disc">
                            <li>{exp.email}</li>
                        </ul>
                        ))
                        //  expense.map((exp, index) =>(
                        //     <div className={styles.expense} key={index}>
                        //         <p>{exp.email}</p>

                        //     </div>
                        //     ))
                        }
                </div>
                <div className={styles.right_bar}>
                    <div className={styles.info_opt_etc}>
                        <a className={styles.btn_submit} onClick={addexpense}>Add an expense</a>
                        <p>Total amount: {totalamount()} {data.currency}</p>
                        <a onClick={optionss}><img src={settings} alt="options" width="48px" /></a>
                    </div>
                    <div className={styles.expenses}>
                            {
                            expenses.map((expense, index) =>(
                            <div className={styles.expense} key={index}>
                                <p>{expense.timestamp}</p>
                                <p>{expense.expensetitle}</p>
                                <p>{expense.expenseuser}</p>
                                <p>{expense.expenseamount} {data.currency}</p>
                            </div>
                            ))
                        }
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Group