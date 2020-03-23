import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import GenotypeCompositor from '../control/GenotypeCompositor'
import GenotypeCollection from '../control/GenotypeCollection'

import { Card, Jumbotron, Alert, Button, Form  } from 'react-bootstrap';

const autoBind = require('auto-bind');

/*  GenotypeInput
    =============
    Main form to gather information on a disease.
    * In can be initialized with or without data
    * If initialized with data, the data is expected to be in:
        `props.genotypes.genotypes` and `props.variants.variants`
      `props.genotypes.genotypes` must be a JSON filed with the following fields:
        allele1 and allele2
      That at their time are JSON with variant information, as well as `props.variants.variants`:
        build, gene, input_gene, inheritance, input, protein, transcript, and idx
      Then `props.no_geno` is a boolean indicating if there is genotype information.
*/
class GenotypeInput extends Component {
    constructor( props ) {
        super( props )
        if( typeof props.genotypes === 'undefined' ) {
            this.state = {
                genotypes: [],                  variants: props.variants.variants,
                callbackNext: props.moveNext,   callbackPrev: props.movePrev,
                no_geno: false,                 cnt: 0
            }
        } else {
            this.state = {
                genotypes: props.genotypes.genotypes,   variants: props.variants.variants,
                callbackNext: props.moveNext,           callbackPrev: props.movePrev,
                no_geno: props.no_geno,                 cnt: Math.max( props.genotypes.genotypes.map( (gen) => gen.idx ) )
            }
        }
        this.child_cons = React.createRef();
        this.child_coll = React.createRef();
        autoBind( this )
    }

    toggleGenotype = () => {
        this.child_cons.current.toggleGenotype( !this.state.no_geno )
        this.setState({ no_geno: !this.state.no_geno })
    }

    addGenotype = ( allele1, allele2 ) => {
        let geno = { idx: this.state.cnt + 1,
            allele1: allele1,
            allele2: allele2
        }
        this.setState({ 
            cnt: this.state.cnt + 1,
            genotypes: this.state.genotypes.concat( geno )
        })
        this.child_coll.current.addGenotype( geno )
    }

    dropGenotype = ( idx ) => {
        this.setState({ genotypes: this.state.genotypes.filter( (geno) => geno.idx !== idx ) })
    }

    triggerPrev = () => {
        this.state.callbackPrev({
            formName: 'genotypes',   step: 3
        })
    }

    triggerNext = () => {
        this.state.callbackNext({
            formName: 'genotypes',   step: 5,
            data: { genotypes: this.state.no_geno ? [] : this.state.genotypes, 
                no_geno: this.state.no_geno }
        })
    }

    render = () => {
        var next = ''
        var info = ''
        var no_geno = 'warning'
        if( this.state.genotypes.length === 0 && !this.state.no_geno ) {
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
            next = <Button onClick={ this.triggerNext }>Next <FontAwesomeIcon icon={ faChevronRight } /></Button>
        }
        return(
            <Card>
                <Card.Header><h2>Genotypes</h2></Card.Header>
                <Card.Body>
                    { info }
                    <Alert variant={ no_geno }>
                        <Form.Check  custom type="checkbox" id="no_geno" checked={ this.state.no_geno } onChange={ this.toggleGenotype } label="The reviewed scientific article does not report information on genotypes." />
                    </Alert>
                    <h4>Fetcher</h4>
                    <GenotypeCompositor ref={ this.child_cons } variants={ this.state.variants } no_geno={ this.state.no_geno } callbackAddGenotype={ this.addGenotype } />
                    <h4>Collection</h4>
                    <GenotypeCollection ref={ this.child_coll } genotypes={ this.state.genotypes } callbackDropGenotype={ this.dropGenotype } />
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