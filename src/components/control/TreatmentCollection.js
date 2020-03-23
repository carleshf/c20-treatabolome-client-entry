import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { Table, Button, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap';

const autoBind = require('auto-bind');

class TreatmentCollection extends Component {
	constructor( props ) {
		super( props )
		this.state = {
            treatments: props.treatments,
            callbackDropTreatment: props.callbackDropTreatment
        }
        autoBind( this )
    }

    addTreatment = ( trt ) => {
        this.setState({ treatments: this.state.treatments.concat( trt ) })
    }

    dropTreatment = ( idx ) => {
        this.state.callbackDropTreatment( idx )
        this.setState({ treatments: this.state.treatments.filter( (trt) => trt.idx !== idx ) })
    }

    createGene = (gene, input) => {
        if( gene === input ) {
            return gene;
        } else {
            return gene + '/' + input
        }
    }

    createGenotype = (allele1, allele2) => {
        return '(' + this.createGene(allele1.gene, allele1.input_gene) + ') ' + allele1.input + ' / (' + this.createGene(allele2.gene, allele2.input_gene) + ') ' + allele2.input
    }

    render = () => {
        var cnt = this.state.treatments.map( (trt, idx) => { return(
            <tr key={ idx }>
                <td>{ trt.idx }</td>
                <td>
                    <OverlayTrigger placement="top" overlay={
                        <Tooltip>
                            { trt.trigger.source === "drug" ? "Drug" : "Cocktail" }
                        </Tooltip>
                    }>
                        <Badge variant={ trt.trigger.source === "drug" ? "secondary" : "info" }>{ trt.trigger.source === "drug" ? "D" : "C" }</Badge>
                    </OverlayTrigger>
                </td>
                <td>
                    { trt.trigger.source === "drug" ? trt.trigger.value.name : trt.trigger.value.cocktails.map( (cok) => cok.name ).join(', ') }
                </td>
                <td>
                    <OverlayTrigger placement="top" overlay={
                        <Tooltip>
                            { trt.target.source === "variant" ? "Variant" : "Genotype" }
                        </Tooltip>
                    }>
                        <Badge variant={ trt.target.source === "variant" ? "secondary" : "info" }>{ trt.target.source === "variant" ? "V" : "G" }</Badge>
                    </OverlayTrigger>
                </td>
                <td>
                    { trt.target.source === "variant" ? this.createGene( trt.target.value.gene, trt.target.value.input_gene ) + " " + trt.target.value.input : this.createGenotype( trt.target.value.allele1, trt.target.value.allele2 ) }
                </td>
                <td><Button variant="outline-danger" onClick={ () => this.dropTreatment( trt.idx ) }><FontAwesomeIcon icon={ faTrash } /></Button></td>
            </tr>
        ) } )
        return( <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Trigger</th>
                        <th></th>
                        <th>Target</th>
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


export default TreatmentCollection