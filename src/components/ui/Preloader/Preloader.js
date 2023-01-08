import React, { Component, Fragment } from "react";
import "./Preloader.css";

class Preloader extends Component {
    render() {
        return (
            <Fragment>
                <div className="loader">
                    <div className="d-table">
                        <div className="d-tablecell">
                            <div className="spinner"></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Preloader;
