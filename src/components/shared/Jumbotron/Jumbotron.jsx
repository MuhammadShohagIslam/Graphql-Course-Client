import React from "react";
import { Container } from "react-bootstrap";
import classes from "./Jumbotron.module.css";
import Typewriter from "typewriter-effect";

const Jumbotron = () => {
    return (
        <section className={classes.jumbotron}>
            <Container className={classes.jumbotronWrapper}>
                <div>
                    <h2 className={classes.jumbotronName}>
                       Muhammad Shohag Islam
                    </h2>
                    <div className={classes.jumbotronTitle}>
                        I'm Instructor of
                        <span className={classes.jumbotronTypeEffect}>
                            {
                                <Typewriter
                                    options={{
                                        strings: [
                                            "Mathematics",
                                            "IELTS",
                                            "Chemistry",
                                            "Biology",
                                            "ICT",
                                            "English",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            }
                        </span>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Jumbotron;
