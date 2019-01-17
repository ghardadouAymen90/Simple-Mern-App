import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './add.css'

export default class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    axios
      .get("/contacts")
      .then(res => this.setState({ contacts: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      (this.state.contacts.length===0)? <h1 className="contact">No Items found</h1>:
       this.state.contacts.map((el, i) =>
        <div key={i} className="contact">
          <h1>Name: {el.name}</h1><br />
          <div>Contact Phone: {el.phone}</div><br />
          <div>Email: {el.email}</div><br />
          <Link to={`/update-contact/${el._id}`}>
            <button>EDIT</button></Link>
          <Link to={`/delete-contact/${el._id}`}>
            <button>Remove</button></Link>
        </div>
      )
    )
  }
}
