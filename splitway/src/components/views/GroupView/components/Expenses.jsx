import { useEffect ,useState } from "react"

const Expenses = ({expenses, data}) =>{
    const [expense, setExpense] = useState([])
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
            if( expenses.length > 1){
                let sumexpenses = [];
                let sum = 0
                let count = 0
                for (let i = 0; i < expense.length; i++) {
                        count+=1
                    if(count < expenses.length){
                        sum += expense[i].amount
                    }else{
                        sum += expense[i].amount
                        sumexpenses.push({'email' : expense[i].email, 'amount' : sum})
                        sum = 0
                        count = 0
                    }
                }
                return(
                    sumexpenses.map((exp, index) =>(
                        // console.log(exp)
                        <div key={index}>
                        <p>{exp.email} {exp.amount} {data.currency}</p>
                    </div>
                    ))
                )
            }else{
                return(
                    expense.map((exp, index) =>(
                        // console.log(exp)
                        <div key={index}>
                        <p>{exp.email} {exp.amount} {data.currency}</p>
                    </div>
                    ))
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