import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { Table, Button } from 'react-bootstrap';

const autoBind = require('auto-bind');

class DrugCollection extends Component {
	constructor( props ) {
		super( props )
		this.state = {
            drugs: props.drugs,
            callbackDropDrug: props.callbackDropDrug
        }
        autoBind( this )
    }

    addDrug = ( drg ) => {
        this.setState({ drugs: this.state.drugs.concat( drg ) })
    }

    dropDrug = ( idx ) => {
        this.state.callbackDropDrug( idx )
        this.setState({ drugs: this.state.drugs.filter( (drg) => drg.idx !== idx ) })
    }

    render = () => {
        var cnt = this.state.drugs.map( (drg, idx) => { return(
            <tr key={ idx }>
                <td>{ drg.idx }</td>
                <td>{ drg.name }</td>
                <td><Button variant="outline-danger" onClick={ () => this.dropDrug( drg.idx ) }><FontAwesomeIcon icon={ faTrash } /></Button></td>
            </tr>
        ) } )
        return( <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Drug's name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { cnt }
                </tbody>
            </Table>
        )
    }
}


export default DrugCollection