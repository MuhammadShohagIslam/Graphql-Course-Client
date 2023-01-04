import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Blog from '../../components/shared/Blog/Blog';
import useFetch from '../../hooks/useFetch';
import Main from './../../layout/Main/Main';


const Blogs = () => {
    const {data, loading } = useFetch("https://server-smoky-ten.vercel.app/blogs");
    
    return (
        <Main>
            <Helmet>
                <title>Blog</title>
            </Helmet>
             <article className="mt-5 mb-4">
                <Container>
                    <Row className="ms-0 me-0">
                        {loading ? (
                            <div
                                style={{ height: "400px" }}
                                className="d-flex justify-content-center align-items-center"
                            >
                                <Spinner animation="border" className="spinner-color" />
                            </div>
                        ) : (
                            <>
                                {data.length > 0 ? (
                                    <>
                                        {data.map((blog) => (
                                            <Blog key={blog._id} blog={blog} />
                                        ))}
                                    </>
                                ) : (
                                    <h3 className="text-center text-dark">
                                        There is no blog post
                                    </h3>
                                )}
                            </>
                        )}
                    </Row>
                </Container>
            </article>
        </Main>
    );
};

export default Blogs;