import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPrescriptionBottleAlt} from '@fortawesome/free-solid-svg-icons'

import { Form, Row, Col, Button } from 'react-bootstrap';

const autoBind = require('auto-bind');

class CocktailCompositor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drugs: props.drugs,
            no_cok: props.no_cok,
            cocktail: [],
            callbackAddCocktail: props.callbackAddCocktail
        }
        autoBind( this )
        console.log("end constructor")
    }

    toggleCocktail = ( value ) => {
        this.setState({ no_cok: value })
    }

    drugFetcher = ( evt ) => {
        this.setState({ allele1: this.state.variants[ evt.target.selectedIndex ] })
    }

    addCocktail = () => {
        //this.state.callbackAddCocktail( this.state.allele1, this.state.allele2 )
    }

    render = () => {
        var drugs = this.state.drugs.map( (drg, idx) => {
            return <option key={ idx }>{ drg.name }</option>
        } )
        return(
            <Form.Group as={Row} controlId="cocktail_compositor">
                <Col sm="10">
                    <Row>
                        <Form.Label column sm="2">Drug: </Form.Label>
                        <Col sm="10">
                            <Form.Control onChange={ this.allele1Fetcher } as="select">
                                { drugs }
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                            <Col sm="2"></Col>
                            <Col sm="9">Mixed drugs: { this.state.cocktail.length === 0 ? '---' : this.state.cocktail.join(', ') }</Col>
                    </Row>
                </Col>
                <Col sm="2">
                    <Button disabled={ this.state.no_geno } onClick={ this.addGenotype }><FontAwesomeIcon icon={ faPlus } /> Add</Button>
                </Col>
            </Form.Group>
        )
    }
}

export default CocktailCompositor