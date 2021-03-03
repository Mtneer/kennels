import React from "react"
import { Route } from "react-router-dom"
import "./Kennel.css"
import { Home } from "./Home"

import { AnimalDetail } from "./animal/AnimalDetail"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"

import { EmployeeDetail } from "./employee/EmployeeDetail"
import { EmployeeForm } from "./employee/EmployeeForm"
import { EmployeeList } from "./employee/EmployeeList"
import { EmployeeProvider } from "./employee/EmployeeProvider"

import { LocationForm } from "./location/LocationForm"
import { LocationList } from "./location/LocationList"
import { LocationProvider } from "./location/LocationProvider"

import { CustomerList } from "./customer/CustomerList"
import { CustomerProvider } from "./customer/CustomerProvider"


export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        <Route exact path="/animals">
                            <AnimalList />
                        </Route>
                        <Route exact path="/animals/create">
                            <AnimalForm />
                        </Route>
                        <Route exact path="/animals/detail/:animalId(\d+)">
                            <AnimalDetail />
                        </Route>
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>

            {/* Render the employee list when http://localhost:3000/employees */}
            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees">
                        <EmployeeList />
                    </Route>
                    <Route exact path="/employees/create">
                        <EmployeeForm />
                    </Route>
                    <Route exact path="/employees/detail/:employeeId(\d+)">
                        <EmployeeDetail />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>

            {/* Render the location list when http://localhost:3000/locations */}
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
                <Route exact path="/locations/create">
                    <LocationForm />
                </Route>
            </LocationProvider>

            {/* Render the customer list when http://localhost:3000/customers */}
            <CustomerProvider>
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>
        </>
    )
}