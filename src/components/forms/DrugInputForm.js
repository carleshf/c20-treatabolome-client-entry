import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { Card, Jumbotron, Alert, Button, Form  } from 'react-bootstrap';

const autoBind = require('auto-bind');

class DrugInput extends Component {
    constructor(props) {
        super(props)
        if( typeof props.drugs === 'undefined' ) {
            this.state = {
                drugs: [],                      cnt: 0,
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        } else {
            this.state = {
                drugs: props.drugs.drugs,       cnt: Math.max( props.drugs.drugs.map( (drg) => drg.idx ) ),
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        }
        autoBind( this )
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
                    { info }
                    <h4>Fetcher</h4>
                    
                    <h4>Collection</h4>
                    
                    <div className="float-sm-right">
                        <Button onClick={ this.triggerPrev }><FontAwesomeIcon icon={ faChevronLeft } /> Previous</Button>{' '}
                        { next }
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default DrugInput