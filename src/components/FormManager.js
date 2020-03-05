import React, { Component } from 'react'

import { Container, Row, Col } from 'react-bootstrap'

import Guider from './Guider'
import PublicationInput from './forms/PublicationIntputForm'
import DiseaseInput from './forms/DiseaseInputForm'
import VariantInput from './forms/VariantInputForm'
import GenotypeInput from './forms/GenotypeInputForm'

class FormManager extends Component {
    constructor(props) {
        super(props)
        //this.state = { current_step: 1 }
        this.state = {
            current_step: 4,
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
                            description: "This is the descriptions"
            },
            variants: {     variants: [
                {   build: "GRCh37", gene: "COL1A1", input_gene: 'APP', idx: 1, inheritance: "", input: "NM_000088.3:c.589G>T", protein: "NP_000079.2(LRG_1p1):p.(Gly197Cys)", transcript: "NM_000088.3:c.589G>T"  },
                {   build: "GRCh37", gene: "COL1A1", input_gene: 'XACT', idx: 2, inheritance: "", input: "NC_000017.10:g.48275363C>A", protein: "NP_000079.2(LRG_1p1):p.(Gly197Cys)", transcript: "NM_000088.3:c.589G>T"   }
            ]}
        }

        this.child_guider = React.createRef();
    }

    moveNext = (data) => {
        if( typeof data.data !== 'undefined' ) {
            console.log("hello --->", data.data)
            this.setState({ current_step: data.step })
            this.child_guider.current.updateStep(data.step)
            this.state[data.formName] = data.data
        }
    }

    movePrev = (data) => {
        this.setState({ current_step: data.step })
        this.child_guider.current.updateStep(data.step)
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