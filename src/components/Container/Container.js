import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import EmployeeTable from "../EmployeeTable/EmployeeTable";
import Header from "../Header/Header";
import API from "../../utils/API";
import "./Container.css";

class Container extends Component {
  state = {
    alphabetical: true,
    search: "",
    results: [],
    alphResults: [],
    sortedIcon: ""
  };

  // Pulls entries from random employee API on load
  componentDidMount = () => {
    this.getEmployees();
  };

  getEmployees = () => {
    API.getUsers()
      .then((res) => {
        this.setState({
          results: res.data.results,
        });
        console.log(this.state.results[0]);
      })
      .catch((err) => console.log(err));
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.searchEmployees(this.state.search);
  };

  sortByName = () => {
    let sorted = [];
    if (this.state.alphabetical) {
      sorted = this.state.results.sort((a, b) => {
        let nameA = a.name.last.toLowerCase();
        let nameB = b.name.last.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      sorted = this.state.results.sort((a, b) => {
        let nameA = a.name.last.toLowerCase();
        let nameB = b.name.last.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
    }
    this.setState({
      alphabetical: !this.state.alphabetical,
      alphResults: sorted,
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchBar
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <table id ="main" className="table table-striped table-dark text-center">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">
                <span id="name" onClick={this.sortByName}>Name {this.state.sortedIcon}</span>
              </th>
              <th scope="col">Contact</th>
              <th scope="col">DOB</th>
              <th scope="col">Start Date</th>
            </tr>
          </thead>
          <EmployeeTable
            results={this.state.results.filter(
              (emp) =>
                emp.cell.includes(this.state.search) ||
                emp.email.includes(this.state.search) ||
                emp.name.first.includes(this.state.search) ||
                emp.name.last.includes(this.state.search) ||
                emp.phone.includes(this.state.search)
            )}
          />
        </table>
      </div>
    );
  }
}

export default Container;