import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './add.css';

export default class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      phone: "",
      addClick:false
    }
    this.sendData = this.sendData.bind(this)
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendData = () => {
    axios
      .post('/add-contact', {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
this.setState({addClick:true})
  }

  render() {
    return (
     this.state.addClick? <Redirect to='/contacts' />:
      <div className="App">
        <h1>INSERT contact page</h1>
        <h2>Insert your contact's information</h2>

        <input
          type="text"
          name="name"
          placeholder="input the name"
          onChange={this.onChange}>
        </input>

        <input
          type="text"
          name="email"
          placeholder="input the Email"
          onChange={this.onChange}
        ></input>

        <input
          type="text"
          name="phone"
          placeholder="input the phone"
          onChange={this.onChange}
        ></input>

        <button
          onClick={this.sendData}
        >
          ADD</button>
      </div>
    )
  }
}
