import React, { useState } from "react";
import Caro from "./Caro";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Multiselect from "react-bootstrap-multiselect";
// import Button from "react-bootstrap/Button";
function App() {
  function Car(model, year, brand, color, msrp, rating) {
    this.model = model;
    this.year = year;
    this.brand = brand;
    this.color = color;
    this.msrp = msrp;
    this.rating = rating;
  }
  const Camaro = new Car("Camaro", 2018, "Chevy", "black", 49000, 4.5);
  const Mustang = new Car("Mustang", 2022, "Ford", "gray", 49000, 4.4);
  const Corvette = new Car("Corvette", 2021, "Chevy", "orange", 88000, 4.8);
  const Charger = new Car("Charger", 2020, "Dodge", "black", 56000, 4.2);
  const Challenger = new Car("Challenger", 2019, "Dodge", "green", 49000, 4);
  const GT = new Car("GT", 2017, "Ford", "blue", 120000, 5);
  const [cars, setCars] = useState([
    Camaro,
    Mustang,
    Corvette,
    Charger,
    Challenger,
    GT
  ]);
  //turn array of objects into specified array of values(So make array of colors from cars array)
  function turnEntries(arr, val) {
    return arr.reduce((acc, a) => {
      acc.push(a[val]);
      // console.log(a);
      return acc;
    }, []);
  }
  function sortCars(val) {
    let sortedCars = [...cars];
    if (val === 1) {
      //price High to low
      sortedCars = [...cars].sort((a, b) => {
        if (a.msrp > b.msrp) return -1;
        if (a.msrp < b.msrp) return 1;
        return 0;
      });
    }
    if (val === 2) {
      //price low to high
      sortedCars = [...cars].sort((a, b) => {
        if (a.msrp > b.msrp) return 1;
        if (a.msrp < b.msrp) return -1;
        return 0;
      });
    }
    if (val === 3) {
      //alphabetical order
      sortedCars = [...cars].sort((a, b) => {
        if (a.model > b.model) return 1;
        if (a.model < b.model) return -1;
        return 0;
      });
    }
    setCars(sortedCars);
  }
  function filterCars(value) {
    console.log(value);
    let filteredCars = [...cars];
    if (!isNaN(value)) {
      filteredCars = [...cars].filter((car) => car.rating > value);
    } else {
      filteredCars = [...cars].filter((car) =>
        Object.values(car).includes(value)
      );
    }
    setCars(filteredCars);
  }
  return (
    <div className="resultContainer">
      <DropdownButton
        variant="secondary"
        id="dropdown-basic-button"
        title="Sort"
        style={{ display: "inline-block" }}
      >
        <Dropdown.Item onClick={() => sortCars(1)}>
          Price: High to Low
        </Dropdown.Item>
        <Dropdown.Item onClick={() => sortCars(2)}>
          Price: Low to High
        </Dropdown.Item>
        <Dropdown.Item onClick={() => sortCars(3)}>Alphabetical</Dropdown.Item>
      </DropdownButton>
      <DropdownButton
        variant="secondary"
        id="dropdown-basic-button"
        title="Filter"
        style={{
          display: "inline-block",
          marginLeft: "10px",
          fontWeight: "bold"
        }}
      >
        <Dropdown.Header>Color</Dropdown.Header>
        {[...new Set(turnEntries(cars, "color"))].map((key, i) => (
          <Dropdown.Item onClick={() => filterCars(key)}>{key}</Dropdown.Item>
        ))}
        <Dropdown.Header>Brand</Dropdown.Header>
        {[...new Set(turnEntries(cars, "brand"))].map((key, i) => (
          <Dropdown.Item onClick={() => filterCars(key)}>{key} </Dropdown.Item>
        ))}
        <Dropdown.Header>Year</Dropdown.Header>
        {[...new Set(turnEntries(cars, "year"))].sort().map((key) => (
          <Dropdown.Item onClick={() => filterCars(key)}>{key}</Dropdown.Item>
        ))}
        <Dropdown.Header>Rating</Dropdown.Header>
        <Dropdown.Item onClick={() => filterCars(4.5)}>
          Highly Rated
        </Dropdown.Item>
      </DropdownButton>
      <div className="scrollableResults">
        {[...cars].map((car, i) => (
          <Caro
            model={car.model}
            year={car.year}
            brand={car.brand}
            color={car.color}
            rating={car.rating}
            msrp={car.msrp}
            imageUrl={"/images/" + car.model + ".jpg"}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
