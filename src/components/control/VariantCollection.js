import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { Table, Button, Badge } from 'react-bootstrap';

const autoBind = require('auto-bind');

class VariantCollection extends Component {
	constructor( props ) {
		super( props )
		this.state = {
            variants: props.variants,
            callbackDropVariant: props.callbackDropVariant
        }
        autoBind( this )
    }

    addVariant = (data, input, build, gene, inheritance) => {
        var vars = this.state.variants
        vars = vars.concat({
            idx: vars.length + 1,
            gene: data.content.gene,
            build: build,
            protein: data.content.protein.tlr,
            transcript: data.content.transcript,
            inheritance: inheritance,
            input: input,
            input_gene: gene
        })
        this.setState({ variants: vars })
    }

    dropVariant = ( idx ) => {
        this.state.callbackDropVariant( idx )
        this.setState({ variants: this.state.variants.filter( (vari) => vari.idx !== idx ) })
    }

    renderBadge = (gene_q, gene_i) => {
        if( gene_q === gene_i ) {
            return ''
        } else {
            return <Badge variant="warning">{ gene_i }</Badge>
      }
    }

    render = () => {
        const cnt = this.state.variants.map( (vari, idx) => { return(
            <tr key={ idx }>
                <td>{ vari.idx }</td>
                <td>{ vari.input }</td>
                <td>{ vari.build }</td>
                <td><Badge variant="success">{ vari.gene }</Badge> { this.renderBadge( vari.gene, vari.input_gene ) }</td>
                <td>{ vari.transcript }</td>
                <td>{ vari.protein }</td>
                <td><Button variant="outline-danger" onClick={ () => this.dropVariant( vari.idx ) }><FontAwesomeIcon icon={ faTrash } /></Button></td>
            </tr>
        ) } )
        return(
            <Table striped bordered hover className="table-condensed">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Input</th>
                        <th>Build</th>
                        <th>Gene</th>
                        <th>Variant (c)</th>
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