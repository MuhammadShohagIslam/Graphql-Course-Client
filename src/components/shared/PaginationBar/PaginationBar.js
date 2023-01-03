import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationBar = ({ page, setPage }) => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <Pagination>
                <Pagination.Prev />
                <Pagination.Item key={1} active={1 === 1}>
                    {1}
                </Pagination.Item>
                <Pagination.Next />
            </Pagination>
        </div>
    );
};

export default PaginationBar;
