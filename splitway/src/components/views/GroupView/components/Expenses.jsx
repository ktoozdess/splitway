import { useEffect ,useState } from "react"
import { getAuth } from 'firebase/auth';
import styles from '../Group.module.scss'


const Expenses = ({expenses, data}) =>{
    const [expense, setExpense] = useState([])
    const auth = getAuth();
    let tempData = [];
    useEffect(() =>{
        let libexpense = []
        Object.values(expenses).map((expense) =>{
            Object.values(expense.userowes).map((expens) =>{
                libexpense.push(expens)
            })
            libexpense.sort((a, b) => a.email.localeCompare(b.email))
            setExpense(libexpense)
        })
    },[data])
        const rendersumexpenses = () =>{

            tempData = expense.filter((item)=>item.to == auth.currentUser.email)


                let sumexpenses = [];

            let result  = tempData.reduce((prev, item) => {
                if (item.email in prev){
                    prev[item.email] += item.amount
                }else{
                    prev[item.email] = item.amount
                }
                return prev
            }, {})

            Object.keys(result).forEach(item => {

                sumexpenses.push({'email' : item, 'amount' : result[item]})

            });
            if(tempData.length !== 0){
                return(
                    <div className={styles.expense_wrapper}>
                    <h3>Users who owe me:</h3>
                    {
                        sumexpenses.map((exp, index) =>(
                            <div key={index}>
                            <p>{exp.email} {Math.round(exp.amount * 10) / 10} {data.currency}</p>
                        </div>
                        ))
                    }
                    </div>
                    )
            }
        }

    return(
        <>


            {rendersumexpenses()}
        </>
    )
}

export default Expenses