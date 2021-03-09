import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { LocationContext } from "./LocationProvider"
import "./Location.css"


export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)

	const [location, setLocation] = useState({})

	const {locationId} = useParams();
	const history = useHistory();

  useEffect(() => {
    console.log("useEffect", locationId)
    getLocationById(locationId)
    .then((response) => {
        console.log(response)
      setLocation(response)
    })
    }, [])

    console.log({location})
    return (
        <>
            <section className="location">
                <h3 className="location__name">{location.name}</h3>
                <div className="location__address">{location.address}</div>
                <h5 className="employee__header">Employees</h5>
                <div className="location__address">
                    {location.employees?.map(employee => <p>{employee.name}</p>)}
                </div>
                <h5 className="animal__header">Current Residents</h5>
                <div className="location__address">
                    {location.animals?.map(animal => <p>{animal.name}</p>)}
                </div>
            </section>
        </>
    )
}