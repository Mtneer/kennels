import React from "react"
import "./Animal.css"

export const AnimalCard = ({animal, customer, location}) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <div className="animal__breed">{animal.breed}</div>
        <div className="customer__name">Owner: {customer.name}</div>
        <div className="location__address">Location: {location.name}</div>
    </section>
)