import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table, Button } from 'react-bootstrap';

const autoBind = require('auto-bind');

class CocktailCollection extends Component {
	constructor( props ) {
		super( props )
		this.state = {
            cocktails: props.cocktails,
            callbackDropCocktail: props.callbackDropCocktail
        }
        autoBind( this )
    }

    addCocktail = ( cok ) => {
        this.setState({ cocktails: this.state.cocktails.concat( cok ) })
    }

    dropCocktail = ( idx ) => {
        this.state.callbackDropCocktail( idx )
        this.setState({ cocktails: this.state.cocktails.filter( (cok) => cok.idx !== idx ) })
    }

    render = () => {
        console.log( this.state.cocktails )
        var cnt = this.state.cocktails.map( (cok, idx) => { return(
            <tr key={ idx }>
                <td>{ cok.idx }</td>
                <td>{ cok.cocktails.map( (x) => x.name ).join(', ') }</td>
                <td><Button variant="outline-danger" onClick={ () => this.dropCocktail( cok.idx ) }><FontAwesomeIcon icon={ faTrash } /></Button></td>
            </tr>
        ) })
        return( <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cocktail</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { cnt }
                </tbody>
            </Table>
        )
    }
}


export default CocktailCollection