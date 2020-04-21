import React from 'react'
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

function Landing() {
    return(
        <Container>
            <Row>
                <Col xs={2} md={2} ></Col>
                <Col xs={8} md={8}>
                    <Image src= { process.env.PUBLIC_URL + "/img/g1438.png" } fluid className="center"/>
                </Col>
                <Col xs={2} md={2} ></Col>
            </Row>
            <Row>&nbsp;</Row>
            <Row className="text-center"><Col><Link to="/entry"><Button variant="outline-primary">Continue</Button></Link></Col></Row>
        </Container>
    )
}

export default Landing