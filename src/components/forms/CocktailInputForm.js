import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import CocktailCompositor from '../control/CocktailCompositor'
import GenotypeCollection from '../control/GenotypeCollection'

import { Card, Jumbotron, Alert, Button, Form  } from 'react-bootstrap';

const autoBind = require('auto-bind');

class CocktailInput extends Component {
    constructor( props ) {
        super( props )
        if( typeof props.cocktail === 'undefined' ) {
            this.state = {
                cocktails: [],                  drugs: props.drugs.drugs,
                callbackNext: props.moveNext,   callbackPrev: props.movePrev,
                no_cok: false,                  cnt: 0
            }
        } else {
            this.state = {
                cocktails: props.cocktails.cocktails,   drugs: props.drugs.drugs,
                callbackNext: props.moveNext,           callbackPrev: props.movePrev,
                no_cok: props.no_cok,                   cnt: Math.max( props.cocktails.cocktails.map( (gen) => gen.idx ) )
            }
        }
        this.child_cons = React.createRef();
        this.child_coll = React.createRef();
        autoBind( this )
    }

    toggleCocktail = () => {
        //this.child_cons.current.toggleCocktail( !this.state.no_cok )
        this.setState({ no_cok: !this.state.no_cok })
    }

    addCocktail = ( ) => {
    }

    dropCocktail = ( idx ) => {
        this.setState({ cocktails: this.state.cocktails.filter( (geno) => geno.idx !== idx ) })
    }

    triggerPrev = () => {
        this.state.callbackPrev({
            formName: 'cocktails',   step: 5
        })
    }

    triggerNext = () => {
        this.state.callbackNext({
            formName: 'cocktails',   step: 7,
            data: { cocktails: this.state.no_cok ? [] : this.state.cocktails, 
                no_cok: this.state.no_cok }
        })
    }

    render = () => {
        var next = ''
        var info = ''
        var no_cok = 'warning'
        if( this.state.cocktails.length === 0 && !this.state.no_cok ) {
            info = <Jumbotron>
                <p>...</p>
                <p>This step of the <em>treatabolome entry tool</em> allows to use the previously introduced variants to define genotypes. Start selecting one of the variants as <em>allele 1</em>and then go on by selecting the remaining variants observed as <em>allele 2</em>.</p>
            </Jumbotron>
        }
        if( this.state.no_gen ) {
            no_cok = 'info'
        } else {
            no_cok = 'warning'
        }
        if( this.state.no_cok || this.state.cocktails.length > 0 ) {
            next = <Button onClick={ this.triggerNext }>Next <FontAwesomeIcon icon={ faChevronRight } /></Button>
        }
        return(
            <Card>
                <Card.Header><h2>Cocktail</h2></Card.Header>
                <Card.Body>
                    { info }
                    <Alert variant={ no_cok }>
                        <Form.Check  custom type="checkbox" id="no_cok" checked={ this.state.no_cok } onChange={ this.toggleCocktail } label="The reviewed scientific article does not report information on drug-cocktails." />
                    </Alert>
                    <h4>Fetcher</h4>
                        <CocktailCompositor drugs={ this.state.drugs } no_cok={ this.state.no_cok } callbackAddCocktail={ this.callbackAddCocktail } />
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

export default CocktailInput