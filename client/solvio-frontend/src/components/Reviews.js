import React, { Component } from 'react';

import { Review } from './Review'

import '../styles/Resource.scss'

export class Reviews extends Component {
    render() {
        const { reviews } = this.props
        return (
            <div>
                {reviews.map(review => (
                    <Review data={review} />
                ))}
            </div>
        );
    }
}
