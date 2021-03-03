import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"

export const EmployeeDetail = () => {
    const { getEmployeeById } = useContext(EmployeeContext)
    const history = useHistory()

    const [employee, setEmployee] = useState({})

	const {employeeId} = useParams();

    //useEffect - reach out to the world for something
    useEffect(() => {
    // console.log("EmployeeList: useEffect - getEmployees")
        getEmployeeById(employeeId)
        .then((response) => {setEmployee(response)})
    }, [])

    return (
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div className="employee__location">{employee.location?.name}</div>
        </section>
    )
}