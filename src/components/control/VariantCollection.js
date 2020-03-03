import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import {
    Table
} from 'react-bootstrap';

const autoBind = require('auto-bind');

class VariantCollection extends Component {
	constructor(props) {
		super(props)
		this.state = {
            variants: []
        }
        autoBind(this)
    }

    addVariant = (variant) => {
        console.log(variant);
    }

    render = () => {
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gene</th>
                        <th>Variant (g)</th>
                        <th>Variant (p)</th>
                        <th>Inheritance/Zygosity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
        )
    }
}


export default VariantCollection;