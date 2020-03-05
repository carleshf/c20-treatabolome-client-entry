import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { Table, Button, Badge } from 'react-bootstrap';

const autoBind = require('auto-bind');

class GenotypeCollection extends Component {
	constructor( props ) {
		super( props )
		this.state = {
            genotypes: props.genotypes,
            callbackDropGenotype: props.callbackDropGenotype
        }
        autoBind( this )
    }

    addGenotype = ( genotype ) => {
        this.setState({ genotypes: this.state.genotypes.concat( genotype ) })
    }

    dropGenotype = ( idx ) => {
        this.state.callbackDropGenotype( idx )
        this.setState({ genotypes: this.state.genotypes.filter( (geno) => geno.idx !== idx ) })
    }


    renderBadge = (gene_q, gene_i) => {
        if( gene_q === gene_i ) {
            return ''
        } else {
            return <Badge variant="warning">{ gene_i }</Badge>
      }
    }

    render = () => {
        var cnt = this.state.genotypes.map( (geno, idx) => { return(
            <tr key={ idx }>
                <td>{ geno.idx }</td>
                <td><Badge variant="success">{ geno.allele1.gene }</Badge> { this.renderBadge(geno.allele1.gene, geno.allele2.gene) }</td>
                <td>{ geno.allele1.input }</td>
                <td>{ geno.allele2.input }</td>
                <td><Button variant="outline-danger" onClick={ () => this.dropGenotype( geno.idx ) }><FontAwesomeIcon icon={ faTrash } /></Button></td>
            </tr>
        ) } )
        return( <Table striped bordered hover>
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