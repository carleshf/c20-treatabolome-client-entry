import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDotCircle, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

/*  Guider
    ======
    Small lateral component to indicate the current step of the
    process to get the data from a scientific article.
*/
class Guider extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            current_step: props.current_step,
            steps: [
                {n: 1, text: 'Publication'},
                {n: 2, text: 'Disease'},
                {n: 3, text: 'Variants'},
                {n: 4, text: 'Genotypes'},
                {n: 5, text: 'Drugs'},
                {n: 6, text: 'Cocktails'},
                {n: 7, text: 'Treatments'},
                {n: 8, text: 'Review'}
            ]
        }
    }

    updateStep = (step) => {
        this.setState({ current_step: step })
    }

    render = () => {
        const body = this.state.steps.map((step, idx) => {
            if( this.state.current_step === step.n ) {
                return <div key={ idx }><FontAwesomeIcon icon={faArrowAltCircleRight} /><span> <strong>{ step.text }</strong></span><br /></div>
            } else if( this.state.current_step > step.n ) {
                return <div key={ idx }><FontAwesomeIcon icon={faCircle} /><span> { step.text }</span><br /></div>
            } else {
                return <div key={ idx }><FontAwesomeIcon icon={faDotCircle} /><span> { step.text }</span><br /></div>
            }
        })
        return(
            <Card>
                <Card.Header><h4>Steps</h4></Card.Header>
                <Card.Body>
                    { body }
                </Card.Body>
            </Card>
        )
    }
}

export default Guider