import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import "./style.css"

const Challenge = () => {
    const [ name, setName ] = useState("")
    const [ position, setPosition ] = useState("manager")
    const [ employeeSelected, setEmployeeSelected ] = useState(0)
    const [ salary, setSalary ] = useState(0)
    const [ messageError, setMessageError ] = useState();
    const [ employees, setEmployees ] = useState([{
        name: "Manager principal", 
        position: "manager",
        salary: 6000,
        id: 4543,
        idBoss: null}])
    const [total, setTotal ] = useState(6000);

    useEffect(()=>{
        calculateTotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employees])

    const calculateTotal = () => {
        let totalSum = 0;
        employees.map((emp) => {
            return totalSum+=emp.salary
        })
        setTotal(totalSum)
    }

    const getRandomID = () => {
        return (Math.floor(Math.random() * (1 - 20000 + 1)) + 1)* -1;
    }

    const addJob = () => {
        if(name!==""&& salary!==""){
            if(employees.filter(f=>f.name===name).length!==0){
                setMessageError("This name exist please try other.")
                setTimeout(()=>{
                    setMessageError('')
                },3000)
            }else{
                const newEmployee = {
                    name: name, 
                    position: position===undefined?"manager":position,
                    salary:salary,
                    id: getRandomID(),
                    idBoss: employeeSelected===0?4543:parseInt(employeeSelected),
                }
                setEmployees([...employees, newEmployee])
            }
        }else{
            setMessageError("Please fill the fields.")
            setTimeout(()=>{
                setMessageError('')
            },3000)
        }
    }

    const removeItem = (id,opt) => {
        let newEmployees = []
        if(opt===0){
            newEmployees = employees.filter((obj) => {
                return obj.id !== id;
            });
        }else{
            newEmployees = employees.filter((obj) => {
                return obj.idBoss !== id && obj.id!==id;
            });
        }
        setEmployees(newEmployees)
    }

    return (
    <div className="container">
    <h4>This is a challenge</h4>
    <div className="container-form">
        <label htmlFor="name" className="text-float">Name</label>
            <input type="text" className="custom-input" id="name" onChange={(e)=>{setName(e.target.value)}}/>
        <label htmlFor="position" className="text-float">Position</label>
            <select id="position" className="custom-input" onChange={(e)=> {setPosition(e.target.value)}}>
                <option value="manager">Manager</option>
                <option value="developer">Developer</option>
                <option value="QA">QA Tester</option>
            </select>
        <label htmlFor="salary" className="text-float">Salary</label>
            <input type="text" className="custom-input" id="salary" onChange={(e)=>{setSalary(parseInt(e.target.value))}}/>
        <label htmlFor="foremploye" className="text-float">For employe</label>
            <select id="foremploye" className="custom-input" onChange={(e)=> {setEmployeeSelected(e.target.value)}}>
                {employees.map((employee, i)=>{
                    return(
                        employee.position==="manager"?<option value={employee.id} key={i}>{employee.name}</option>:""
                    )})}
            </select>
        <button className="add-button" onClick={()=>{addJob()}}>Add position</button> 
        <p>{messageError&&messageError}</p> 
    </div>
    <div className="text-float">
        <dl>
        <dt>{` ${employees[0].name}   $ ${employees[0].salary} `}</dt>
        {employees.filter(y=>y.id!==4543).map((emp,i)=> {
           return (
               <>
                    {!document.getElementById(emp.id)?<dt key={i}><FontAwesomeIcon icon={faXmark} onClick={()=>{removeItem(emp.id,1)}}/>{` ${emp.name}   $ ${emp.salary} `}</dt>:""}
                    {employees?.filter(x=>x.idBoss === emp.id && x.idBoss!==null).map((employee, index)=> {
                        return employee.id !== emp.id ?<dd key={index} id={employee.id}><FontAwesomeIcon icon={faXmark} onClick={()=>{removeItem(employee.id,0)}}/>{` -${employee.name}   $ ${employee.salary}`}</dd>:''
                    })}
               </>
           ) 
        })}
        </dl>
        <span>{`Total $ ${total}`}</span>
    </div>
    </div>)
}

export default Challenge