import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Form, Row, Col, Button } from 'react-bootstrap';

const autoBind = require('auto-bind');

class TreatmentCompositor extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            genotypes: props.genotypes,
            variants: props.variants,
            cocktails: props.cocktails,
            drugs: props.drugs,
            triggerSource: 0, 
            targetSource: 0,
            trigger: props.drugs.length > 0 ? props.drugs[ 0 ] : '',
            target: props.variants.length > 0 ? props.variants[ 0 ] : '',
            callbackAddTreatment: props.callbackAddTreatment
        }
        autoBind( this )
    }

    triggerSourceFetcher = ( evt ) => {
        this.setState({ 
            triggerSource: evt.target.selectedIndex,
            trigger: evt.target.selectedIndex === 0 ? this.state.drugs[ 0 ] : this.state.cocktails[ 0 ]
        })
    }

    targetSourceFetcher = ( evt ) => {
        this.setState({ 
            targetSource: evt.target.selectedIndex,
            target: evt.target.selectedIndex === 0 ? this.state.variants[ 0 ] : this.state.genotypes[ 0 ]
        })
    }

    triggerFetcher = ( evt ) => {
        this.setState({ trigger: this.state.triggerSource === 0 ? this.state.drugs[ evt.target.selectedIndex ] : this.state.cocktails[ evt.target.selectedIndex ] })
    }

    targetFetcher = ( evt ) => {
        this.setState({ target: this.state.targetSource === 0 ? this.state.variants[ evt.target.selectedIndex ] : this.state.genotypes[ evt.target.selectedIndex ] })
    }

    addTreatment = () => {
        this.state.callbackAddTreatment( { 
            trigger: { source: this.state.triggerSource === 0 ? "drug" : "cocktail", value: this.state.trigger },
            target: { source: this.state.targetSource === 0 ? "variant" : "genotype", value: this.state.target },
        } )
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
        var trigger = this.state.triggerSource === 0 ? this.state.drugs.map( (drg, idx) => { return <option key={ idx }>{ drg.name }</option> } ) : this.state.cocktails.map( (cok, idx) => { return <option key={ idx }>{ cok.cocktails.map( (x) => x.name ).join(', ') }</option> } )
        var target = this.state.targetSource === 0 ? this.state.variants.map( (vari, idx) => { return <option key={ idx }>({ this.createGene( vari.gene, vari.input_gene ) }) { vari.input }</option> }) : this.state.genotypes.map( (geno, idx) => { return( <option key={ idx }>{ this.createGenotype( geno.allele1, geno.allele2 ) }</option> ) } )
        return(
            <Form.Group as={Row} controlId={ this.state.controlId }>
                <Col sm="10">
                    <Row>
                        <Col sm="6">
                            <Row>
                                <Form.Label column sm="4">Trigger: </Form.Label>
                                <Col sm="8">
                                    <Form.Control onChange={ this.triggerSourceFetcher } as="select">
                                        <option key="1">Drug</option>
                                        <option key="2">Cocktail</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Label column sm="4">Target: </Form.Label>
                                <Col sm="8">
                                    <Form.Control onChange={ this.targetSourceFetcher } as="select">
                                        <option key="1">Variant</option>
                                        <option key="2">Genotype</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="6">
                            <Row>
                                <Col sm="12">
                                    <Form.Control onChange={ this.triggerFetcher } as="select">
                                        { trigger }
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <Form.Control onChange={ this.targetFetcher } as="select">
                                        { target }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col sm="2">
                    <Button onClick={ this.addTreatment }><FontAwesomeIcon icon={ faPlus } /> Add</Button>
                </Col>
            </Form.Group>
        )
    }
}

export default TreatmentCompositor