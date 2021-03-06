import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"

export const AnimalForm = () => {
    const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [animal, setAnimal] = useState({})
    // wait for data before burron is active
    const [isLoading, setIsLoading] = useState(true)

    const {animalId} = useParams()
    const history = useHistory()

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newAnimal = { ...animal }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newAnimal[event.target.id] = event.target.value
      // update state
      setAnimal(newAnimal)
    }

    const handleClickSaveAnimal = () => {
      
      // event.preventDefault() //Prevents the browser from submitting the form

      const locationId = parseInt(animal.locationId)
      const customerId = parseInt(animal.customerId)

      animal.locationId = locationId
      animal.customerId = customerId

      if (locationId === 0) {
        window.alert("Please select a location")
      } else {
        setIsLoading(true)
        if (animalId) {
          // PUT - update
          updateAnimal({
            id: animal.id,
            name: animal.name,
            breed: animal.breed,
            locationId: animal.locationId,
            customerId: animal.customerId
          })
          .then(() => history.push(`/animals/detail/${animal.id}`))
        } else {
          // POST - add
          //invoke addAnimal passing animal as an argument.
          //once complete, change the url and display the animal list
          addAnimal({
            name: animal.name,
            breed: animal.breed,
            locationId: animal.locationId,
            customerId: animal.customerId
          })
          .then(() => history.push("/animals"))
        }
      }
    }

    /*
    Reach out to the world and get customers state
    and locations state on initialization. 
    If animalId is in the URL, getAnimalById
    */
    useEffect(() => {
      getCustomers()
      .then(getLocations)
      .then(() => {
        if (animalId) {
          getAnimalById(animalId)
          .then(animal => {
            setAnimal(animal)
            setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    return (
      <form className="animalForm">
          <h2 className="animalForm__title">New Animal</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Animal name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Animal name" value={animal.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="breed">Animal animal__breed:</label>
                  <input type="text" id="breed" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Animal breed" value={animal.breed}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <select defaultValue={animal.locationId} name="locationId" id="locationId" className="form-control" onChange={handleControlledInputChange}>
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="customerId">Customer: </label>
                  <select defaultValue={animal.customerId} name="customer" id="customerId" className="form-control" onChange={handleControlledInputChange}>
                      <option value="0">Select a customer</option>
                      {customers.map(c => (
                          <option key={c.id} value={c.id}>
                              {c.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <button className="btn btn-primary" disable={isLoading}
            onClick={event => {
              event.preventDefault() 
              handleClickSaveAnimal()
            }}>
            {animalId ? <>Save Animal</> : <>Add Animal</>}
          </button>
      </form>
    )
}