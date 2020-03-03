import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBroom, faSearch, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ValidTwoColumnInput from "../control/ValidTwoColumnInput"

import {
    Card, Form, Button, Spinner, Col, Row, Jumbotron, Container
} from 'react-bootstrap';

const autoBind = require('auto-bind');

class PublicationInfo extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            title: props.title,
            authors: props.authors,
            pubtype: props.pubtype,
            year: props.year,
            journal: props.journal
        }
    }

    render = () => {
        return(
            <div>
                <Form.Group as={Row} controlId="n">
                    <Form.Label column sm="2">Title: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="input" placeholder="title" value={ this.state.title } disabled/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="n">
                    <Form.Label column sm="2">Authors: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="input" placeholder="authors" value={ this.state.authors } disabled />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="n">
                    <Form.Label column sm="2">Journal: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="input" placeholder="journal" value={ this.state.journal } disabled />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="n">
                    <Form.Label column sm="2">Publication year: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="input" placeholder="year" value={ this.state.year } disabled />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="n">
                    <Form.Label column sm="2">Type: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="input" placeholder="pubtype" value={ this.state.pubtype } disabled />
                    </Col>
                </Form.Group>
            </div>
        )
    } 
}

/*  PublicationIntput
    =================
    Main form to gather information on a publication.
    * In can be initialized with or without data
    * If initalized with data, the data is expected to be in:
        `props.publication`
      And to be a JSON filed with the following fields:
         databse, pubid, title, year, authors, pubtype, journal
      State 'validate' will be set to true authomatically
    * It requires a callback "moveNext" that will be called
        when 'Next' button is pressed (all data will be passed)
    The component has a child, PublicationInfo, used to
    display gathered infomration.
*/
class PublicationIntput extends Component {
	constructor( props ) {
        super(props)
        if( typeof props.publication === 'undefined' ) {
		    this.state = { database: 'PubMed',
                pubid: '',          title: '',
                year: '',           authors: '',
                pubtype: '',        journal: '',
                validated: 'no',    callbackNext: props.moveNext
            }
        } else {
            this.state = { database: props.publication.database,
                pubid: props.publication.pubid,     title: props.publication.title,
                year: props.publication.year,       authors: props.publication.authors,
                pubtype: props.publication.pubtype, journal: props.publication.journal,
                validated: 'yes',                   callbackNext: props.moveNext
            }
        }
        this.child_pubid = React.createRef();
        autoBind(this)
    }

    validate = (value) => {
        return value.length !== 0
    }

    triggerValidation = () => {
        var status_pubid = this.child_pubid.current.validate()
        if( status_pubid.valid ) {
            this.setState({ validated: 'running' })
            this.child_pubid.current.disable()
            fetch(`http://127.0.0.1:5000/api/fetch/pubmed?pmid=${status_pubid.value}`)
                .then(res => res.json())
                .then((data) => {
                    this.setState({ 
                        pubid: data.content.pmid,
                        title: data.content.title,
                        year: data.content.year,
                        authors: data.content.authors,
                        pubtype: data.content.type.join(';'),
                        journal: data.content.journal,
                        validated: 'yes'
                    })
                })
                .catch(console.log)
        }
    }

    triggerErase = () => {
        this.child_pubid.current.clear()
        this.setState({
            database: 'PubMed',
            pubid: '',
            title: '',
            authors: '',
            pubtype: '',
            validated: 'no'
        })
    }

    triggerNext = () => {
        this.state.callbackNext({
            formName: 'publication',   step: 2,
            data: { database: this.state.database,  
                pubid: this.state.pubid,        title: this.state.title,
                year: this.state.year,          authors: this.state.authors,
                pubtype: this.state.pubtype,    journal: this.state.journal,
            }
        })
    }

	render = () => {
        var info = ''
        var check = ''
        var clear = ''
        var pub = ''
        var next = ''
        if( this.state.validated === 'no' ) {
            info = <Jumbotron>
                <p>The first step in the <em>treatabolome entry tool</em> it to provide the information related to the publication from which the data was gathered.</p>
                <p>Please, select the database from which you gathered the publication, enter its ID, and press "Check". The system will collect the information from the publication-database and present it to you for validation.</p>
            </Jumbotron>
            check = <Button onClick={ this.triggerValidation } >Check <FontAwesomeIcon icon={faSearch} /></Button>
        } else if( this.state.validated === 'running' ) {
            check = <Button variant="primary" disabled>
                Check <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            </Button>
        } else if( this.state.validated === "yes" ) {
            pub = <PublicationInfo title={ this.state.title } authors={ this.state.authors } journal={ this.state.journal } year={ this.state.year } pubtype={ this.state.pubtype } />
            next = <Button onClick={ this.triggerNext}>Next <FontAwesomeIcon icon={faChevronRight} /></Button>
            clear = <Button onClick={ this.triggerErase } variant="danger" >Clear <FontAwesomeIcon icon={faBroom} /></Button>
        }
		return (
            <Card>
                <Card.Header><h2>Publication</h2></Card.Header>
                <Card.Body>
                    { info }
                    <Container>
                        <Form.Group as={Row} controlId="database">
                            <Form.Label column sm="2">Database: </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" onChange={ this.handleChangeDatabase }>
                                <option>PubMed</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <ValidTwoColumnInput ref={ this.child_pubid } controlId="pubid" label="ID" placeholder="PMID: 31243429" callback={ this.validate } />
                        { pub }
                        <div className="float-sm-right">
                            { clear }{ ' ' }
                            { check }
                            { next }
                        </div>
                    </Container>
                </Card.Body>
            </Card>
		)
	}
}
export default PublicationIntput