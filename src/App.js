import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import moment from "moment";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rentals: []
    };
  }

  componentWillMount() {
    // load data using the url parameter

    fetch("https://hiring-task-api.herokuapp.com/v1/leases/121")
      .then(res => res.json())
      .then(res => {
        // const rentalContract = res;
        const rentalContract = {
          id: "121",
          start_date: "2018-07-01",
          end_date: "2018-12-01",
          rent: 820,
          frequency: "fortnightly",
          payment_day: "wednesday"
        };

        console.log(rentalContract);
        let startDate = moment(rentalContract.start_date);
        let endDate = moment(rentalContract.end_date);

        let paymentDay = rentalContract.payment_day;
        let frequency = rentalContract.frequency;
        let rent = rentalContract.rent;

        //Getting frequency's number
        switch (frequency) {
          case "weekly":
            frequency = 7;
            break;
          case "fortnightly":
            frequency = 14;
            break;
          case "monthly":
            frequency = 30;
            break;
          default:
            console.log("Invalid frequency");
        }

        //Getting payment_day's day
        switch (paymentDay) {
          case "monday":
            paymentDay = 1;
            break;
          case "tuesday":
            paymentDay = 2;
            break;
          case "wednesday":
            paymentDay = 3;
            break;
          case "thursday":
            paymentDay = 4;
            break;
          case "friday":
            paymentDay = 5;
            break;
          case "saturday":
            paymentDay = 6;
            break;
          case "sunday":
            paymentDay = 0;
            break;
          default:
            console.log("Invalid Payment Day.");
        }
        console.log(paymentDay);
        console.log(startDate.day());

        var firstPaymentDay = Math.abs(paymentDay - startDate.day() + 1);
        //console.log(firstPayment);
        if (firstPaymentDay !== 0) {
          var firstPayment =
            Math.round(((firstPaymentDay * rent) / frequency) * 10) / 10;

          //toDate
          var toDate1 = moment(startDate, "MMMM Do YYYY").add(
            frequency - 1,
            "days"
          );
        } else {
          firstPayment = rent;
          toDate1 = moment(startDate, "MMMM Do YYYY").add(
            firstPaymentDay - 1,
            "days"
          );
        }

        let dates = [];
        // console.log("firstPaymentDay:" + firstPaymentDay);

        // let secPayDay = startDate.add("days", firstPaymentDay);
        // console.log("SecpayDay:" + secPayDay);

        const tenancyStartDate = startDate.clone();
        const tenancyEndDate = endDate.clone();

        let faltuStartDays = 0;
        if (tenancyStartDate.day() != paymentDay) {
          while (startDate.day() != paymentDay) {
            startDate.add(1, "days");
            faltuStartDays += 1;
          }
        }
        startDate = startDate.add(-1, "days");

        dates.push({
          days: faltuStartDays,
          fromDate: tenancyStartDate.toDate(),
          toDate: startDate.toDate()
        });

        startDate = startDate.add(1, "days");

        let faltuEndDays = 14;
        if (tenancyEndDate.day() != paymentDay) {
          while (endDate.day() != paymentDay) {
            endDate.add(-1, "days");
            faltuEndDays -= 1;
          }
        }

        console.log(endDate, faltuEndDays);

        while (endDate.diff(startDate, "days") > 1) {
          const d = {
            fromDate: startDate.toDate(),
            toDate: startDate.add(frequency - 1, "days").toDate()
          };
          d.days = moment(d.toDate).diff(moment(d.fromDate), "days");
          dates.push(d);
          startDate.add(1, "days");
        }
        console.log(dates);
        //let days = endDate.diff(startDate, "days");
        // Split the data into dates
        // Calulate number of days

        // let data = res.map(rent => {
        let data = (
          <tr key={rentalContract.id.toString()}>
            {/* <td>{rentalContract.id}</td> */}
            <td>{startDate.format("MMMM Do YYYY")}</td>
            <td>{toDate1.format("MMMM Do YYYY")}</td>
            <td>{firstPaymentDay}</td>
            <td>${firstPayment}</td>
          </tr>
        );
        // });
        this.setState({ rentals: data });
      });
  }

  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            {/* <th>Id</th> */}
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

export default App;
