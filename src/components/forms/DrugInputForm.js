import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { Card, Jumbotron, Container, Row, Col, Button, Form  } from 'react-bootstrap';

import DrugCollection from '../control/DrugCollection'

const autoBind = require('auto-bind');

class DrugInput extends Component {
    constructor( props ) {
        super( props )
        console.log( "props", props )
        console.log( props.drugs.drugs.map( (drg) => drg.idx ) )
        if( typeof props.drugs === 'undefined' ) {
            this.state = {
                drugs: [],                      cnt: 0,
                validated: true,                drugname: '',
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        } else {
            this.state = {
                drugs: props.drugs.drugs,       cnt: Math.max( ...props.drugs.drugs.map( (drg) => drg.idx ) ),
                validated: true,                drugname: '',
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        }
        this.child_coll = React.createRef();
        autoBind( this )
        console.log( this.state )
    }

    addDrug = () => {
        if( this.state.drugname.length <= 2 ) {
            this.setState({ validated: false })
        } else {
            let drg = { idx: this.state.cnt + 1, name: this.state.drugname }
            this.setState({ cnt: this.state.cnt + 1, drugname: '', drugs: this.state.drugs.concat( drg ), validated: true })
            this.child_coll.current.addDrug( drg )
        }
    }

    fetchDrug = ( value ) => {
        this.setState({ drugname: value.target.value.trim() })
    }

    dropDrug = ( idx ) => {
        this.setState({ drugs: this.state.drugs.filter( (drg) => drg.idx !== idx ) })
    }

    triggerPrev = () => {
        this.state.callbackPrev({
            formName: 'drugs',   step: 4
        })
    }

    triggerNext = () => {
        this.state.callbackNext({
            formName: 'drugs',   step: 6,
            data: { drugs: this.state.drugs }
        })
    }

    render = () => {
        var next = ''
        var info = ''
        if( this.state.drugs.length === 0 ) {
            info = <Jumbotron>
                <p>This step in the <em>treatabolome entry tool</em> corresponds to the collection of the drugs reported in the reviewed scientific article.</p>
                <p>The <em>treatabolome entry tool</em> uses the Chemical Entities of Biological Interest (ChEBI), which is a freely available dictionary of molecular entities focused on "small" chemical compounds, a product of nature or synthetic products used to intervene in the processes of living organisms.</p>
            </Jumbotron>
        }
        if( this.state.drugs.length > 0 ) {
            next = <Button onClick={ this.triggerNext }>Next <FontAwesomeIcon icon={faChevronRight} /></Button>
        }
        return(
            <Card>
                <Card.Header><h2>Drugs</h2></Card.Header>
                <Card.Body>
                    <Container>
                        <Row> { info } </Row>
                        <Row> <h4>Fetcher</h4> </Row>
                        <Row>
                            <Col sm="2">
                                <Form.Label>Durg: </Form.Label>
                            </Col>    
                            <Col sm="8">
                                <Form.Control isInvalid={ !this.state.validated } type="input" onChange= { this.fetchDrug } placeholder="Type the name of a drug"/>
                            </Col>
                            <Col sm="2">
                                <div className="float-sm-right">
                                    <Button onClick={ this.addDrug }><FontAwesomeIcon icon={ faPlus } /> Add</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row><h4>Collection</h4></Row>
                        <Row>
                           <DrugCollection ref={ this.child_coll } drugs={ this.state.drugs } callbackDropDrug={ this.dropDrug } />
                        </Row>
                        <Row>
                            <Col sm="12">
                                <div className="float-sm-right">
                                    <Button onClick={ this.triggerPrev }><FontAwesomeIcon icon={ faChevronLeft } /> Previous</Button>{' '}
                                    { next }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        )
    }
}

export default DrugInput