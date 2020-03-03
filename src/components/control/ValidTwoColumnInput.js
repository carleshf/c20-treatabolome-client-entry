import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import {
    Form, Row, Col, InputGroup
} from 'react-bootstrap';

const autoBind = require('auto-bind');

class ValidTwoColumnInput extends Component {
    constructor(props) {
		super(props)
		this.state = {
            controlId: props.controlId,
            label: props.label,
            placeholder: props.placeholder,
            externalCall: props.call,
            externalCallback: props.callback,
            value: '',
            valid: true,
            disable: false
        }
        autoBind(this)
    }

    changeHandler(evt) {
        this.setState({ value: evt.target.value.trim() })
    }

    validate(evt) {
        var new_value = this.state.value
        var new_valid = this.state.externalCallback(new_value)
        this.setState({ valid: new_valid })
        return { 'valid': new_valid, 'value': new_value }
    }

    disable() {
        this.setState({ 'disable': true })
    }
    clear() {
        this.setState({
            'value': '',
            'valid': true,
            'disable': false
        })
    }

    render() {
        const contentLabel = <Form.Label column sm="2">{ this.state.label }: </Form.Label>
        const contentValid = <Col sm="10">
                <InputGroup className="mb-1">
                    <Form.Control type="input" onChange= { this.changeHandler } placeholder={ this.state.placeholder } value={ this.state.value } disabled={ this.state.disable } />
                </InputGroup>
            </Col>
        const contentError = <Col sm="10">
            <InputGroup className="mb-1">
                <Form.Control type="input" onChange= { this.changeHandler } placeholder={ this.state.placeholder } value={ this.state.value } disabled={ this.state.disable } />
                <InputGroup.Append>
                <InputGroup.Text className="bg-danger text-white" ><FontAwesomeIcon icon={ faTimes } /></InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        </Col>

        const contentForm = this.state.valid ? contentValid : contentError
        
        return(
            <Form.Group as={Row} controlId={ this.state.controlId }>
                { contentLabel }
                { contentForm }
            </Form.Group>
        )
    }
}

export default ValidTwoColumnInput;