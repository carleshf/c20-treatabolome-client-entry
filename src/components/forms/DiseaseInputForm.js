import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSearch, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ORDOFetcher from '../fetchers/ORDOFetcher';
import OMIMetcher from '../fetchers/OMIMFetcher';
import HPOFetcher from '../fetchers/HPOFetcher';

import {
    Card, Form, Button, Col, Row, Jumbotron
} from 'react-bootstrap';

const autoBind = require('auto-bind');

/*  DiseaseInput
    ============
    Main form to gather information on a disease.
    * In can be initialized with or without data
    * If initalized with data, the data is expected to be in:
        `props.disease`
      And to be a JSON filed with the following fields:
         ordo, omim, hpo
*/
class DiseaseInput extends Component {
    constructor(props) {
		super(props)
		if( typeof props.disease === 'undefined' ) {
            this.state = {
                ordo: '',                       omim: '',
                hpo: [],                        validated: 'no',
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        } else {
            this.state = {
                ordo: props.ordo,               omim: props.omim,
                hpo: props.hpo,                 validated: 'yes',
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        }
        /*this.child_ordo = React.createRef();
        this.child_omim = React.createRef();
        this.child_hpo = React.createRef();*/
        autoBind(this)
    }

    ordoFetcher = (value) => {
        this.setState({ ordo: value })
    }

    omimFetcher = (value) => {
        this.setState({ omim: value })
    }

    hpoFetcher = (value) => {
        this.setState({ hpo: value })
    }

    triggerValidation = () => {
        if( this.state.ordo.length !== 1 ) {
            this.setState({ validated: 'yes' })
        }
    }

    triggerPrev = () => {
        this.state.callbackNext({
            formName: 'disease',   step: 1
        })
    }

    triggerNext = () => {
        this.state.callbackNext({
            formName: 'disease',   step: 3,
            data: { ordo: this.state.ordo,  omim: this.state.omim,
                hpo: this.state.hpo
            }
        })
    }

    render = () => {
        var check = ''
        var next = ''
        if( this.state.validated === 'no' ) {
            check = <Button onClick={ this.triggerValidation } >Check <FontAwesomeIcon icon={faSearch} /></Button>
        }
        if( this.state.validated === 'yes' ) {
            next = <Button onClick={ this.triggerNext }>Next <FontAwesomeIcon icon={faChevronRight} /></Button>
        }
        return(
            <Card>
                <Card.Header><h2>Disease</h2></Card.Header>
                <Card.Body>
                <Jumbotron>
                    <p>In the <em>treatabolome databse</em>, a disease is defined by a combination of three elements:</p>
                    <ol>
                        <li>A disorder term from Orphanet Rare Disease Ontology (ORDO - <strong>mandatory</strong>)</li>
                        <li>A clinical feature from Online Mendelian Inheritance in Man (OMIM - optional)</li>
                        <li>One or muliple terms from the Human Phenotype Ontology (HPO - optional)</li>
                    </ol>
                </Jumbotron>
                <Form.Group as={Row} controlId="ordo">
                    <Form.Label column sm="2">ORDO: </Form.Label>
                    <Col sm="10">
                        <ORDOFetcher fetcher={ this.ordoFetcher } />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="OMIM">
                    <Form.Label column sm="2">OMIM: </Form.Label>
                    <Col sm="10">
                        <OMIMetcher fetcher={ this.omimFetcher } />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="HPO">
                    <Form.Label column sm="2">HPO(s): </Form.Label>
                    <Col sm="10">
                        <HPOFetcher fetcher={ this.hpoFetcher } />
                    </Col>
                </Form.Group>
                <div className="float-sm-right">
                    <Button onClick={ this.triggerPrev }><FontAwesomeIcon icon={faChevronLeft} /> Previous</Button>{' '}
                    { check }
                    { next }
                </div>
                </Card.Body>
            </Card>
        )
    }
}

export default DiseaseInput