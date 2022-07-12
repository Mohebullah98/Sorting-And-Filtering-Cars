import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
function Car(props) {
  return (
    <div>
      <div className="car">
        <img className="carImage" src={`${props.imageUrl}`} alt="" />
        <div className="carContents">
          <h3>
            {props.brand} {props.model}
          </h3>
          <p>Year: {props.year}</p>
          <p>Color: {props.color}</p>
          <p>
            <BsCurrencyDollar />
            {props.msrp}
          </p>
          <p>Rating: {props.rating}</p>
        </div>
      </div>
      <hr />
    </div>
  );
}
export default Car;
