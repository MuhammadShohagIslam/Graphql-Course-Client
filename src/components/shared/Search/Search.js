import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = ({ className }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${searchQuery}`);
    };
    return (
        <Form className={`${className} d-flex`} onSubmit={handleSearch}>
            <Form.Control
                type="search"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                required
            />
            <Button variant="outline-success" type="submit">Search</Button>
        </Form>
    );
};

export default Search;
