import React,{useEffect} from "react";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import profileImg from "../../../images/PP.jpg";
import classes from "./AboutMe.module.css";
import AOS from 'aos';

const AboutMe = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <Container className="py-5">
            <SectionTitle
                title="About Me"
                info="I am Reviewing classroom or curricula topics and assignments. Assisting students with homework, projects, test preparation, papers, research and other academic tasks."
            />
            <Row data-aos="fade-up"  data-aos-delay="1" className="m-0">
                <Col md={6} lg={4}>
                    <div className={classes.profileImgWrapper}>
                        <Image
                            rounded
                            className={classes.profileImg}
                            src={profileImg}
                            alt="Profile"
                        />
                    </div>
                </Col>

                <Col md={6} lg={8}>
                    <div className={classes.aboutTextWrapper}>
                        <p className={classes.aboutText}>
                            I am Reviewing classroom or curricula topics and
                            assignments. Assisting students with homework,
                            projects, test preparation, papers, research and
                            other academic tasks.
                        </p>

                        <Row>
                            <Col lg={4}>
                                <ul className={classes.aboutTextList}>
                                    <li className={classes.aboutTextListItem}>
                                        <span
                                            className={
                                                classes.aboutTextListItemSpan
                                            }
                                        >
                                            NAME :
                                        </span>{" "}
                                        Muhammad Shohag Islam
                                    </li>
                                    <li
                                        className={
                                            classes.aboutTextListItemSpan
                                        }
                                    >
                                        <span
                                            className={
                                                classes.aboutTextListItemSpan
                                            }
                                        >
                                            AGE :
                                        </span>{" "}
                                        24
                                    </li>
                                </ul>
                            </Col>

                            <Col lg={8}>
                                <ul className={classes.aboutTextList}>
                                    <li className={classes.aboutTextListItem}>
                                        <span
                                            className={
                                                classes.aboutTextListItemSpan
                                            }
                                        >
                                            JOB TITLE :
                                        </span>{" "}
                                        Teacher
                                    </li>
                                    <li className={classes.aboutTextListItem}>
                                        <span
                                            className={
                                                classes.aboutTextListItemSpan
                                            }
                                        >
                                            LOCATION :
                                        </span>{" "}
                                        Bangladesh
                                    </li>
                                </ul>
                            </Col>
                        </Row>

                        <div>
                            <Button className={`${classes.aboutMeButton} me-3`}>
                                Download CV
                            </Button>
                            <Button className={`${classes.aboutMeButton}`}>
                                Call Me
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutMe;
