import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import GeneFetcher from '../fetchers/GeneFetcher'
import VariantCollection from '../control/VariantCollection'

import { Card, Jumbotron, Form, Col, Row, Button  } from 'react-bootstrap';

const autoBind = require('auto-bind');

class VariantInput extends Component {
    constructor(props) {
        super(props)
        if( typeof props.variants === 'undefined' ) {
            this.state = {
                variants: [],                   gene: '',
                build: 'GRCh37',                tarnscript: '',
                variant: '',                    inheritance: '',
                validTarnscript: true,          validVariant: true,
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        } else {
            this.state = {
                variants: props.variants.variants,       gene: '',
                build: 'GRCh37',                tarnscript: '',
                variant: '',                    inheritance: '',
                validTarnscript: true,          validVariant: true,
                callbackNext: props.moveNext,   callbackPrev: props.movePrev
            }
        }
        this.child_gene = React.createRef();
        this.child_coll = React.createRef();
        autoBind(this)
    }

    fetchGene = (value) => {
        if(value.length > 0 ) {
            this.setState({ gene: value[0].name })
        } else {
            this.setState({ gene: '' })
        }
    }

    fetchBuild = (value) => {
        this.setState({ build: value.target.value })
    }

    fetchTranscript = (value) => {
        this.setState({ tarnscript: value.target.value.trim() })
    }

    fetchVariant = (value) => {
        this.setState({ variant: value.target.value.trim() })
    }

    fetchInheritance = (value) => {
        this.setState({ inheritance: value.target.value.trim() })
    }

    validateVariant = () => {
        var api_check = true
        if( this.state.tarnscript.length < 5 ) {
            this.setState({ validTarnscript: false })
            api_check = false
        }
        if( this.state.variant.length < 5 ) {
            this.setState({ validVariant: false })
            api_check = false
        }
        if( this.state.gene.length < 3 ){
            this.child_gene.current.setValid(false)
            api_check = false
        }
        if( api_check === true ) {
            fetch(`http://127.0.0.1:5000/api/fetch/variation?genome_build=${ this.state.build }&variant=${ this.state.tarnscript }:${ this.state.variant }`)
                .then((res) => {
                    if( res.ok ) {
                        return res.json()
                    } else {
                        throw new Error(res.json()['Error']);
                    }
                })
                .then((data) => {
                    this.child_coll.current.addVariant(data, this.state.build, this.state.gene, this.state.inheritance)

                    var vars = this.state.variants
                    vars = vars.concat({
                        idx: vars.length + 1,
                        gene: data.content.gene === this.state.gene ? this.state.gene : data.content.gene + ' / <' + this.state.gene + '>',
                        build: this.state.build,                protein: data.content.protein.tlr,
                        transcript: data.content.transcript,    inheritance: this.state.inheritance,
                        input: this.state.tarnscript + ':' + this.state.variant
                    })
                    this.setState({ variants: vars })

                    this.setState({ 
                        gene: '',               build: 'GRCh37',
                        tarnscript: '',         variant: '',
                        inheritance: '',
                        validTarnscript: true,  validVariant: true
                    })
                    this.child_gene.current.setValid(true)
                })
                .catch((err) => {
                    console.log(err)
                    this.setState({ validTarnscript: false })
                    this.setState({ validVariant: false })
                })
        }
    }

    triggerPrev = () => {
        this.state.callbackPrev({
            formName: 'variants',   step: 2
        })
    }

    triggerNext = () => {
        this.state.callbackNext({
            formName: 'variants',   step: 4,
            data: { variants: this.state.variants }
        })
    }

    render = () => {
        var info = ''
        var next = ''
        if( this.state.variants.length > 0 ) {
            next = <Button onClick={ this.triggerNext }>Next <FontAwesomeIcon icon={faChevronRight} /></Button>
        }
        if( this.state.variants.length === 0) {
            info = <Jumbotron>
                <p>In the <em>treatabolome database</em>, a genomic variant is defined by a combination of five elements:</p>
                <ol>
                    <li>A gene defined as gene symbol from HUGO Gene Nomenclature Committee (HGNC - <strong>mandatory</strong>)</li>
                    <li>A genomic build (<strong>mandatory</strong>)</li>
                    <li>A transcript where the variant lies (<strong>mandatory</strong>)</li>
                    <li>A variant as defined genomic by Sequence Variant Nomenclature as reference sequence (starting by g. - <strong>mandatory</strong>)</li>
                    <li>The variant inheritance and zygosity (optional)</li>
                </ol>
            </Jumbotron>
        }
        return (
            <Card>
                <Card.Header><h2>Variant</h2></Card.Header>
                <Card.Body>
                    { info }
                    <h4>Fetcher</h4>
                    <Form.Group as={Row} controlId="gene">
                        <Form.Label column sm="2">Gene: </Form.Label>
                        <Col sm="10">
                            <GeneFetcher ref={ this.child_gene } fetcher={ this.fetchGene }/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="build">
                        <Form.Label column sm="2">Genomic build: </Form.Label>
                        <Col sm="10">
                            <Form.Control onChange={ this.fetchBuild } as="select">
                                <option>GRCh37</option>
                                <option>GRCh38</option>
                                <option>hg19</option>
                                <option>hg38</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="transcript">
                        <Form.Label column sm="2">Transcript: </Form.Label>
                        <Col sm="10">
                            <Form.Control onChange={ this.fetchTranscript } isInvalid={ !this.state.validTarnscript } value={ this.state.tarnscript } type="input" placeholder="NC_000017.10" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="variant">
                        <Form.Label column sm="2">Variant: </Form.Label>
                        <Col sm="10">
                            <Form.Control onChange={ this.fetchVariant } isInvalid={ !this.state.validVariant } value={ this.state.variant } type="input" placeholder="g.48275363C>A" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="inh_zyg">
                        <Form.Label column sm="2">Inheritance and zygosity: </Form.Label>
                        <Col sm="10">
                            <Form.Control onChange={ this.fetchInheritance } value={ this.state.inheritance } type="input" placeholder="Inheritance and zygosity" />
                        </Col>
                    </Form.Group>
                    <div className="text-right">
                        <Button onClick={ this.validateVariant }>Validate and add to the collection <FontAwesomeIcon icon={faSearch} /></Button>
                    </div>
                    <h4>Collection</h4>
                    <VariantCollection ref={ this.child_coll } variants={ this.state.variants } />
                    <div className="float-sm-right">
                        <Button onClick={ this.triggerPrev }><FontAwesomeIcon icon={faChevronLeft} /> Previous</Button>{' '}
                        { next }
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default VariantInput;