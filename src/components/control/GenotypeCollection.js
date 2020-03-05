import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { Table, Button, Badge } from 'react-bootstrap';

const autoBind = require('auto-bind');

class GenotypeCollection extends Component {
	constructor(props) {
		super(props)
		this.state = {
            genotypes: props.genotypes,
            callbackDropVariant: props.callbackDropVariant
        }
        console.log(this.state)
        autoBind(this)
    }

    render = () => {
        var cnt = ''
        return( <Table striped bordered hover className="table-condensed">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gene</th>
                        <th>Allele 1</th>
                        <th>Allele 2</th>
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


export default GenotypeCollection