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
        console.log("end constructor")
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
                            <Form.Control onChange={ this.fetchBuild } as="select">
                                { vars }
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column sm="2">Allele 2: </Form.Label>
                        <Col sm="10">
                            <Form.Control onChange={ this.fetchBuild } as="select">
                                { vars }
                            </Form.Control>
                        </Col>
                    </Row>
                </Col>
                <Col sm="1">
                    <Button><FontAwesomeIcon icon={ faPlus } /> Add</Button>
                </Col>
            </Form.Group>
        )
    }
}

export default GenotypeCompositor