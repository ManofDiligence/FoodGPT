import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// array for storing all the area in Hong Kong

export default function HomePage() {
  // Default value for the dropdown: Area
  // setSelectedOption is a arrow function
  // that set the default "state" to be the selectionOption's value
  const [selectedOption, setSelectedOption] = useState("Area");
  const [area, setArea] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://manofdiligence.github.io/Restaurant.json")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    fetch("https://manofdiligence.github.io/Areas.json")
      .then((response) => response.json())
      .then((result) => setArea(result))
      .catch((err) => console.error(err));
  }, []);

  // change the dropdown's title whenever the user selected other area
  const handleSelectChange = (eventKey) => {
    const selectedValue = eventKey;
    setSelectedOption(selectedValue);
    // print to see whether we get the value that chosen by the user
    console.log(selectedValue); // You can replace this with your desired function to handle the selected area
  };
  return (
    <div>
      <div>
        {/* created a dropdown and title it by user choice */}
        <DropdownButton title={selectedOption} onSelect={handleSelectChange}>
          {/* to get each element in the area array 
          and put it as a dropdown item component */}
          {area.map((item, index) => (
            <Dropdown.Item key={index} eventKey={item}>
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className="header">
        {/* Search Bar class */}

        <Link to="./advancedSearch">
          <img
            src={process.env.PUBLIC_URL + "./search.jpeg"}
            alt="search Bar"
            height="100px"
          />
        </Link>
      </div>
      <div className="container2">
        {/* near restaurant, restaurant rank*/}
        <p>
          <Link to="/NearRestaurant">
            <img
              width="100"
              src={process.env.PUBLIC_URL + "/c1.png"}
              alt="c1"
            />
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/RankingClass">
            <img width="80" src={process.env.PUBLIC_URL + "/c3.png"} alt="c3" />
          </Link>
        </p>
      </div>
      {/* restaurant info class */}
      <div>
        <h2>餐廳資訊</h2>
      </div>
      {/*  restaurant info generator */}
      {data.map((item, index) => (
        <div key={index} id={item.id} className="container2">
          <h2>{item.Name}</h2>
          <img src={item.Image} alt="rest photo" width="300px" />
          <p>{item.Area}</p>
        </div>
      ))}
    </div>
  );
}
