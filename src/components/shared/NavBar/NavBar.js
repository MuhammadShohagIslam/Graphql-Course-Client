import React from "react";
import {
    Container,
    Navbar,
    Nav,
    Image,
    Form,
    Button,
    NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import classes from "./NavBar.module.css";
import { useAuth } from "./../../../contexts/AuthProvider/AuthProvider";

const MediaNavBar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch((error) => {
                console.log(error.message);
            });
    };
    return (
        <>
            <Navbar
                className={`${classes.navBar}`}
                expand="lg"
                bg="dark"
                variant="dark"
            >
                <Container>
                    <LinkContainer className={classes.logo} to="/">
                        <Navbar.Brand>ShohagTutor</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className={classes.navbarWrapper}
                    >
                        <div className={`${classes.navbarFormWrapper}`}>
                            <Form className={`${classes.navbarForm} d-flex`}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">
                                    Search
                                </Button>
                            </Form>
                        </div>
                        <Nav
                            className={`d-flex justify-content-lg-between align-items-lg-center`}
                        >
                            <div className={classes.navItemMiddle}>
                                <LinkContainer to="/">
                                    <Nav.Link className={classes.navLink}>
                                        Home
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/services">
                                    <Nav.Link className={classes.navLink}>
                                        Services
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/blog">
                                    <Nav.Link className={classes.navLink}>
                                        Blog
                                    </Nav.Link>
                                </LinkContainer>
                                {user && user?.uid ? (
                                    <>
                                        <NavDropdown
                                            title={
                                                <>
                                                    {user?.photoURL ? (
                                                        <Image
                                                            width={35}
                                                            height={35}
                                                            roundedCircle
                                                            src={`${user?.photoURL}`}
                                                        />
                                                    ) : (
                                                        <span
                                                            className={
                                                                classes.logOutIcon
                                                            }
                                                        >
                                                            <FaUserAlt className="text-white fs-5" />
                                                        </span>
                                                    )}
                                                </>
                                            }
                                            id="navbarScrollingDropdown"
                                        >
                                            <LinkContainer to="/dashboard">
                                                <NavDropdown.Item href="/dashboard">
                                                    Dashboard
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Divider />
                                            <li
                                                onClick={handleLogOut}
                                                className={`${classes.logOutIcon}`}
                                            >
                                                <AiOutlineLogout className="text-black" />
                                            </li>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <>
                                        <LinkContainer to="/login">
                                            <Nav.Link
                                                className={classes.navLink}
                                            >
                                                Login
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/register">
                                            <Nav.Link
                                                className={classes.navLink}
                                            >
                                                Register
                                            </Nav.Link>
                                        </LinkContainer>
                                    </>
                                )}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default MediaNavBar;
