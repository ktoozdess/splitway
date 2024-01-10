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


        // if( expenses.length > 1){
        //     for (let i = 0; i < expense.length; i++) {
        //         // if(expense[i].email == expense[i+1].email && count < expenses.length){
        //         if(count < expenses.length-1){
        //             count+=1
        //             sum += expense[i].amount
        //             // console.log(expense);
        //         }else{
        //             sumexpenses.push({'email' : expense[i].email, 'amount' : sum})
        //             // console.log({'email' : expense[i].email, 'amount' : sum});
        //             sum = 0
        //             count = 0
        //         }
        //     }
        // }

        const rendersumexpenses = () =>{
            if( expenses.length > 1){
                let sumexpenses = [];
                let sum = 0
                let count = 0
                for (let i = 0; i < expense.length; i++) {
                    // if(expense[i].email == expense[i+1].email && count < expenses.length){
                        count+=1
                    if(count < expenses.length){

                        sum += expense[i].amount
                        console.log(expense);
                    }else{
                        sum += expense[i].amount
                        sumexpenses.push({'email' : expense[i].email, 'amount' : sum})
                        // console.log({'email' : expense[i].email, 'amount' : sum});
                        sum = 0
                        count = 0
                    }
                }
                console.log(sumexpenses);
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


        // console.log(sumexpenses);

    return(
        <>
            {/* {
            sumexpenses.map((exp, index) =>(
                // console.log(exp)
                <div key={index}>
                <p>{exp.email} {exp.amount} {data.currency}</p>
            </div>
            ))
            } */}
            {rendersumexpenses()}

        </>
    )
}

export default Expenses