import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import GeneFetcher from '../fetchers/GeneFetcher'
import VariantCollection from '../control/VariantCollection'

import { Card, Jumbotron, Form, Col, Row, Button  } from 'react-bootstrap';

const autoBind = require('auto-bind');

class VariantInput extends Component {
    constructor(props) {
        super(props)
        autoBind(this)
    }

    render = () => {
        return (
            <Card>
                <Card.Header><h2>Variant</h2></Card.Header>
                <Card.Body>
                    <Jumbotron>
                        <p>In the <em>treatabolome database</em>, a genomic variant is defined by a combination of five elements:</p>
                        <ol>
                            <li>A gene defined as gene symbol from HUGO Gene Nomenclature Committee (HGNC - <strong>mandatory</strong>)</li>
                            <li>A genomic build (<strong>mandatory</strong>)</li>
                            <li>A transcript where the variant lies (<strong>mandatory</strong>)</li>
                            <li>A variant as defined genomic by Sequence Variant Nomenclature as reference sequence (starting by g. - <strong>mandatory</strong>)</li>
                            <li>The variant inheritance and zygosity (optional)</li>
                        </ol>
                    </Jumbotron>
                    <h4>Fetcher</h4>
                    <Form.Group as={Row} controlId="gene">
                        <Form.Label column sm="2">Gene: </Form.Label>
                        <Col sm="10">
                            <GeneFetcher />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="build">
                        <Form.Label column sm="2">Genomic build: </Form.Label>
                        <Col sm="10">
                            <Form.Control as="select">
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
                            <Form.Control type="input" placeholder="NC_000017.10" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="variant">
                        <Form.Label column sm="2">Variant: </Form.Label>
                        <Col sm="10">
                            <Form.Control type="input" placeholder="g.48275363C>A" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="inh_zyg">
                        <Form.Label column sm="2">Inheritance and zygosity: </Form.Label>
                        <Col sm="10">
                            <Form.Control type="input" placeholder="Inheritance and zygosity" />
                        </Col>
                    </Form.Group>
                    <div className="text-right">
                        <Button><FontAwesomeIcon icon={faSearch} /> Validate and add to the collection</Button>
                    </div>
                    <h4>Collection</h4>
                    <VariantCollection />
                </Card.Body>
            </Card>
        )
    }
}

export default VariantInput;