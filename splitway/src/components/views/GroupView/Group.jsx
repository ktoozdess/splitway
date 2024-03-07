import styles from './Group.module.scss'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, query, arrayUnion, setDoc, deleteDoc, arrayRemove  } from 'firebase/firestore'
import db from "../../../service/firebase.js"
import { Link } from "react-router-dom";
import HeaderHome from '../../headerhome/HeaderHome';
import settings from '../../../assets/settings.svg'
import morevert from '../../../assets/morevert.svg'
import close from '../../../assets/close.svg'
import Expenses from './components/Expenses.jsx';
import { useContext } from 'react';
import { Context } from "../../../context/AuthContext";
import { v4 as uuidv4 } from 'uuid';

const Group = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {user} = useContext(Context)
    const [data, setData] = useState([])
    const [ussers, setUssers] = useState([])
    const [members, setMembers] = useState([])
    const [expenses, setExpenses] = useState([])
    const [NewMember, SetNewMember] = useState('')
    const [expensetitle, Setexpensetitle] = useState('')
    const [expenseamount, Setexpenseamount] = useState(0)
    const [Userswo, SetUserswo] = useState([])
    const [GroupName, SetGroupName] = useState('')
    const [Switchmethod, SetSwitchmethod] = useState('equally')
    const [successtrack, Setsuccesstrack] = useState(false)
    const [benefitforme, Setbenefitforme] = useState(0)
    useEffect(() =>{
        let libusers = []
        let libuserswo = []
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
                }

              SetUserswo(libuserswo)
            })
            Object.values(members).map((member) =>{
              if(member.email !== user.email){
                  libuserswo.push(member)
                }
          })
        }
        const FetchUser = async() =>{
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              libusers.push(doc.data())
            });
            setUssers(libusers)

          }
        FetchUser()
        FetchData()
        totalamount()
        Setsuccesstrack(false)
        Setexpensetitle('')
        SetGroupName('')
        SetNewMember('')
        Setexpenseamount(0)
    }, [successtrack])

    const UpdateData = async() =>{
        const result = ussers.filter((user) => user.email == NewMember);
        const tested = members.filter((user) => user.email == NewMember);
        if(result.length == 1 && tested.length == 0){
            await setDoc(doc(db, "groups", id), {
                members: arrayUnion({'email' : NewMember})
            },{merge: true})
            .then(() =>{
                Setsuccesstrack(true)
                document.querySelector('.add_member_block').classList.add('hidden')
                });

            }else{
            document.querySelector('.add_member_block').classList.add('hidden')
            alert('User not found or you want add user which already in this group')
            SetNewMember('')
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
    if(isNaN(expenseamount)){
        alert('Amount must be a number')
        Setexpenseamount(0)
    }
    const UpdateDataExpense = async() =>{
        const expenseuser = user.email
        const expenseId = uuidv4()

        if(expensetitle == ''){
            alert('Enter title')
        }else if(expenseamount == 0){
            alert('Enter amount')
        }else if(Switchmethod == 'equally'){
            const expamountsbequall = expenseamount / members.length
            let userowe = []
            Object.values(Userswo).map((Userswoo) =>{
                userowe.push({'email' : Userswoo.email, 'amount' : expamountsbequall, 'to': expenseuser})
            })
            await updateDoc(doc(db, "groups", id), {
                expenses: arrayUnion({docId: expenseId,expensetitle, expenseamount, timestamp, userlent: {}, userowes: userowe, expenseuser, Switchmethod: 'equally'})
            })
            .then(() =>{
                Setsuccesstrack(true)
                document.querySelector('.add_expense_block').classList.add('hidden')
            })
        }else if(Switchmethod == 'benefit'){
            const expamountsbequall = (expenseamount - benefitforme) / (members.length - 1)
                let userowe = []
                Object.values(Userswo).map((Userswoo) =>{
                    userowe.push({'email' : Userswoo.email, 'amount' : expamountsbequall, 'to': expenseuser})
                })
                await updateDoc(doc(db, "groups", id), {
                    expenses: arrayUnion({docId: expenseId, expensetitle, expenseamount, timestamp, userlent: {}, userowes: userowe, expenseuser, Switchmethod: 'equally'})
                })
                .then(() =>{
                    Setsuccesstrack(true)
                    document.querySelector('.add_expense_block').classList.add('hidden')
                })
        }else{
            alert('eerr')
        }


        // if(expensetitle !== '' && expenseamount !== 0 && Switchmethod == 'equally' && !(isNaN(expenseamount))){
        //     const expamountsbequall = expenseamount / members.length
        //     let userowe = []
        //     Object.values(Userswo).map((Userswoo) =>{
        //         userowe.push({'email' : Userswoo.email, 'amount' : expamountsbequall, 'to': expenseuser})
        //     })
        //     await updateDoc(doc(db, "groups", id), {
        //         expenses: arrayUnion({docId: expenseId,expensetitle, expenseamount, timestamp, userlent: {}, userowes: userowe, expenseuser, Switchmethod: 'equally'})
        //     })
        //     .then(() =>{
        //         Setsuccesstrack(true)
        //         document.querySelector('.add_expense_block').classList.add('hidden')
        //     })
        // }else if (Switchmethod == 'benefit'){
        //     const expamountsbequall = (expenseamount - benefitforme) / (members.length - 1)
        //     let userowe = []
        //     Object.values(Userswo).map((Userswoo) =>{
        //         userowe.push({'email' : Userswoo.email, 'amount' : expamountsbequall, 'to': expenseuser})
        //     })
        //     await updateDoc(doc(db, "groups", id), {
        //         expenses: arrayUnion({docId: expenseId, expensetitle, expenseamount, timestamp, userlent: {}, userowes: userowe, expenseuser, Switchmethod: 'equally'})
        //     })
        //     .then(() =>{
        //         Setsuccesstrack(true)
        //         document.querySelector('.add_expense_block').classList.add('hidden')
        //     })
        // } else{
        //     document.querySelector('.add_expense_block').classList.add('hidden')
        //     alert('Error')
        // }

    }
    const addmember = () =>{
        document.querySelector('.add_member_block').classList.remove('hidden')
    }
    const closewindowhandle = () =>{
        document.querySelector('.add_member_block').classList.add('hidden')
    }

    const addexpense = () =>{
        document.querySelector('.add_expense_block').classList.remove('hidden')
        Setsuccesstrack(true)
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
    const openbenefitopt = () =>{
        if (Switchmethod == 'benefit'){
            return(
                <div className={styles.benefit_opt_wrapper}>
                    <div className={styles.benefit_opt}>Me <input class="form-control"  value={benefitforme} onChange={(event) => Setbenefitforme(event.target.value)}  type="text" /> / {expenseamount}</div>
                    <div className={styles.benefit_opt}>Each <input disabled class="form-control"  value={(expenseamount - benefitforme) / (members.length - 1)}  type="text" /> / {expenseamount}</div>
                </div>
            )
        }
    }

    const LeaveGroupHandle = () =>{
            const LeaveGroup = async() =>{
                members.map(async(mem) =>{
                    if(mem.email == user.email){
                        await updateDoc(doc(db, "groups", id), {
                            members: arrayRemove({'email' : mem.email})
                            })
                    }
                })

                navigate('../homepage', { replace: true })
            }
        if(user && data.admin !== user.uid){
            return(
                <a class="btn btn-danger" onClick={LeaveGroup}>Leave Group</a>
            )
        }
    }
    const deleteExpense = (expense) =>{
        expenses.map(async(exp) =>{
            if(exp.email == expense.email){
                await updateDoc(doc(db, "groups", id), {
                    expenses: arrayRemove(expense)
                    })
                    Setsuccesstrack(true)
                }
        })
    }
    const deleteGroup = () =>{
        const deleteGroup = async() =>{
            await deleteDoc(doc(db, "groups", id));
            navigate('../homepage', { replace: true })
        }
        const updateGroupName = async() =>{
            if(GroupName !== ''){
                await updateDoc(doc(db, "groups", id), {
                    name: GroupName
                }).then(()=>{
                    closewindowhandleopt()
                    Setsuccesstrack(true)
                })

            }
        }
        if(user && data.admin == user.uid){
            return(
                <div className={styles.input_block_handle}>
                    <div  className={styles.input_group_wrapper}>
                        <a class="cursor-pointer mb-2" onClick={closewindowhandleopt}><img src={close} alt="X" /></a>
                        <input class="form-control" type="text" placeholder='Change group name'  value={GroupName} onChange={(event) => SetGroupName(event.target.value)}/>
                        <button onClick={updateGroupName} className="btn btn-secondary mt-2">Save</button>
                        <a class="btn btn-danger mt-2" onClick={deleteGroup}>Delete Group</a>
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            <HeaderHome />
            <div class="animate__animated animate__fadeIn" className={styles.main_wrapper}>
                <div class="add_member_block hidden">
                    <div className={styles.add_member_block_handle} >
                        <div className={styles.add_member_wrapper}>
                            <a class="cursor-pointer mb-2" onClick={closewindowhandle}><img src={close} alt="X" /></a>
                            <p>Add new member</p>
                            <input type="email" placeholder='Enter member`s email' value={NewMember} onChange={(event) => SetNewMember(event.target.value)} />
                            <div class="flex justify-center">
                            <a className={styles.btn_submit} onClick={UpdateData} >Add member</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add_expense_block hidden">
                    <div className={styles.add_expense_block_handle} >
                        <div className={styles.add_expense_wrapper}>
                        <a class="cursor-pointer mb-2" onClick={closewindowhandleexp}><img src={close} alt="X" /></a>
                            <p>Add new expense</p>
                            <div class="flex flex-row flex-wrap w-12/12 items-center">
                                <div class="flex flex-col m-2">
                                    <input class="form-control m-1" type="email" placeholder='Title of expense' value={expensetitle} onChange={(event) => Setexpensetitle(event.target.value)} />
                                    <input class="form-control m-1" type="text" placeholder='Amount of expense'  value={expenseamount} onChange={(event) => Setexpenseamount(event.target.value)} />
                                    <select class="form-select"
                                    onChange={event => SetSwitchmethod(event.target.value)}
                                    defaultValue={SetSwitchmethod}
                                    >
                                        <option value="equally" selected>Select split method</option>
                                        <option value="equally">Equally</option>
                                        <option value="benefit">Benefit</option>
                                        <option disabled value="3">Coming soon...</option>
                                    </select>
                                    {openbenefitopt()}
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <a className={styles.btn_submit} onClick={UpdateDataExpense} >Add expense</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="options_block hidden">
                    <div className={styles.options_block_handle} >
                        <div className={styles.options_wrapper}>
                            {LeaveGroupHandle()}
                            {deleteGroup()}
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
                             {member.id == data.admin ? <li className={styles.admincolor}>{member.email}</li> : <li className={styles.standartcolor}>{member.email}</li>}
                        </ul>
                        ))
                    }
                    <a className={styles.btn_submit} onClick={addmember} >Add member</a>
                        <Expenses expenses={expenses} data={data} />
                </div>
                <div className={styles.right_bar}>
                    <div className={styles.info_opt_etc}>
                        <a className={styles.btn_submit} onClick={addexpense}>Add an expense</a>
                        <p>Total amount: {totalamount()} {data.currency}</p>
                        <a style={{cursor: 'pointer'}} onClick={optionss}><img src={settings} alt="options" width="48px" /></a>
                    </div>
                    <div className={styles.expenses}>
                            {
                            expenses.map((expense, index) =>(
                                <Link to={`/expense/${expense.docId}`} className={styles.expense} key={index}>
                                <p>{expense.timestamp}</p>
                                <p>{expense.expensetitle}</p>
                                <p>{expense.expenseuser}</p>
                                <p>{expense.expenseamount} {data.currency}</p>

                                    <div class="dropdown text-end">
                                    <a href="#" class=" cursor-pointer d-flex link-body-emphasis text-decoration-none w-7" data-bs-toggle="dropdown" aria-expanded="false">
                                    { expense.expenseuser == user.email &&  <img src={morevert} width="30px" alt="more" />}
                                    </a>
                                    <ul class="dropdown-menu text-small animate__animated animate__fadeIn bg-lightbg">
                                        <li><a class="cursor-pointer dropdown-item" onClick={e => deleteExpense(expense)}>delete expense</a></li>
                                    </ul>
                                </div>

                            </Link>
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