import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Form, Row, Col, Button } from 'react-bootstrap';

const autoBind = require('auto-bind');

class GenotypeCompositor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            variants: props.variants
        }
        autoBind(this)
    }

    render = () => {
        var star_var = []
        /*this.state.variants.map( (vari) => {
            return <option>vari.transcript</option>
        })*/
        var cons_var = []
        return(
            <Form.Group as={Row} controlId={ this.state.controlId }>
                <Form.Label column sm="2">Starting: </Form.Label>
                <Col sm="3">
                    <Form.Control onChange={ this.fetchBuild } as="select">
                        { star_var }
                    </Form.Control>
                </Col>
                <Form.Label column sm="2">Consecutive: </Form.Label>
                <Col sm="3">
                    <Form.Control onChange={ this.fetchBuild } as="select">
                        { cons_var }
                    </Form.Control>
                </Col>
                <Col sm="2">
                    <Button>Add <FontAwesomeIcon icon={ faPlus } /></Button>
                </Col>
            </Form.Group>
        )
    }
}

export default GenotypeCompositor