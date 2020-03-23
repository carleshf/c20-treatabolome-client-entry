import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import TreatmentCompositor from '../control/TreatmentCompositor'
import TreatmentCollection from '../control/TreatmentCollection'

import { Card, Jumbotron, Button  } from 'react-bootstrap';


const autoBind = require('auto-bind');

class TreatmentInput extends Component {
    constructor( props ) {
        super( props )
        if( typeof props.treatments === 'undefined' ) {
            this.state = {
                treatments: [],
                cocktails: props.cocktails.cocktails,   drugs: props.drugs.drugs,
                genotypes: props.genotypes.genotypes,   variants: props.variants.variants,
                callbackNext: props.moveNext,           callbackPrev: props.movePrev,
                cnt: 0
            }
        } else {
            this.state = {
                treatments: props.treatments.treatments,
                cocktails: props.cocktails.cocktails,   drugs: props.drugs.drugs,
                genotypes: props.genotypes.genotypes,   variants: props.variants.variants,
                callbackNext: props.moveNext,           callbackPrev: props.movePrev,
                cnt: Math.max( ...props.treatments.treatments.map( (trt) => trt.idx ) )
            }
        }
        this.child_coll = React.createRef();
        autoBind( this )
    }

    triggerPrev = () => {
        this.state.callbackPrev({
            formName: 'treatments',   step: 6
        })
    }

    triggerNext = () => {
        this.state.callbackNext({
            formName: 'treatments',   step: 8,
            data: { treatments: this.state.treatments }
        })
    }

    addTreatment = ( trt ) => {
        trt.idx = this.state.cnt
        this.setState({ 
            treatments: this.state.treatments.concat( trt ),
            cnt: this.state.cnt + 1
        })
        this.child_coll.current.addTreatment( trt )
    }

    dropTreatment = ( idx ) => {
        this.setState({ treatments: this.state.treatments.filter( (trt) => trt.idx !== idx ) })
    }

    render = () => {
        var next = ''
        var info = ''
        if( this.state.treatments.length === 0 ) {
            info = <Jumbotron>
                <p>This is the last step in the <em>teratabolome entry tool</em> before verifying the data you inputed.</p>
                <p>Pelase, use the fetcher section to link a drug or a cocktail (<em>trigger</em>) with a variant or a genotype (<em>targget</em>).</p>
                <p>Once this operation is compelted, click on the "next" button.</p>
            </Jumbotron>
        }
        if( this.state.treatments.length > 0 ) {
            next = <Button onClick={ this.triggerNext }>Next <FontAwesomeIcon icon={ faChevronRight } /></Button>
        }
        return(
            <Card>
                <Card.Header><h2>Treatment</h2></Card.Header>
                <Card.Body>
                    { info }
                    <h4>Fetcher</h4>
                    <TreatmentCompositor genotypes={ this.state.genotypes } variants={ this.state.variants } drugs={ this.state.drugs } cocktails={ this.state.cocktails } callbackAddTreatment={ this.addTreatment } />
                    <h4>Collection</h4>
                    <TreatmentCollection ref={ this.child_coll } treatments={ this.state.treatments } callbackDropTreatment={ this.dropTreatment } />
                    <div className="float-sm-right">
                        <Button onClick={ this.triggerPrev }><FontAwesomeIcon icon={ faChevronLeft } /> Previous</Button>{' '}
                        { next }
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default TreatmentInput