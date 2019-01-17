import React, { Component } from 'react';
import Add from './Components/addContact';
import Contacts from './Components/contacts'
import Delete from './Components/delete'
import Edit from './Components/edit'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <nav>
            <ul>
              <li>
                <Link to="/contacts"><button>Show contact list</button></Link>
              </li>
              <li>
                <Link to="/add-contact/"><button>Add a contact</button></Link>
              </li>
            </ul>
          </nav>
          <Route path="/contacts" component={Contacts} />
          <Route path="/add-contact/" component={Add} />
          <Route path="/update-contact/:id" render={(props) => <Edit id={props.match.params.id} />} />
          <Route path="/delete-contact/:id" render={(props) => <Delete id={props.match.params.id} />} />
        </div>
      </Router>
    )
  }
}
