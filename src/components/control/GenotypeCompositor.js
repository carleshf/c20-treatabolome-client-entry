import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Form, Row, Col, Button } from 'react-bootstrap';

const autoBind = require('auto-bind');

class GenotypeCompositor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            variants: props.variants,
            no_geno: props.no_geno,
            allele1: props.variants.length > 0 ? props.variants[ 0 ] : '',
            allele2: props.variants.length > 0 ? props.variants[ 0 ] : '',
            callbackAddGenotype: props.callbackAddGenotype
        }
        autoBind(this)
    }

    toggleGenotype = ( value ) => {
        this.setState({ no_geno: value })
    }

    allele1Fetcher = ( evt ) => {
        this.setState({ allele1: this.state.variants[ evt.target.selectedIndex ] })
    }

    allele2Fetcher = ( evt ) => {
        this.setState({ allele2: this.state.variants[ evt.target.selectedIndex ] })
    }

    addGenotype = () => {
        this.state.callbackAddGenotype( this.state.allele1, this.state.allele2 )
    }

    render = () => {
        var vars = this.state.variants.map( (vari, idx) => {
            return <option key={ idx }>({ vari.gene }) { vari.input }</option>
        })
        return(
            <Form.Group as={Row} controlId={ this.state.controlId }>
                <Col sm="10">
                    <Row>
                        <Form.Label column sm="2">Allele 1: </Form.Label>
                        <Col sm="10">
                            <Form.Control disabled={ this.state.no_geno } onChange={ this.allele1Fetcher } as="select">
                                { vars }
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Allele 2: </Form.Label>
                        <Col sm="10">
                            <Form.Control disabled={ this.state.no_geno } onChange={ this.allele2Fetcher } as="select">
                                { vars }
                            </Form.Control>
                        </Col>
                    </Row>
                </Col>
                <Col sm="1">
                    <Button disabled={ this.state.no_geno } onClick={ this.addGenotype }><FontAwesomeIcon icon={ faPlus } /> Add</Button>
                </Col>
            </Form.Group>
        )
    }
}

export default GenotypeCompositor