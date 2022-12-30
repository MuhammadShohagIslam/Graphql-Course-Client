import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import {FaFacebookF, FaTwitter, FaLinkedinIn} from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <Container>
                <div className={classes.topFooter}>
                    <h3 className={classes.topFooterTitle}>ShohagTutor</h3>
                    <p className={classes.topFooterInfo}> I'm a Instructor</p>
                </div>

                <div className={classes.bottomFooter}>
                    <ul className={classes.bottomFooterList}>
                        <li className={classes.bottomFooterListItem}>
                            <Link to="" className={classes.bottomFooterListItemIcon}>
                                <FaFacebookF/>
                            </Link>
                        </li>
                        <li className={classes.bottomFooterListItem}>
                            <Link to="" className={classes.bottomFooterListItemIcon}>
                                <FaTwitter/>
                            </Link>
                        </li>
                        <li className={classes.bottomFooterListItem}>
                            <Link to="" className={classes.bottomFooterListItemIcon}>
                                <FaLinkedinIn/>
                            </Link>
                        </li>
                    </ul>
                    <p className={classes.bottomFooterCopyRight}>Copyright © 2022 ShohagTutor , All Rights Reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
