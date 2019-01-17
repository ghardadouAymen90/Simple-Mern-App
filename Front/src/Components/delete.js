import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Delete extends React.Component {

    componentDidMount() {
        axios.delete('/delete-contact/' + this.props.id).then(res => console.log("deleted")).catch(err => console.log(err))
    }
    render() {
        return (
            <h1>DELETED ITEM: ok
              <Redirect to='/contacts' />
            </h1>
        )
    }
}