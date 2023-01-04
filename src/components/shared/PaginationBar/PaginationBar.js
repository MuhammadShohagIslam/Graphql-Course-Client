import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationBar = ({ page, setPage, pages }) => {
    const pagination = () => {
        const items = [];
        for (let i = 1; i <= pages; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    onClick={() => setPage(i)}
                    active={i === page}
                >
                    {i}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <Pagination>
                <Pagination.Prev
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                />
                {pagination()}
                <Pagination.Next
                    disabled={page === pages}
                    onClick={() => setPage((prev) => prev + 1)}
                />
            </Pagination>
        </div>
    );
};

export default PaginationBar;
