import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Guider from './Guider';
import PublicationIntput from './forms/PublicationIntputForm';
import DiseaseInput from './forms/DiseaseInputForm'
import VariantInput from './forms/VariantInputForm'

class FormManager extends Component {
    constructor(props) {
        super(props)
        this.state = { current_step: 3 }
        this.child_guider = React.createRef();
    }

    moveNext = (data) => {
        this.setState({ current_step: data.step })
        this.child_guider.current.updateStep(data.step)
        this.state[data.formName] = data.data
    }

    movePrev = (data) => {
        this.setState({ current_step: data.step })
    }

    create_form_to_show = () => {
        switch( this.state.current_step ) {
            case 1:
                return <PublicationIntput publication={ this.state.publication } moveNext={ this.moveNext } />
            case 2:
                return <DiseaseInput disease={ this.state.disease } moveNext={ this.moveNext } movePrev={ this.movePrev } />
            case 3:
                return <VariantInput />
            default:
                return <div></div>
        }
    }

    render = () => {
        const form = this.create_form_to_show();
        return(
            <Container>
                <Row>
                    <Col xs={3}>
                        <Guider ref={ this.child_guider } current_step={ this.state.current_step }/>
                    </Col>
                    <Col xs={9}>
                        { form }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FormManager