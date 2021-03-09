import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import { Employee } from "./Employee"
import "./Employee.css"

export const EmployeeList = () => {
  // This state changes when `getEmployees()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext)
  const history = useHistory()

  //useEffect - reach out to the world for something
  useEffect(() => {
    // console.log("EmployeeList: useEffect - getEmployees")
    getEmployees()
  }, [])

  return (
    <>
      <h2>Employees</h2>
      <button onClick={() => {history.push("/employees/create")}}>
        New Employee
      </button>
      <div className="employees">
        {/* {console.log("EmployeeList: Render", employees)} */}
        {
          employees.map(employee => {
            return <Employee key={employee.id} 
                employee={employee}
                />
          })
        }
      </div>
    </>
  )
}