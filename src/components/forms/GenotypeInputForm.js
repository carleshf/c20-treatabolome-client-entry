import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import GenotypeCompositor from '../control/GenotypeCompositor'
import GenotypeCollection from '../control/GenotypeCollection'

import { Card, Jumbotron, Alert, checkbox, Button, Form  } from 'react-bootstrap';

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
        var no_geno = 'warning'
        if( this.state.genotypes.length === 0 ) {
            info = <Jumbotron>
                <p>Some scientific articles do report more than just observed variants but also observed genotypes.</p>
                <p>If a scientific article does not report information on genotypes, please, select the checkbox under this information tip.</p>
                <p>This step of the <em>treatabolome entry tool</em> allows to use the previously introduced variants to define genotypes. Start selecting one of the variants as <em>allele 1</em>and then go on by selecting the remaining variants observed as <em>allele 2</em>.</p>
            </Jumbotron>
        }
        if( this.state.no_gen ) {
            no_geno = 'info'
        } else {
            no_geno = 'warning'
        }
        if( this.state.no_geno || this.state.genotypes.length > 0 ) {
            next = <Button onClick={ this.triggerNext }>Next <FontAwesomeIcon icon={faChevronRight} /></Button>
        }
        return(
            <Card>
                <Card.Header><h2>Genotypes</h2></Card.Header>
                <Card.Body>
                    { info }
                    <Alert variant={ no_geno }>
                        <Form.Check  custom type="checkbox" id="no_geno" label="The reviewed scientific article does not report information on genotypes." />
                    </Alert>
                    <h4>Fetcher</h4>
                    <GenotypeCompositor variants={ this.state.variants } />
                    <h4>Collection</h4>
                    <GenotypeCollection red={ this.child_coll } genotypes={ this.state.genotypes } />
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