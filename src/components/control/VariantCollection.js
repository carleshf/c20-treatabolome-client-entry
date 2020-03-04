import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { Table, Button } from 'react-bootstrap';

const autoBind = require('auto-bind');

class VariantCollection extends Component {
	constructor(props) {
		super(props)
		this.state = {
            variants: props.variants
        }
        console.log(this.state)
        autoBind(this)
    }

    addVariant = (data, build, gene, inheritance) => {
        console.log("p:", this.state.variants)
        var vars = this.state.variants
        vars = vars.concat({
            idx: vars.length + 1,
            gene: data.content.gene === gene ? gene : data.content.gene + ' / <' + gene + '>',
            build: build,
            protein: data.content.protein.tlr,
            transcript: data.content.transcript,
            inheritance: inheritance
        })
        this.setState({ variants: vars })
        console.log("a:", this.state.variants)
    }

    dropVariant = (idx) => {
        console.log(idx)
        this.setState({ variants: this.state.variants.filter( (vari) => vari.idx !== idx ) })
    }

    render = () => {
        const cnt = this.state.variants.map( (vari, idx) => { return(
            <tr key={ idx }>
                <td>{ vari.idx }</td>
                <td>{ vari.build }</td>
                <td>{ vari.gene }</td>
                <td>{ vari.transcript }</td>
                <td>{ vari.protein }</td>
                <td><Button variant="outline-danger" onClick={ () => this.dropVariant( vari.idx ) }><FontAwesomeIcon icon={faTrash} /></Button></td>
            </tr>
        )})
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Build</th>
                        <th>Gene</th>
                        <th>Variant (g)</th>
                        <th>Variant (p)</th>
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


export default VariantCollection