import React, {useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import SectionTitle from "./../../../components/shared/SectionTitle/SectionTitle";
import { GoLocation } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import ContactInfo from "../../../components/shared/ContactInfo/ContactInfo";
import classes from "./Contact.module.css";
import AOS from 'aos';

const Contact = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <Container data-aos="fade-up"  className="py-5">
            <SectionTitle title="Contact" />
            <Row className="m-0">
                <ContactInfo
                   
                    info="Turkey"
                    icon={<GoLocation className={classes.contactIcon} />}
                />
                <ContactInfo
                    
                    info="mdsohag200077@gmail.com"
                    icon={<HiOutlineMail className={classes.contactIcon} />}
                />
                <ContactInfo
                   
                    info="+905075613855"
                    icon={<BiPhoneCall className={classes.contactIcon} />}
                />
            </Row>
        </Container>
    );
};

export default Contact;
