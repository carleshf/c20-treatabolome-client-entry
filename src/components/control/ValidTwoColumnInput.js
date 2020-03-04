import React, { Component } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

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
            validated: true,
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
        this.setState({ validated: new_valid })
        return { 'valid': new_valid, 'value': new_value }
    }

    disable() {
        this.setState({ 'disable': true })
    }
    clear() {
        this.setState({
            value: '',
            validated: true,
            disable: false
        })
    }

    render() {        
        return(
            <Form.Group as={Row} controlId={ this.state.controlId }>
                <Form.Label column sm="2">{ this.state.label }: </Form.Label>
                <Col sm="10">
                    <InputGroup className="mb-2">
                        <Form.Control isInvalid={ !this.state.validated } type="input" onChange= { this.changeHandler } placeholder={ this.state.placeholder } value={ this.state.value } disabled={ this.state.disable } />
                    </InputGroup>
                </Col>
            </Form.Group>
        )
    }
}

export default ValidTwoColumnInput;