import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import '../styles/Resource.scss'

export class TopicSmall extends Component {
    render() {
        const { id, title } = this.props

        const viewReviewsLink = "/topic/" + id
        return (
            <Link to={viewReviewsLink}>
                <div className="resource">
                    <span className="title">{title}</span>
                </div>
            </Link>

        );
    }
}
