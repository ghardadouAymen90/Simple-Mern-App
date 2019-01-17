import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import './add.css';


export default class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      phone: "",
      clicked: false
    }
  }

  componentDidMount() {
    axios.get('/update-contact/' + this.props.id).then(res => this.setState({ ...res.data })).catch(err => console.log(err))
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  update = () => {
    axios.put("/update-contact/" + this.props.id, {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email
    })
    this.setState({ clicked: true })
  }

  render() {
    return (
      (this.state.clicked) ? <Redirect to='/contacts' /> :
        <div className="App">
          <h1>EDIT contact page</h1>
          <h2>Edit your contact's information</h2>

          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="input the name"
            onChange={this.onChange}>
          </input>

          <input
            type="text"
            name="email"
            value={this.state.email}
            placeholder="input the Email"
            onChange={this.onChange}
          ></input>

          <input
            type="text"
            name="phone"
            value={this.state.phone}
            placeholder="input the phone"
            onChange={this.onChange}
          ></input>

          <button
            onClick={() => this.update()}
          >
            Update
          </button>

        </div>

    )
  }
}
