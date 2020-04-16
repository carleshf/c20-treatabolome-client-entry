import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faSquare, faCheckSquare, faLongArrowAltRight, faExclamationCircle, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import { Card, Accordion, Button, Alert, Form, OverlayTrigger, Tooltip, Badge  } from 'react-bootstrap';

const autoBind = require('auto-bind');

class ReportValidation extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            checkPublication: false,        checkDisease: false,
            checkVariantsGenotypes: false,  checkDrugsCocktails: false,
            checkTreatments: false,
            publication: props.publication,         disease: props.disease,
            variants: props.variants.variants,      genotypes: props.genotypes.genotypes,     
            cocktails: props.cocktails.cocktails,   drugs: props.drugs.drugs,
            treatments: props.treatments.treatments,
            callbackNext: props.moveNext,   callbackPrev: props.movePrev
        }
        autoBind( this )
    }

    triggerPrev = () => {
        this.state.callbackPrev({
            formName: 'review',   step: 7
        })
    }

    triggerNext = () => {
        console.log( "NEXT!" )
    }

    checkAll = () => {
        return true
        //return this.state.checkPublication && this.state.checkDisease &&
        //    this.state.checkVariantsGenotypes && this.state.checkDrugsCocktails &&
        //    this.state.checkTreatments
    }

    createGene = (gene, input) => {
        if( gene === input ) {
            return gene;
        } else {
            return gene + '/' + input
        }
    }

    createGenotype = (allele1, allele2) => {
        return '(' + this.createGene(allele1.gene, allele1.input_gene) + ') ' + allele1.input + ' / (' + this.createGene(allele2.gene, allele2.input_gene) + ') ' + allele2.input
    }

    togglePublication = () => {  this.setState({ checkPublication: !this.state.checkPublication }) }
    toggleDisease = () => { this.setState({ checkDisease: !this.state.checkDisease })}
    toggleVariantsGenotypes = () => { this.setState({ checkVariantsGenotypes: !this.state.checkVariantsGenotypes })}
    toggleDrugsCocktails = () => { this.setState({ checkDrugsCocktails: !this.state.checkDrugsCocktails })}
    toggleTreatments = () => { this.setState({ checkTreatments: !this.state.checkTreatments })}

    summaryPublication = ( pub ) => {
        return <ul>
                <li><strong>Title</strong>: <em>{ pub.title }</em></li>
                <li><strong>Authors</strong>: <em>{ pub.authors }</em></li>
                <li><strong>Journal</strong>: <em>{ pub.journal }</em></li>
                <li><strong>Publication year</strong>: <em>{ pub.year }</em></li>
                <li><strong>Publication Type</strong>: <em>{ pub.pubtype }</em></li>
            </ul>
    }

    summaryDisease = ( dis ) => {
        return <ul>
                <li><strong>ORDO</strong>: <em>{ dis.ordo[ 0 ].term }</em></li>
                <li><strong>OMIM</strong>: <em>{ dis.omim.length === 0 ? 'Not provided' : dis.omim[ 0 ].term }</em></li>
                <li><strong>HPO(s)</strong>: <em>{ dis.hpo.length === 0 ? 'Not provided' : dis.hpo.map( (x) => x.term ).join(', ') }</em></li>
                <li><strong>Inheritance</strong>: <em>{ dis.inheritance.length === 0 ? 'Not provided' : dis.inheritance.join(', ') }</em></li>
                <li><strong>HPO(s)</strong>: <em>{ dis.description === '' ? 'Not provided' : dis.description }</em></li>
            </ul>
    }

    summaryVariants = ( vars, gen, trt ) => {
        const showWarning = ( v, l ) => {
            if( l.includes( v.idx ) ) {
                return ''
            } else {
                return (<OverlayTrigger key="top" placement="top" overlay={ <Tooltip>This variant does not receive a direct treatment or indirect treatment thought a genotype.</Tooltip> }>
                        <FontAwesomeIcon icon={ faExclamationCircle } />
                    </OverlayTrigger>
                )
            }
        }
        var var_in_trt = trt.map( (t) => {
            if( t.target.source === 'variant' ) {
                return t.target.value.idx
            } else {
                return t.target.value.allele1.idx
            }
        } ).concat( trt.map( (t) => t.target.source === 'variant' ? '' :t.target.value.allele2.idx ) ).filter( (x) => x !== '' )
        
        var var_list = vars.map( (v) => { return(
            <li key={ 'v' + v.idx }> ({ v.input_gene }) { v.input } <FontAwesomeIcon icon={ faLongArrowAltRight } /> ({ v.gene }) { v.transcript } { showWarning( v, var_in_trt ) }</li>
        ) } )
        return <ul>
                <li><strong>Number of reported variants</strong>: { vars.length }</li>
                <li><strong>Variants</strong> (input <FontAwesomeIcon icon={ faLongArrowAltRight } /> validated):</li>
                    <ol>
                        { var_list }
                    </ol>
            </ul>
    }

    summaryGenotypes = ( gen, trt ) => {
        const showWarning = ( v, l ) => {
            if( l.includes( v.idx ) ) {
                return ''
            } else {
                return (<OverlayTrigger key="top" placement="top" overlay={ <Tooltip>This genotype does not receive direct treatment.</Tooltip> }>
                        <FontAwesomeIcon icon={ faExclamationCircle } />
                    </OverlayTrigger>
                )
            }
        }
        var gen_in_trt = trt.map( (t) =>  t.target.source === 'variant' ? '' : t.target.value.idx ).filter( (x) => x !== '' )
        var gen_list = gen.map( (g) => { return(
            <li key={ 'g' + g.idx }> ({ g.allele1.input_gene }) { g.allele1.input } / ({ g.allele2.input_gene}) { g.allele2.input } <FontAwesomeIcon icon={ faLongArrowAltRight } /> <br />
                ({ g.allele1.gene }) { g.allele1.transcript } / ({ g.allele2.gene }) { g.allele2.transcript } { showWarning( g, gen_in_trt ) } </li>
        ) } )
        if( gen.length === 0 ) {
            return <ul>
                    <li><strong>Genotypes</strong>: <em>Not provided</em></li>
                </ul>
        } else {
            return <ul>
                <li><strong>Number of reported genotypes</strong>: { gen.length }</li>
                <li><strong>Genotypes</strong> (input <FontAwesomeIcon icon={ faLongArrowAltRight } /> validated):</li>
                    <ol>
                        { gen_list }
                    </ol>
            </ul>
        }
    }

    summaryDrugs = ( drg, cok, trt ) => {
        const showWarning = ( v, l ) => {
            if( l.includes( v.idx ) ) {
                return ''
            } else {
                return (<OverlayTrigger key="top" placement="top" overlay={ <Tooltip>This drug is not being used to treat any variant or genotype, directly nor thought a cocktail.</Tooltip> }>
                        <FontAwesomeIcon icon={ faExclamationCircle } />
                    </OverlayTrigger>
                )
            }
        }
        var drg_in_trt = trt.map( (t) => {
            if( t.trigger.source === "drug" ) {
                return t.trigger.value.idx
            } else {
                return t.trigger.value.cocktails.map( (c) => c.idx )
            }
        } ).flat()
        let drg_list = drg.map( (d) => { return(
            <li key={ "d." + d.idx }>{ d.name } { showWarning( d, drg_in_trt ) }</li>
        ) } )
        return <ul>
                <li><strong>Number of reported drugs</strong>: { drg.length }</li>
                <li><strong>Drugs</strong>:</li>
                    <ol>
                        { drg_list }
                    </ol>
            </ul>
    }
    
    summaryCocktails = ( cok, trt ) => {
        const showWarning = ( v, l ) => {
            if( l.includes( v.idx ) ) {
                return ''
            } else {
                return (<OverlayTrigger key="top" placement="top" overlay={ <Tooltip>This cocktail is not being used to treat any variant or genotype.</Tooltip> }>
                        <FontAwesomeIcon icon={ faExclamationCircle } />
                    </OverlayTrigger>
                )
            }
        }
        let cok_in_trt = trt.map( (t) => {
            if( t.trigger.source === "drug" ) {
                return ''
            } else {
                return t.trigger.value.idx
            }
        } ).filter( (c) => c !== '' )
        let cok_list = cok.map( (c) => { return(
            <li key={ "c." + c.idx }>{ c.cocktails.map( (x) => x.name ).join(', ') } { showWarning( c, cok_in_trt ) }</li>
        ) } )
        if( cok.length === 0 ) {
            return <ul>
                <li><strong>Cocktails</strong>: <em>Not provided</em></li>
            </ul>
        } else {
            return <ul>
                <li><strong>Number of reported cocktails</strong>: { cok.length }</li>
                    <ol>
                        { cok_list }
                    </ol>
            </ul>
        }
    }

    summaryTreatments( trt ) {
        let rtr_lst = trt.map( (t) => {
            let v_or_g = ''
            let d_or_c = ''
            if( t.target.source === 'variant' ) {
                v_or_g = '(' + t.target.value.input_gene + ') ' + t.target.value.input  
            } else {
                v_or_g = '(' + t.target.value.allele1.input_gene + ') ' + t.target.value.allele1.input + ' / (' + t.target.value.allele2.input_gene + ') ' + t.target.value.allele2.input
            }
            if( t.trigger.source === 'drug' ) {
                d_or_c = t.trigger.value.name
            } else {
                d_or_c = t.trigger.value.cocktails.map( (c) => c.name ).join(', ')
            }

            return <li key={ 't' + t.idx }>{ this.badgeVariant( t.target.source ) } { v_or_g } <FontAwesomeIcon icon={ faLongArrowAltLeft } /> { this.badgeDrug( t.trigger.source ) } { d_or_c }</li>
        })
        return <ul>
                <li><strong>Number of reported treatments</strong> { trt.length }</li>
                <li><strong>Treatments</strong> (variant <FontAwesomeIcon icon={ faLongArrowAltLeft } /> drug):</li>
                    <ol>
                        { rtr_lst }
                    </ol>
            </ul>
    }

    badgeDrug = ( source ) => {
        return <OverlayTrigger placement="top" overlay={
            <Tooltip>
                { source === "drug" ? "Drug" : "Cocktail" }
            </Tooltip>
        }>
            <Badge variant={ source === "drug" ? "secondary" : "info" }>{ source === "drug" ? "D" : "C" }</Badge>
        </OverlayTrigger>
    }

    badgeVariant = ( source ) => {
        return <OverlayTrigger placement="top" overlay={
            <Tooltip>
                { source === "variant" ? "Variant" : "Genotype" }
            </Tooltip>
        }>
            <Badge variant={ source === "variant" ? "secondary" : "info" }>{ source === "variant" ? "V" : "G" }</Badge>
        </OverlayTrigger>
    }

    submitData = () => { 
        console.log( "submitData" )
        fetch("http://127.0.0.1:5000/api/insert", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    publication: this.state.publication,
                    disease: this.state.disease,
                    variants: this.state.variants,
                    genotypes: this.state.genotypes,
                    drugs: this.state.drugs,
                    cocktails: this.state.cocktails,
                    treatments: this.state.treatments
                })
        })
        .then(resp => resp.json())
        .then(json => console.log( json ))
    }

    render = () => {
        var next = ''
        if( this.checkAll() ) {
            next = <Button variant="success" onClick={ this.submitData }>Submit article <FontAwesomeIcon icon={ faChevronRight } /></Button>
        }
        return(
            <Card>
                <Card.Header><h2>Review</h2></Card.Header>
                <Card.Body>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0"><FontAwesomeIcon icon={ this.state.checkPublication ? faCheckSquare : faSquare } /> Publication</Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                { this.summaryPublication( this.state.publication ) }
                                <Alert variant="warning">
                                    <Form.Check  custom type="checkbox" id="checkPublication" checked={ this.state.checkPublication } onChange={ this.togglePublication } label="I certify that this information is correct and accurate." />
                                </Alert>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1"><FontAwesomeIcon icon={ this.state.checkDisease ? faCheckSquare : faSquare } /> Disease</Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                { this.summaryDisease( this.state.disease ) }
                                <Alert variant="warning">
                                    <Form.Check  custom type="checkbox" id="checkDisease" checked={ this.state.checkDisease } onChange={ this.toggleDisease } label="I certify that this information is correct and accurate." />
                                </Alert>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2"><FontAwesomeIcon icon={ this.state.checkVariantsGenotypes ? faCheckSquare : faSquare } /> Variants and Genotypes</Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                { this.summaryVariants( this.state.variants, this.state.genotypes, this.state.treatments ) }
                                { this.summaryGenotypes( this.state.genotypes, this.state.treatments ) }
                                <Alert variant="warning">
                                    <Form.Check  custom type="checkbox" id="checkVariantsGenotypes" checked={ this.state.checkVariantsGenotypes } onChange={ this.toggleVariantsGenotypes } label="I certify that this information is correct and accurate." />
                                </Alert>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3"><FontAwesomeIcon icon={ this.state.checkDrugsCocktails ? faCheckSquare : faSquare } /> Drugs and Cocktails</Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                { this.summaryDrugs(  this.state.drugs, this.state.cocktails, this.state.treatments ) }
                                { this.summaryCocktails(  this.state.cocktails, this.state.treatments ) }
                                <Alert variant="warning">
                                    <Form.Check  custom type="checkbox" id="checkDrugsCocktails" checked={ this.state.checkDrugsCocktails } onChange={ this.toggleDrugsCocktails } label="I certify that this information is correct and accurate." />
                                </Alert>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="4"><FontAwesomeIcon icon={ this.state.checkTreatments ? faCheckSquare : faSquare } /> Treatments</Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                { this.summaryTreatments( this.state.treatments ) }
                                <Alert variant="warning">
                                    <Form.Check  custom type="checkbox" id="checkTreatments" checked={ this.state.checkTreatments } onChange={ this.toggleTreatments } label="I certify that this information is correct and accurate." />
                                </Alert>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <div className="float-sm-right">
                        <br />
                        <Button onClick={ this.triggerPrev }><FontAwesomeIcon icon={ faChevronLeft } /> Previous</Button>{' '}
                        { next }
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default ReportValidation