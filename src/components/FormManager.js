import React, { Component } from 'react'

import { Container, Row, Col } from 'react-bootstrap'

import Guider from './Guider'
import PublicationInput from './forms/PublicationIntputForm'
import DiseaseInput from './forms/DiseaseInputForm'
import VariantInput from './forms/VariantInputForm'
import GenotypeInput from './forms/GenotypeInputForm'
import DrugInput from './forms/DrugInputForm'
import CocktailInput from './forms/CocktailInputForm'
import TreatmentInput from './forms/TreatmentInput'

class FormManager extends Component {
    constructor(props) {
        super(props)
        //this.state = { current_step: 1 }
        this.state = {
            current_step: 7,
            publication: {  authors: "Gutiérrez-Sacristán, A; Hernández-Ferrer, C; González, JR; Furlong, LI",
                            database: "PubMed",
                            journal: "Bioinformatics",
                            pubid: "28961763",
                            pubtype: "Journal Article",
                            title: "psygenet2r: a R/Bioconductor package for the analysis of psychiatric disease genes.",
                            year: 2017
            },
            disease: {      hpo: [  { id: "HP:0002494", name: "Abnormal rapid eye movement sleep", term: "HP:0002494 > Abnormal rapid eye movement sleep" },
                                    { id: "HP:0000234", name: "Abnormality of the head", term: "HP:0000234 > Abnormality of the head" },
                                    { id: "HP:0000924", name: "Abnormality of the skeletal system", term: "HP:0000924 > Abnormality of the skeletal system" }   ],
                            omim: [],
                            ordo: [ { id: "Orphanet:370943", name: "Autism spectrum disorder-epilepsy-arthrogryposis syndrome", term: "Orphanet:370943 > Autism spectrum disorder-epilepsy-arthrogryposis syndrome" } ],
                            description: "This is the descriptions",
                            inheritance: [ "unknown" ]
            },
            variants: {     variants: [
                {   build: "GRCh37", gene: "COL1A1", input_gene: 'APP', idx: 3, inheritance: "", input: "NM_000088.3:c.589G>T", protein: "NP_000079.2(LRG_1p1):p.(Gly197Cys)", transcript: "NM_000088.3:c.589G>T"  },
                {   build: "GRCh37", gene: "COL1A1", input_gene: 'XACT', idx: 2, inheritance: "", input: "NC_000017.10:g.48275363C>A", protein: "NP_000079.2(LRG_1p1):p.(Gly197Cys)", transcript: "NM_000088.3:c.589G>T" },
                {   build: "GRCh37", gene: "COLQ", input_gene: 'COLQ', idx: 7, inheritance: "", input: "NM_005677.3:c.444G>A", protein: "NP_005668.2:p.(Trp148Ter)", transcript: "NM_005677.3:c.444G>A" },
                {   build: "GRCh37", gene: "COL13A1", input_gene: 'COL13A1', idx: 8, inheritance: "", input: "NM_001130103.1:c.1173del", protein: "NP_001123575.1:p.(Leu392SerfsTer71)", transcript: "NM_001130103.1:c.1173del" }
            ] },
            genotypes: {    genotypes: [ {
                            allele1: { build: "GRCh37", gene: "COL1A1", input_gene: 'APP', idx: 3, inheritance: "", input: "NM_000088.3:c.589G>T", protein: "NP_000079.2(LRG_1p1):p.(Gly197Cys)", transcript: "NM_000088.3:c.589G>T"  },
                            allele2: { build: "GRCh37", gene: "COL1A1", input_gene: 'XACT', idx: 2, inheritance: "", input: "NC_000017.10:g.48275363C>A", protein: "NP_000079.2(LRG_1p1):p.(Gly197Cys)", transcript: "NM_000088.3:c.589G>T" },
                            idx: 1
            } ] },
            drugs: {        drugs: [    { name: 'Pyridostigmine', idx: 2 }, 
                                        { name: 'Ephedrine', idx: 3 }, 
                                        { name: '3,4-diaminopyridine', idx: 5 } 
            ] },
            cocktails: {    cocktails: [ 
                { idx: 2, cocktails: [ { idx: 2, name: 'Pyridostigmine' } ] },
                { idx: 3, cocktails: [ { idx: 3, name: 'Ephedrine' }, { idx: 5, name: '3,4-diaminopyridine' }  ] }
            ] },
            treatments: {   treatments: [
                { trigger: { source: "cocktail", value: { idx: 3, cocktails: [ { idx: 3, name: "Ephedrine" }, { idx: 5, name: "3,4-diaminopyridine" } ] } },
                  target: { source: "genotype", value: {
                    allele1: { build: "GRCh37", gene: "COL1A1", input_gene: 'APP', idx: 3, inheritance: "", input: "NM_000088.3:c.589G>T", protein: "NP_000079.2(LRG_1p1):p.(Gly197Cys)", transcript: "NM_000088.3:c.589G>T"  },
                    allele2: { build: "GRCh37", gene: "COL1A1", input_gene: 'XACT', idx: 2, inheritance: "", input: "NC_000017.10:g.48275363C>A", protein: "NP_000079.2(LRG_1p1):p.(Gly197Cys)", transcript: "NM_000088.3:c.589G>T" }
                  },
                  idx: 1 }
                },
                { trigger: { source: "drug", value: { idx: 2, name: "Pyridostigmine" } },
                  target: { source: "variant",  value: { idx: 7, build: "GRCh37", gene: "COLQ", input_gene: "COLQ", inheritance: "", input: "NM_005677.3:c.444G>A", protein: "NP_005668.2:p.(Trp148Ter)", transcript: "NM_005677.3:c.444G>A" } }
                }
            ] }
        }

        this.child_guider = React.createRef();
    }

    moveNext = (data) => {
        if( typeof data.data !== 'undefined' ) {
            this.setState({ current_step: data.step })
            this.child_guider.current.updateStep( data.step )
            this.state[ data.formName ] = data.data
        }
        console.log( "HELLO ----> ", data )
    }

    movePrev = (data) => {
        this.setState({ current_step: data.step })
        this.child_guider.current.updateStep( data.step )
    }

    createFormToShow = () => {
        switch( this.state.current_step ) {
            case 1:
                return <PublicationInput publication={ this.state.publication } moveNext={ this.moveNext } />
            case 2:
                return <DiseaseInput disease={ this.state.disease } moveNext={ this.moveNext } movePrev={ this.movePrev } />
            case 3:
                return <VariantInput variants={ this.state.variants } moveNext={ this.moveNext } movePrev={ this.movePrev } />
            case 4:
                return <GenotypeInput genotypes={ this.state.genotypes } variants={ this.state.variants } moveNext={ this.moveNext } movePrev={ this.movePrev } />
            case 5:
                return <DrugInput drugs={ this.state.drugs } moveNext={ this.moveNext } movePrev={ this.movePrev } />
            case 6:
                return <CocktailInput cocktails={ this.state.cocktails.cocktails } drugs={ this.state.drugs.drugs } moveNext={ this.moveNext } movePrev={ this.movePrev } />
            case 7:
                return <TreatmentInput treatments={ this.state.treatments.treatments } cocktails={ this.state.cocktails.cocktails } drugs={ this.state.drugs.drugs } genotypes={ this.state.genotypes.genotypes } variants={ this.state.variants.variants } moveNext={ this.moveNext } movePrev={ this.movePrev } />
            default:
                return <div></div>
        }
    }

    render = () => {
        const form = this.createFormToShow();
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