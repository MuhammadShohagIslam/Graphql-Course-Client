import React from "react";
import { Col, Card } from "react-bootstrap";
import classes from "./ContactInfo.module.css";

const ContactInfo = ({ info, icon }) => {
    return (
        <Col md={6} lg={4} className={`${classes.contactInfo} mb-3`}>
            <Card className={`border-0 text-center`}>
                <Card.Body>
                    {icon}
                    <Card.Title className="mt-3"><h5> {info}</h5></Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ContactInfo;
