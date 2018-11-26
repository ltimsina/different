import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

class Leases extends Component {
  constructor() {
    super();
    this.state = {
      rentals: []
    };
  }

  componentWillMount() {
    // load data using the url parameter
    console.log(this.props);

    fetch("https://hiring-task-api.herokuapp.com/v1/leases")
      .then(res => res.json())
      .then(res => {
        let data = res.map(rent => {
          return (
            <tr key={rent.id.toString()}>
              <td>{rent.id}</td>
              <td>{rent.start_date}</td>
              <td>{rent.end_date}</td>
              <td>{rent.rent}</td>
            </tr>
          );
        });
        this.setState({ rentals: data });
      });
  }

  render() {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{this.state.rentals}</tbody>
      </table>
    );
  }
}

export default Leases;
