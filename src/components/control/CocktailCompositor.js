import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPrescriptionBottleAlt, faBroom } from '@fortawesome/free-solid-svg-icons'

import { Form, Row, Col, Button } from 'react-bootstrap';

const autoBind = require('auto-bind');


const unique = (arr) => {
    return [...new Set(arr)];
}

class CocktailCompositor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drugs: props.drugs,
            no_cok: props.no_cok,
            cocktail: [],
            selected : props.drugs.length > 0 ? props.drugs[ 0 ] : { name: "", idx: -1 },
            callbackAddCocktail: props.callbackAddCocktail
        }
        autoBind( this )
    }

    clearCurrent = () => {
        this.setState({ cocktail: [],
            selected : this.state.drugs.length > 0 ? this.state.drugs[ 0 ] : { name: "", idx: -1 },
        })
    }
    toggleCocktail = ( value ) => {
        this.setState({ no_cok: value })
    }

    drugFetcher = ( evt ) => {
        this.setState({ selected: this.state.drugs[ evt.target.selectedIndex ] })
    }

    addDrugToCocktail = ( evt ) => {

        this.setState({ cocktail: unique( this.state.cocktail.concat( this.state.selected ) ) })
    }

    addCocktail = () => {
        this.state.callbackAddCocktail( this.state.cocktail )
        this.setState({ cocktail: [], 
            selected : this.state.drugs.length > 0 ? this.state.drugs[ 0 ] : { name: "", idx: -1 }
        })
    }

    render = () => {
        var drugs = this.state.drugs.map( (drg, idx) => {
            return <option key={ idx }>{ drg.name }</option>
        } )
        return(
            <Form.Group as={Row} controlId="cocktail_compositor">
                <Col sm="2">
                    <Row>
                        <Form.Label>Drug: </Form.Label>
                    </Row>
                    <Row></Row>
                </Col>
                <Col sm="6">
                    <Row>
                        <Form.Control disabled={ this.state.no_cok } onChange={ this.drugFetcher } value={ this.state.selected.name } as="select">
                            { drugs }
                        </Form.Control>
                    </Row>
                    <Row>
                        Mixed drugs: { this.state.cocktail.length === 0 ? '---' : this.state.cocktail.map( (x) => x.name ).join(', ') }
                    </Row>
                </Col>
                <Col sm="2">
                    <Row>
                        <div className="float-sm-center">
                            <Button disabled={ this.state.no_cok } onClick={ this.addDrugToCocktail }>Add <FontAwesomeIcon icon={ faPlus } /></Button>
                        </div>
                    </Row>
                    <Row>
                        <div className="float-sm-right">
                            <Button disabled={ this.state.no_cok } variant="danger" onClick={ this.clearCurrent } >Clear <FontAwesomeIcon icon={ faBroom } /></Button>
                        </div>
                    </Row>
                </Col>
                <Col sm="2">
                    <div className="float-sm-right">
                        <Button disabled={ this.state.no_cok } onClick={ this.addCocktail }><FontAwesomeIcon icon={ faPrescriptionBottleAlt } /> Add cocktail</Button>
                    </div>
                </Col>
            </Form.Group>
        )
    }
}

export default CocktailCompositor