import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import GenotypeCompositor from '../control/GenotypeCompositor'

import { Card, Jumbotron, Container, Form, Col, Row, Button  } from 'react-bootstrap';

const autoBind = require('auto-bind');

class GenotypeInput extends Component {
    constructor(props) {
        super(props)
        if( typeof props.genotypes === 'undefined' ) {
            this.state = {
                genotypes: [],
                variants: props.variants.variants,
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        } else {
            this.state = {
                genotypes: props.genotypes.genotypes,
                variants: props.variants.variants,
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        }
        this.child_gene = React.createRef();
        this.child_coll = React.createRef();
        autoBind(this)
    }

    triggerPrev = () => {
        this.state.callbackPrev({
            formName: 'genotypes',   step: 3
        })
    }

    triggerNext = () => {
        this.state.callbackNext({
            formName: 'genotypes',   step: 5,
            data: { variants: this.state.variants }
        })
    }

    render = () => {
        var next = ''
        var info = ''
        if( this.state.genotypes.length === 0 ) {
            info = <Jumbotron>
                <p>Some scientific articles do report more than just observed variants but also observed genotypes.</p>
                <p>If a scientific article does not report information on genotypes, please, select the checkbox under this information tip.</p>
                <p>This step of the <em>treatabolome entry tool</em> allows to use the previously introduced variants to define genotypes using the boolean operations <code>OR</code> and <code>AND</code>.</p>
                <p>Start selecting one of the variants and then go on by selecting the remaining variants oberved together.</p>
            </Jumbotron>
        }
        return(
            <Card>
                <Card.Header><h2>Genotypes</h2></Card.Header>
                <Card.Body>
                    { info }
                    <h4>Fetcher</h4>
                    <GenotypeCompositor variants={ this.state.variants } />
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

export default GenotypeInput